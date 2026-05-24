import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../../shared/domain/entities';
import { formatDateStr, getWeekDays, buildTasksByDateStr } from './weeklyHelpers';

export const useWeeklyOverview = (tasks: Task[], onTaskUpdated?: () => void) => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskDateStr, setSelectedTaskDateStr] = useState<string>('');
  const [mockCompletedDays, setMockCompletedDays] = useState<Record<number, string[]>>({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const mockTasks: Task[] = useMemo(() => {
    const today = new Date();
    const day = today.getDay() || 7;
    const monday = new Date(today);
    if (day !== 1) {
      monday.setDate(monday.getDate() - (day - 1));
    }
    const mondayStr = formatDateStr(monday);

    return [
      {
        id: 9001,
        name: 'Họp team dự án',
        description: 'Sync tiến độ phần Week + Month với cả nhóm. Chuẩn bị slide báo cáo.',
        startDate: mondayStr,
        endDate: mondayStr,
        completedDays: JSON.stringify(mockCompletedDays[9001] || []),
        status: false,
        color: '#4f46e5',
        categoryId: 1,
      } as Task,
      {
        id: 9002,
        name: 'Làm bài tập React',
        description: 'Hoàn thành assignment chia component cho dự án DailyPlan.',
        startDate: mondayStr,
        endDate: mondayStr,
        completedDays: JSON.stringify(mockCompletedDays[9002] || []),
        status: false,
        color: '#22c55e',
        categoryId: 2,
      } as Task,
    ];
  }, [mockCompletedDays]);

  const allTasks = useMemo(() => [...tasks, ...mockTasks], [tasks, mockTasks]);

  const tasksByDateStr = useMemo(() => buildTasksByDateStr(allTasks), [allTasks]);

  const currentWeekDays = useMemo(() => {
    return getWeekDays(selectedDay || new Date());
  }, [selectedDay]);

  const getTasksForDate = (date: Date): Task[] => {
    return tasksByDateStr.get(formatDateStr(date)) || [];
  };

  const hasTasks = (day: number): boolean => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasksByDateStr.has(dateStr);
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleGoToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(new Date(year, month, day));
  };

  const handleEdit = (task: Task) => {
    navigate('/editor', { state: { task } });
  };

  const handleDelete = async (id: number) => {
    if (id >= 9000) {
      alert('Đây là task mẫu, không xóa được.');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
      if (window.api?.tasks) {
        await window.api.tasks.delete(id);
        onTaskUpdated?.();
      }
    }
  };

  const handleToggleStatus = async (task: Task, dateStr: string) => {
    if (task.id >= 9000) {
      setMockCompletedDays(prev => {
        const current = prev[task.id] || [];
        const newDays = current.includes(dateStr)
          ? current.filter(d => d !== dateStr)
          : [...current, dateStr];
        return { ...prev, [task.id]: newDays };
      });

      setSelectedTask(prev => {
        if (!prev || prev.id !== task.id) return prev;
        const current = mockCompletedDays[task.id] || [];
        const newDays = current.includes(dateStr)
          ? current.filter(d => d !== dateStr)
          : [...current, dateStr];
        return { ...prev, completedDays: JSON.stringify(newDays) } as Task;
      });
      return;
    }

    if (!window.api?.tasks) return;

    let completedDays: string[] = [];
    try {
      completedDays = JSON.parse(task.completedDays || '[]');
    } catch {}

    const newCompletedDays = completedDays.includes(dateStr)
      ? completedDays.filter(d => d !== dateStr)
      : [...completedDays, dateStr];

    const sd = new Date(task.startDate);
    const ed = new Date(task.endDate || task.startDate);
    const totalDays = Math.round((ed.getTime() - sd.getTime()) / (1000 * 3600 * 24)) + 1;
    const newStatus = newCompletedDays.length >= totalDays;

    await window.api.tasks.update(task.id, {
      completedDays: JSON.stringify(newCompletedDays),
      status: newStatus,
    });
    onTaskUpdated?.();
  };

  const handleOpenTaskDetail = (task: Task, dateStr: string) => {
    setSelectedTask(task);
    setSelectedTaskDateStr(dateStr);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
    setSelectedTaskDateStr('');
  };

  return {
    currentDate,
    selectedDay,
    currentWeekDays,
    year,
    month,
    selectedTask,
    selectedTaskDateStr,
    getTasksForDate,
    hasTasks,
    handlePrevMonth,
    handleNextMonth,
    handleGoToday,
    handleSelectDay,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleOpenTaskDetail,
    handleCloseTaskDetail,
  };
};