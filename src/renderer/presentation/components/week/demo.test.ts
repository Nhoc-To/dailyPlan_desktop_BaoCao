import { addDaysToStr, formatDateStr, isTaskCompletedOnDate, buildTasksByDateStr } from './weeklyHelpers';
import { Task } from '../../../../shared/domain/entities';

const makeTask = (id: number, startDate: string, endDate: string, completedDays = '[]'): Task => ({
  id,
  categoryId: 1,
  name: `Task ${id}`,
  startDate,
  endDate,
  completedDays,
  status: false,
});

// Test 1: task kéo dài nhiều ngày xuất hiện đúng mỗi ô lịch, không lọt ra ngoài biên
test('task 3 ngày ánh xạ đúng vào từng ngày trong khoảng, không xuất hiện ngoài biên', () => {
  const task = makeTask(1, '2025-01-13', '2025-01-15');
  const map = buildTasksByDateStr([task]);

  expect(map.get('2025-01-12')).toBeUndefined();
  expect(map.get('2025-01-13')).toEqual([task]);
  expect(map.get('2025-01-14')).toEqual([task]);
  expect(map.get('2025-01-15')).toEqual([task]);
  expect(map.get('2025-01-16')).toBeUndefined();
});

// Test 2: task cùng id không bị thêm trùng
test('task cùng id không bị thêm trùng khi truyền 2 lần', () => {
  const task = makeTask(2, '2025-03-01', '2025-03-02');
  const map = buildTasksByDateStr([task, task]);

  expect(map.get('2025-03-01')?.length).toBe(1);
});

// Test 3: addDaysToStr không bị nhảy ngày khi qua tháng / năm nhuận
test('addDaysToStr cộng ngày qua ranh giới tháng và năm nhuận chính xác', () => {
  expect(addDaysToStr('2025-01-31', 1)).toBe('2025-02-01');
  expect(addDaysToStr('2025-02-28', 1)).toBe('2025-03-01');
  expect(addDaysToStr('2024-02-28', 1)).toBe('2024-02-29'); // năm nhuận
  expect(addDaysToStr('2024-12-31', 1)).toBe('2025-01-01');
});

// Test 4: formatDateStr padding số 0 đúng ở tháng và ngày đơn chữ số
test('formatDateStr tháng và ngày luôn có 2 chữ số', () => {
  expect(formatDateStr(new Date(2025, 0, 5))).toBe('2025-01-05');
  expect(formatDateStr(new Date(2025, 8, 1))).toBe('2025-09-01');
  expect(formatDateStr(new Date(2025, 11, 31))).toBe('2025-12-31');
});

// Test 5: isTaskCompletedOnDate không throw khi JSON lỗi
test('isTaskCompletedOnDate trả về false khi completedDays là JSON không hợp lệ', () => {
  const task = makeTask(4, '2025-01-13', '2025-01-13', 'invalid-json');

  expect(isTaskCompletedOnDate(task, '2025-01-13')).toBe(false);
});
