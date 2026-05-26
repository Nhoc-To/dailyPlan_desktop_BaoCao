import React from 'react';
import { Edit, Trash2, CheckSquare, Square } from 'lucide-react';
import { Task } from '../../../../shared/domain/entities';

interface TaskItemProps {
  task: Task;
  themeColor: string;
  isCompleted: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  themeColor,
  isCompleted,
  onToggle,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: `${themeColor}15`,
        padding: '12px',
        borderRadius: '12px',
        borderLeft: `4px solid ${themeColor}`,
        opacity: isCompleted ? 0.6 : 1,
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          style={{ cursor: 'pointer', marginTop: '2px', color: themeColor }}
        >
          {isCompleted ? <CheckSquare size={16} /> : <Square size={16} />}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              marginBottom: '4px',
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
            }}
          >
            {task.name}
          </div>
          {task.description && (
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {task.description}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '6px',
          marginTop: '6px',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: 'var(--primary-color)',
          }}
        >
          <Edit size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: '#ff5252',
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;