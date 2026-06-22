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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const tasksByDateStr = useMemo(() => buildTasksByDateStr(tasks), [tasks]);

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
    if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
      if (window.api?.tasks) {
        await window.api.tasks.delete(id);
        onTaskUpdated?.();
      }
    }
  };

  const handleToggleStatus = async (task: Task, dateStr: string) => {
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