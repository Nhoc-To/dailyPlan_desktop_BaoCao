import { Task } from '../../../../shared/domain/entities';

export type SortType = 'date' | 'duration' | 'name';

/** Task đã xong hoặc đã quá hạn → đẩy xuống cuối bảng */
export const isBottom = (task: Task, now = Date.now()): boolean => {
  if (task.status) return true;
  const deadline = new Date(`${task.endDate}T${task.endTime || '23:59'}`).getTime();
  return deadline <= now;
};

/** Lọc task theo năm của startDate */
export const filterByYear = (tasks: Task[], year: number): Task[] =>
  tasks.filter(t => new Date(t.startDate).getFullYear() === year);

/** Sắp xếp: active trước, completed/overdue sau; trong mỗi nhóm theo sortBy */
export const sortTasks = (tasks: Task[], sortBy: SortType, now = Date.now()): Task[] =>
  [...tasks].sort((a, b) => {
    const ba = isBottom(a, now);
    const bb = isBottom(b, now);
    if (ba && !bb) return 1;
    if (!ba && bb) return -1;

    switch (sortBy) {
      case 'date':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'duration': {
        const ra = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime() - now;
        const rb = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime() - now;
        return ra - rb;
      }
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

/** Đếm số task theo từng tháng (index 0–11) */
export const buildMonthStats = (tasks: Task[]): number[] => {
  const stats = Array(12).fill(0);
  tasks.forEach(t => { stats[new Date(t.startDate).getMonth()]++; });
  return stats;
};

/** Tính số: tổng / đang thực hiện / hoàn thành / quá hạn */
export const calcSummary = (tasks: Task[], now = Date.now()) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const overdue = tasks.filter(t => {
    if (t.status) return false;
    return new Date(t.endDate).getTime() < now;
  }).length;
  const active = total - completed - overdue;
  return { total, completed, overdue, active };
};
