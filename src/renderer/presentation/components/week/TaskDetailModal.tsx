import React from 'react';
import { X, CheckSquare, Square, Calendar } from 'lucide-react';
import { Task } from '../../../../shared/domain/entities';

interface TaskDetailModalProps {
  task: Task | null;
  dateStr: string;
  isCompleted: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task, dateStr, isCompleted, onClose, onToggle,
}) => {
  if (!task) return null;

  const themeColor = task.color || '#4f46e5';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface-bg, #ffffff)',
          borderRadius: '16px',
          padding: '24px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          borderTop: `6px solid ${themeColor}`,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}>
          <h2 style={{
            margin: 0,
            color: 'var(--text-main)',
            fontSize: '1.4rem',
            textDecoration: isCompleted ? 'line-through' : 'none',
            opacity: isCompleted ? 0.6 : 1,
          }}>
            {task.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Ngày */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
        }}>
          <Calendar size={16} />
          <span>Ngày: {dateStr}</span>
        </div>

        {/* Nút trạng thái */}
        <button
          onClick={onToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: `1px solid ${themeColor}`,
            background: isCompleted ? `${themeColor}20` : 'transparent',
            color: themeColor,
            cursor: 'pointer',
            fontWeight: 600,
            marginBottom: '20px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {isCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
          {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
        </button>

        {/* Ghi chú */}
        <div>
          <h3 style={{
            fontSize: '1rem',
            color: 'var(--text-main)',
            marginBottom: '8px',
          }}>
            📝 Ghi chú
          </h3>
          <div style={{
            padding: '16px',
            background: `${themeColor}10`,
            borderRadius: '12px',
            borderLeft: `4px solid ${themeColor}`,
            minHeight: '100px',
            fontSize: '0.95rem',
            color: 'var(--text-main)',
            lineHeight: 1.6,
          }}>
            {task.description || (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Chưa có ghi chú cho tác vụ này.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;