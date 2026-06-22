import React from 'react';
import { Task } from '../../../../shared/domain/entities';

interface Props {
  task: Task;
  selectionMode: boolean;
  selected: boolean;
  onToggle: (id: number) => void;
  onToggleStatus: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  'Học tập': { bg: '#FEE2E2', color: '#DC2626' },
  'Công việc': { bg: '#DBEAFE', color: '#2563EB' },
  'Giải trí': { bg: '#D1FAE5', color: '#059669' },
  'Cá nhân': { bg: '#FEF3C7', color: '#D97706' },
};
const getCategoryStyle = (tag?: string) => {
  if (!tag) return { bg: '#F3F4F6', color: '#6B7280' };
  return categoryColors[tag] ?? { bg: '#EEF2FF', color: '#4338CA' };
};

const TaskYearCard: React.FC<Props> = ({ task, selectionMode, selected, onToggle, onToggleStatus, onEdit }) => {
  const overdue = !task.status && new Date(task.endDate).getTime() < Date.now();
  const catStyle = getCategoryStyle(task.tags);

  const statusConfig = task.status
    ? { bg: '#DCFCE7', color: '#16A34A', label: 'Hoàn thành', dot: '#16A34A' }
    : overdue
    ? { bg: '#FEE2E2', color: '#DC2626', label: 'Quá hạn', dot: '#DC2626' }
    : { bg: '#EEF2FF', color: '#5B5CEB', label: 'Đang thực hiện', dot: '#5B5CEB' };

  const leftBorder = task.status ? '#16A34A' : overdue ? '#DC2626' : '#5B5CEB';

  // grid columns must match YCalendar's COLS definition
  const gridCols = '52px 1fr 110px 130px 120px 120px 118px 80px';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: gridCols,
      alignItems: 'center',
      background: selected ? '#F5F3FF' : '#FFFFFF',
      borderBottom: '1px solid #F3F4F6',
      borderLeft: `3px solid ${leftBorder}`,
      minHeight: '60px',
      transition: 'background 0.15s',
    }}>

      {/* ── XONG: checkbox (select mode) or status toggle button ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>
        {selectionMode ? (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(task.id)}
            style={{ width: '16px', height: '16px', accentColor: '#5B5CEB', cursor: 'pointer' }}
          />
        ) : (
          <button
            title={task.status ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
            onClick={() => onToggleStatus(task)}
            style={{
              width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
              border: `2px solid ${task.status ? '#16A34A' : '#D1D5DB'}`,
              background: task.status ? '#16A34A' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0, transition: 'all 0.15s',
            }}
          >
            {task.status && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* ── TÁC VỤ: clickable name → edit ── */}
      <div
        onClick={() => onEdit(task)}
        style={{ padding: '12px 16px 12px 8px', overflow: 'hidden', cursor: 'pointer' }}
        title="Nhấn để chỉnh sửa"
      >
        <div style={{
          fontWeight: 600, fontSize: '14px', color: '#111827',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          textDecoration: task.status ? 'line-through' : 'none',
          opacity: task.status ? 0.55 : 1,
        }}>
          {task.name}
        </div>
        {task.description && (
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {task.description}
          </div>
        )}
      </div>

      {/* ── PHÂN LOẠI ── */}
      <div style={{ padding: '0 8px' }}>
        {task.tags ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '3px 9px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
            background: catStyle.bg, color: catStyle.color,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            {task.tags}
          </span>
        ) : (
          <span style={{ color: '#D1D5DB', fontSize: '13px' }}>—</span>
        )}
      </div>

      {/* ── MÔ TẢ ── */}
      <div style={{ padding: '0 8px', fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {task.description || <span style={{ color: '#D1D5DB' }}>—</span>}
      </div>

      {/* ── BẮT ĐẦU ── */}
      <div style={{ padding: '0 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#374151' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {task.startDate}
        </div>
        {task.startTime && <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px', paddingLeft: '17px' }}>{task.startTime}</div>}
      </div>

      {/* ── KẾT THÚC ── */}
      <div style={{ padding: '0 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: overdue ? '#DC2626' : '#374151' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={overdue ? '#DC2626' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {task.endDate}
        </div>
        {task.endTime && <div style={{ fontSize: '11px', color: overdue ? '#FCA5A5' : '#9CA3AF', marginTop: '2px', paddingLeft: '17px' }}>{task.endTime}</div>}
      </div>

      {/* ── THỜI GIAN CÒN LẠI (status badge) ── */}
      <div style={{ padding: '0 8px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
          background: statusConfig.bg, color: statusConfig.color,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusConfig.dot, flexShrink: 0 }} />
          {statusConfig.label}
        </span>
      </div>

      {/* ── THAO TÁC ── */}
      <div style={{ padding: '0 12px', display: 'flex', justifyContent: 'center' }}>
        <button
          title="Chỉnh sửa"
          onClick={() => onEdit(task)}
          style={{
            width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E5E7EB',
            background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskYearCard;
