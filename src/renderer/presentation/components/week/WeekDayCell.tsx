import React from 'react';
import { Task } from '../../../../shared/domain/entities';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';
import TaskItem from './TaskItem';
import { formatDateStr, isTaskCompletedOnDate } from './weeklyHelpers';

interface WeekDayCellProps {
  title: string;
  date: Date;
  tasks: Task[];
  isSelected: boolean;
  isToday: boolean;
  onToggleTask: (task: Task, dateStr: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onTaskClick: (task: Task, dateStr: string) => void;
}

const WeekDayCell: React.FC<WeekDayCellProps> = ({
  title, date, tasks, isSelected, isToday,
  onToggleTask, onEditTask, onDeleteTask, onTaskClick,
}) => {
  const dateStr = formatDateStr(date);
  const dateBadge = `${date.getDate()}/${date.getMonth() + 1}`;

  const sortedTasks = [...tasks].sort((a, b) => {
    return Number(isTaskCompletedOnDate(a, dateStr)) - Number(isTaskCompletedOnDate(b, dateStr))
      || a.id - b.id;
  });

  return (
    <div className="glass card" style={{
      padding: 0,
      border: isSelected
        ? '2px solid var(--primary-color)'
        : (isToday ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
      boxShadow: isSelected ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
      background: isToday ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)',
    }}>
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header ngày */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--surface-border)',
        }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', margin: 0 }}>
            {title}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {dateBadge}
          </span>
        </div>

        {/* Danh sách task */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingRight: '4px',
        }}>
          {sortedTasks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              Không có tác vụ
            </p>
          ) : (
            sortedTasks.map(task => {
              const themeColor = task.color
                || SYSTEM_CATEGORIES.find(c => c.id === task.categoryId)?.color
                || SYSTEM_CATEGORIES[0].color;

              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  themeColor={themeColor}
                  isCompleted={isTaskCompletedOnDate(task, dateStr)}
                  onToggle={() => onToggleTask(task, dateStr)}
                  onEdit={() => onEditTask(task)}
                  onDelete={() => onDeleteTask(task.id)}
                  onClick={() => onTaskClick(task, dateStr)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekDayCell;