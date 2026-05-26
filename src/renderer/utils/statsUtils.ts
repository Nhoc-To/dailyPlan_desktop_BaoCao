export type TaskLike = {
  status?: boolean;
  categoryId?: number | null;
};

export const countTaskStatus = (tasks: TaskLike[]) => {
  const completed = tasks.filter(task => task.status === true).length;
  const pending = tasks.length - completed;

  return {
    total: tasks.length,
    completed,
    pending
  };
};

export const countTasksByCategory = (tasks: TaskLike[]) => {
  const result: Record<string, number> = {};

  tasks.forEach(task => {
    const key = task.categoryId ? `Loại ${task.categoryId}` : 'Chưa phân loại';
    result[key] = (result[key] || 0) + 1;
  });

  return result;
};