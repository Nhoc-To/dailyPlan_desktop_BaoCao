// src/renderer/presentation/components/month/monthDayCell.tsx
import React from 'react';
import { Task } from '../../../../shared/domain/entities';
import { Edit, Trash2, Clock } from 'lucide-react';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';

interface Props {
  date: number;
  dateStr: string;
  isCurrentMonth: boolean;
  tasks: Task[];
  onDayClick: (date: string, e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent, task: Task) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
  isSelected?: boolean;
}

const MonthDayCell: React.FC<Props> = ({
  date,
  dateStr,
  isCurrentMonth,
  tasks,
  onDayClick,
  onEdit,
  onDelete,
  isSelected = false
}) => {
  const isToday = () => {
    const today = new Date();
    return today.getDate() === date &&
           today.getMonth() === new Date(dateStr).getMonth() &&
           today.getFullYear() === new Date(dateStr).getFullYear();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isCurrentMonth) {
          onDayClick(dateStr, e);
        }
      }}
      style={{
        background: isCurrentMonth ? 'var(--surface-bg)' : '#f5f5f5',
        border: isSelected
          ? '2px solid var(--primary-color)'
          : isToday() ? '2px solid #ef4444' : '1px solid var(--surface-border)',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(79,70,229,0.15)'
          : isToday() ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none',
        borderRadius: '12px',
        padding: '8px',
        minHeight: '100px',
        cursor: isCurrentMonth ? 'pointer' : 'default',
        opacity: isCurrentMonth ? 1 : 0.5,
        transition: 'all 0.2s'
      }}
    >
      <div style={{
        textAlign: 'right',
        fontWeight: isToday() ? 700 : 400,
        color: isSelected ? 'var(--primary-color)' : isToday() ? '#ef4444' : 'var(--text-main)',
        marginBottom: '8px'
      }}>
        {date}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {tasks.slice(0, 3).map(task => {
          const theme = task.color || SYSTEM_CATEGORIES.find(c => c.id === task.categoryId)?.color || '#448aff';
          let completedDays: string[] = [];
          try { completedDays = JSON.parse(task.completedDays || '[]'); } catch {}
          const isCompleted = completedDays.includes(dateStr);
          
          return (
            <div
              key={task.id}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: `${theme}20`,
                borderLeft: `3px solid ${theme}`,
                padding: '4px 6px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isCompleted ? 0.6 : 1,
                textDecoration: isCompleted ? 'line-through' : 'none'
              }}
            >
              <span style={{ 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                flex: 1
              }}>
                {task.name}
              </span>
              <div style={{ display: 'flex', gap: '4px', marginLeft: '4px' }}>
                <button
                  onClick={(e) => onEdit(e, task)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Edit size={10} />
                </button>
                <button
                  onClick={(e) => onDelete(e, task.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
          );
        })}
        {tasks.length > 3 && (
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            +{tasks.length - 3} nữa
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthDayCell;