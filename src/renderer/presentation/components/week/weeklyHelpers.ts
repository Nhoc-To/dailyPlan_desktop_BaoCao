import { Task } from '../../../../shared/domain/entities';

// Format Date → "YYYY-MM-DD"
export const formatDateStr = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Lấy số ngày trong tháng
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Lấy thứ của ngày 1 trong tháng (0 = Thứ 2, 6 = Chủ nhật)
export const getFirstDayOfMonth = (year: number, month: number): number => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

// Cộng N ngày vào date string "YYYY-MM-DD"
export const addDaysToStr = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return formatDateStr(d);
};

// Lấy 7 ngày của tuần chứa date (bắt đầu từ Thứ 2)
export const getWeekDays = (baseDate: Date): Date[] => {
  const date = new Date(baseDate);
  const day = date.getDay() || 7;
  if (day !== 1) {
    date.setDate(date.getDate() - (day - 1));
  }
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + i);
    week.push(d);
  }
  return week;
};

// Kiểm tra task đã hoàn thành vào ngày cụ thể chưa
export const isTaskCompletedOnDate = (task: Task, dateStr: string): boolean => {
  try {
    const days: string[] = JSON.parse(task.completedDays || '[]');
    return days.includes(dateStr);
  } catch {
    return false;
  }
};

// Ánh xạ danh sách task → Map<dateStr, Task[]> (mỗi ngày trong khoảng startDate–endDate)
export const buildTasksByDateStr = (tasks: Task[]): Map<string, Task[]> => {
  const map = new Map<string, Task[]>();
  tasks.forEach(t => {
    let currentStr = t.startDate;
    const endStr = t.endDate || t.startDate;
    let loopCount = 0;
    while (currentStr <= endStr && loopCount < 365) {
      const arr = map.get(currentStr) || [];
      if (!arr.find(existing => existing.id === t.id)) {
        arr.push(t);
        map.set(currentStr, arr);
      }
      currentStr = addDaysToStr(currentStr, 1);
      loopCount++;
    }
  });
  return map;
};

// Tên các thứ trong tuần
export const WEEK_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];