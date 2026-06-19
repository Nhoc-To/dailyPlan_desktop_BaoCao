import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../shared/domain/entities';
import SummaryBox from '../components/Year/SumaryBox';
import SortingToolbar from '../components/Year/SortingToolbar';
import TaskYearCard from '../components/Year/TaskYearCard';
import BulkDeleteBar from '../components/Year/BulDeleteBar';

type SortType = 'date' | 'duration' | 'name';

interface Props {
  tasks: Task[];
  onTaskUpdated: () => Promise<void>;
}

const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

const YCalendar: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

  const tasksForYear = useMemo<Task[]>(() => {
    const list = tasks.filter(t => new Date(t.startDate).getFullYear() === selectedYear);

    const isBottom = (t: Task) => {
      const isOverdue = !t.status && new Date(`${t.endDate}T${t.endTime || '23:59'}`).getTime() <= Date.now();
      return t.status || isOverdue;
    };

    return [...list].sort((a, b) => {
      if (isBottom(a) && !isBottom(b)) return 1;
      if (!isBottom(a) && isBottom(b)) return -1;
      switch (sortBy) {
        case 'date': return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'duration': {
          const ra = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime() - Date.now();
          const rb = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime() - Date.now();
          return ra - rb;
        }
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [tasks, sortBy, selectedYear]);

  const monthStats = useMemo(() => {
    const s = Array(12).fill(0);
    tasksForYear.forEach(t => { s[new Date(t.startDate).getMonth()]++; });
    return s;
  }, [tasksForYear]);

  const maxMonth = Math.max(...monthStats, 1);

  const toggleTask = (id: number) =>
    setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  // ── Toggle status (XONG column) ──
  const handleToggleStatus = async (task: Task) => {
    try {
      await window.api.tasks.update(task.id, { status: !task.status });
      await onTaskUpdated();
    } catch (err) {
      console.error('Toggle status failed', err);
    }
  };

  // ── Navigate to editor (click on task name) ──
  const handleEditTask = (task: Task) => {
    navigate('/editor', { state: { task } });
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Xóa ${selectedIds.length} nhiệm vụ?`)) return;
    try {
      await window.api.tasks.deleteTasks(selectedIds);
      setSelectedIds([]);
      setSelectionMode(false);
      await onTaskUpdated();
    } catch (err) {
      console.error('Bulk delete failed', err);
    }
  };

  const COLS = [
    { key: 'xong',    label: 'XONG',              width: '52px'  },
    { key: 'name',    label: 'TÁC VỤ',             width: '1fr'   },
    { key: 'tags',    label: 'PHÂN LOẠI',           width: '110px' },
    { key: 'desc',    label: 'MÔ TẢ',              width: '130px' },
    { key: 'start',   label: 'BẮT ĐẦU',            width: '120px' },
    { key: 'end',     label: 'KẾT THÚC',           width: '120px' },
    { key: 'status',  label: 'THỜI GIAN CÒN LẠI',  width: '118px' },
    { key: 'actions', label: 'THAO TÁC',            width: '80px'  },
  ];
  const gridCols = COLS.map(c => c.width).join(' ');

  return (
    <div style={{ padding: '28px 32px', background: '#F9FAFB', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B5CEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Lịch Năm
            <span style={{ marginLeft: '4px', background: '#EEF2FF', color: '#5B5CEB', fontSize: '13px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px' }}>
              {tasksForYear.length} Tác vụ
            </span>
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#6B7280' }}>
            Tổng hợp toàn bộ nhiệm vụ trong năm {selectedYear}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Year selector */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              style={{
                padding: '7px 32px 7px 14px', borderRadius: '8px',
                border: '1.5px solid #E5E7EB', fontWeight: 600, fontSize: '13px',
                color: '#111827', background: '#FFFFFF', cursor: 'pointer',
                appearance: 'none', outline: 'none',
              }}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <svg style={{ position: 'absolute', right: '10px', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <SummaryBox tasks={tasksForYear} />

      {/* ── Monthly bar chart ── */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px 24px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5CEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
          </svg>
          Phân bố theo tháng
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '8px', alignItems: 'flex-end' }}>
          {monthStats.map((count, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: count > 0 ? '#5B5CEB' : '#D1D5DB', marginBottom: '4px' }}>{count}</div>
              <div style={{ height: `${Math.max(6, (count / maxMonth) * 48)}px`, background: count > 0 ? 'linear-gradient(180deg,#818CF8,#5B5CEB)' : '#F3F4F6', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px', fontWeight: 500 }}>{MONTHS[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bulk delete bar ── */}
      {selectionMode && (
        <BulkDeleteBar count={selectedIds.length} onDelete={handleBulkDelete} onCancel={() => { setSelectionMode(false); setSelectedIds([]); }} />
      )}

      {/* ── Task table ── */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>

        {/* Sort toolbar + Xóa button — ngay trên bảng */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SortingToolbar sortBy={sortBy} setSortBy={setSortBy} />

          {/* Nút Xóa (toggle chọn nhiều) */}
          <button
            onClick={() => { setSelectionMode(!selectionMode); setSelectedIds([]); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '8px',
              border: selectionMode ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
              background: selectionMode ? '#FEE2E2' : '#FFFFFF',
              color: selectionMode ? '#DC2626' : '#6B7280',
              fontWeight: 500, fontSize: '13px', cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {selectionMode
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><path d="M9 3h6l1 1h4v2H4V4h4z"/><path d="M5 7l1 14h12l1-14"/></>
              }
            </svg>
            {selectionMode ? 'Huỷ' : 'Xóa'}
          </button>
        </div>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
          {COLS.map(col => (
            <div key={col.key} style={{
              padding: col.key === 'xong' ? '10px 0' : '10px 8px',
              fontSize: '11px', fontWeight: 600, color: '#6B7280',
              letterSpacing: '0.05em',
              textAlign: col.key === 'xong' ? 'center' : 'left',
              borderRight: col.key !== 'actions' ? '1px solid #F3F4F6' : 'none',
            }}>{col.label}</div>
          ))}
        </div>

        {/* Rows */}
        {tasksForYear.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>Không có nhiệm vụ nào trong năm {selectedYear}</p>
          </div>
        ) : (
          tasksForYear.map(task => (
            <TaskYearCard
              key={task.id}
              task={task}
              selectionMode={selectionMode}
              selected={selectedIds.includes(task.id)}
              onToggle={toggleTask}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default YCalendar;
