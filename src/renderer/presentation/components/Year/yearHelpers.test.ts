import { Task } from '../../../../shared/domain/entities';
import {
  isBottom,
  filterByYear,
  sortTasks,
  buildMonthStats,
  calcSummary,
} from './yearHelpers';

// ─── Helper tạo task nhanh ────────────────────────────────────────────────────
const t = (
  id: number,
  startDate: string,
  endDate: string,
  extra: Partial<Task> = {}
): Task => ({
  id,
  categoryId: 1,
  name: `Task ${id}`,
  status: false,
  endTime: '23:59',
  startDate,
  endDate,
  ...extra,
});

// Thời điểm giả cố định: 2026-01-15 12:00 UTC
const NOW = new Date('2026-01-15T12:00:00Z').getTime();

// ═══════════════════════════════════════════════════════════════════════════════
// Hàm 1 — isBottom
// ═══════════════════════════════════════════════════════════════════════════════
describe('isBottom', () => {
  test('task status=true → luôn là bottom dù deadline còn xa', () => {
    const task = t(1, '2026-01-10', '2026-06-01', { status: true });
    expect(isBottom(task, NOW)).toBe(true);
  });

  test('task chưa xong, deadline tương lai → KHÔNG phải bottom', () => {
    const task = t(2, '2026-01-10', '2026-02-01');
    expect(isBottom(task, NOW)).toBe(false);
  });

  test('task chưa xong, deadline đã qua → là bottom (quá hạn)', () => {
    const task = t(3, '2026-01-01', '2026-01-10');
    expect(isBottom(task, NOW)).toBe(true);
  });

  test('không có endTime → mặc định 23:59, cùng ngày với NOW vẫn chưa quá hạn', () => {
    // NOW = 2026-01-15 12:00 → 23:59 cùng ngày vẫn còn thời gian
    const task = t(4, '2026-01-15', '2026-01-15', { endTime: undefined });
    expect(isBottom(task, NOW)).toBe(false);
  });

  test('deadline đúng bằng NOW (<=) → là bottom', () => {
    // endDate 2026-01-15, endTime 12:00 → bằng NOW chính xác
    const task = t(5, '2026-01-10', '2026-01-15', { endTime: '12:00' });
    expect(isBottom(task, NOW)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Hàm 2 — filterByYear
// ═══════════════════════════════════════════════════════════════════════════════
describe('filterByYear', () => {
  const tasks = [
    t(1, '2025-06-01', '2025-06-30'),
    t(2, '2026-01-15', '2026-01-31'),
    t(3, '2026-11-20', '2026-11-25'),
    t(4, '2027-03-10', '2027-03-15'),
  ];

  test('chỉ trả về task có startDate trong năm được chọn', () => {
    const result = filterByYear(tasks, 2026);
    expect(result.map(x => x.id)).toEqual([2, 3]);
  });

  test('trả về mảng rỗng khi không có task nào trong năm đó', () => {
    expect(filterByYear(tasks, 2020)).toHaveLength(0);
  });

  test('không làm biến đổi mảng gốc (immutable)', () => {
    const before = tasks.map(x => x.id);
    filterByYear(tasks, 2026);
    expect(tasks.map(x => x.id)).toEqual(before);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Hàm 3 — sortTasks
// ═══════════════════════════════════════════════════════════════════════════════
describe('sortTasks', () => {
  // active: deadline tương lai, chưa xong
  const a1 = t(1, '2026-01-05', '2026-03-01', { name: 'Zeta' });  // startDate cũ hơn
  const a2 = t(2, '2026-01-10', '2026-04-01', { name: 'Alpha' }); // startDate mới hơn
  // bottom: đã xong hoặc quá hạn
  const done    = t(3, '2026-01-01', '2026-01-20', { status: true, name: 'Mid' });
  const overdue = t(4, '2026-01-01', '2026-01-08', { name: 'Beta' });

  test('sortBy=date: active trước, trong active → startDate mới nhất lên đầu', () => {
    const result = sortTasks([a1, a2, done, overdue], 'date', NOW);
    expect(result[0].id).toBe(2); // a2 startDate mới hơn
    expect(result[1].id).toBe(1); // a1
    // 2 task bottom ở cuối
    expect([result[2].id, result[3].id].sort()).toEqual([3, 4]);
  });

  test('sortBy=name: active sắp A–Z, bottom vẫn ở cuối', () => {
    const result = sortTasks([a1, a2, done, overdue], 'name', NOW);
    expect(result[0].id).toBe(2); // Alpha
    expect(result[1].id).toBe(1); // Zeta
    expect([result[2].id, result[3].id].sort()).toEqual([3, 4]);
  });

  test('sortBy=duration: active có deadline gần nhất lên đầu', () => {
    // a1 endDate 2026-03-01, a2 endDate 2026-04-01 → a1 còn ít thời gian hơn
    const result = sortTasks([a2, a1], 'duration', NOW);
    expect(result[0].id).toBe(1); // a1 deadline gần hơn
    expect(result[1].id).toBe(2);
  });

  test('không làm biến đổi mảng gốc', () => {
    const arr = [a1, a2, done, overdue];
    const before = arr.map(x => x.id);
    sortTasks(arr, 'date', NOW);
    expect(arr.map(x => x.id)).toEqual(before);
  });

  test('mảng rỗng → trả về mảng rỗng', () => {
    expect(sortTasks([], 'date', NOW)).toEqual([]);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Hàm 4 — buildMonthStats
// ═══════════════════════════════════════════════════════════════════════════════
describe('buildMonthStats', () => {
  test('đếm đúng số task ở từng tháng', () => {
    const tasks = [
      t(1, '2026-01-10', '2026-01-31'), // T1
      t(2, '2026-01-20', '2026-02-01'), // T1
      t(3, '2026-06-15', '2026-06-30'), // T6
      t(4, '2026-12-25', '2026-12-31'), // T12
    ];
    const stats = buildMonthStats(tasks);
    expect(stats[0]).toBe(2);  // T1
    expect(stats[5]).toBe(1);  // T6
    expect(stats[11]).toBe(1); // T12
    expect(stats[1]).toBe(0);  // T2 không có gì
  });

  test('mảng rỗng → 12 số 0', () => {
    expect(buildMonthStats([])).toEqual(Array(12).fill(0));
  });

  test('tổng tất cả tháng = tổng số task', () => {
    const tasks = [
      t(1, '2026-03-01', '2026-03-10'),
      t(2, '2026-08-15', '2026-08-20'),
      t(3, '2026-08-20', '2026-08-25'),
    ];
    const total = buildMonthStats(tasks).reduce((s, n) => s + n, 0);
    expect(total).toBe(tasks.length);
  });

  test('kết quả luôn có đúng 12 phần tử', () => {
    expect(buildMonthStats([t(1, '2026-05-01', '2026-05-31')])).toHaveLength(12);
  });

  test('task tháng 12 (index 11) không bị tràn sang tháng 0', () => {
    const stats = buildMonthStats([t(1, '2026-12-31', '2026-12-31')]);
    expect(stats[11]).toBe(1);
    expect(stats[0]).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Hàm 5 — calcSummary
// ═══════════════════════════════════════════════════════════════════════════════
describe('calcSummary', () => {
  test('mảng rỗng → tất cả trường = 0', () => {
    expect(calcSummary([], NOW)).toEqual({ total: 0, completed: 0, overdue: 0, active: 0 });
  });

  test('tính đúng cả 4 nhóm với hỗn hợp task', () => {
    const tasks = [
      t(1, '2026-01-10', '2026-02-01'),                          // active
      t(2, '2026-01-10', '2026-02-05'),                          // active
      t(3, '2026-01-01', '2026-01-05', { status: true }),        // completed
      t(4, '2026-01-01', '2026-01-08'),                          // overdue
    ];
    expect(calcSummary(tasks, NOW)).toEqual({ total: 4, completed: 1, overdue: 1, active: 2 });
  });

  test('task status=true KHÔNG bị đếm vào overdue dù deadline đã qua', () => {
    const task = t(1, '2025-01-01', '2025-01-01', { status: true });
    const s = calcSummary([task], NOW);
    expect(s.completed).toBe(1);
    expect(s.overdue).toBe(0);
  });

  test('active = total - completed - overdue luôn đúng', () => {
    const tasks = [
      t(1, '2026-01-10', '2026-03-01'),
      t(2, '2026-01-01', '2026-01-05'),
      t(3, '2026-01-01', '2026-01-05', { status: true }),
    ];
    const s = calcSummary(tasks, NOW);
    expect(s.active).toBe(s.total - s.completed - s.overdue);
  });

  test('active không bao giờ âm', () => {
    const tasks = [
      t(1, '2026-01-01', '2026-01-05', { status: true }),
      t(2, '2026-01-01', '2026-01-05', { status: true }),
    ];
    const s = calcSummary(tasks, NOW);
    expect(s.active).toBeGreaterThanOrEqual(0);
  });
});
