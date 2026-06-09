import React, { useState, useMemo } from 'react';
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

const MONTH_NAMES = [
  'Th.1','Th.2','Th.3','Th.4','Th.5','Th.6',
  'Th.7','Th.8','Th.9','Th.10','Th.11','Th.12'
];

// Parse "YYYY-MM-DD" an toàn, không bị lệch múi giờ
const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m - 1, day: d }; // month: 0-based
};

const YCalendar: React.FC<Props> = ({ tasks, onTaskUpdated }) => {

  const [sortBy, setSortBy] = useState<SortType>('date');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

  // ── Toàn bộ tasks của năm (không filter tháng) ──
  const tasksOfYear = useMemo<Task[]>(() => {
    return tasks.filter(task => {
      const { year } = parseLocalDate(task.startDate);
      return year === selectedYear;
    });
  }, [tasks, selectedYear]);

  // ── Thống kê 12 tháng — LUÔN tính từ toàn bộ năm ──
  const monthStats = useMemo(() => {
    const stats = Array(12).fill(0);
    tasksOfYear.forEach(task => {
      const { month } = parseLocalDate(task.startDate);
      stats[month]++;
    });
    return stats;
  }, [tasksOfYear]);

  // ── Tasks hiển thị = lọc tháng (nếu có) + sắp xếp ──
  const tasksVisible = useMemo<Task[]>(() => {
    const list = selectedMonth === null
      ? tasksOfYear
      : tasksOfYear.filter(task => {
          const { month } = parseLocalDate(task.startDate);
          return month === selectedMonth;
        });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'duration': {
          const endA = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime();
          const endB = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime();
          return endA - endB;
        }
        case 'name':
          return a.name.localeCompare(b.name, 'vi');
        default:
          return 0;
      }
    });
  }, [tasksOfYear, selectedMonth, sortBy]);

  const toggleTask = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Xóa ${selectedIds.length} nhiệm vụ?`)) return;
    try {
      await window.api.tasks.deleteTasks(selectedIds);
      setSelectedIds([]);
      setSelectionMode(false);
      await onTaskUpdated();
    } catch (error) {
      console.error('Bulk delete failed', error);
    }
  };

  return (
    <div style={{ padding: '30px', background: '#F5F6FF', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1F2937' }}>📅 Lịch năm {selectedYear}</h1>
          <p style={{ color: '#6B7280', marginTop: '8px', marginBottom: 0 }}>
            Tổng hợp toàn bộ nhiệm vụ trong năm
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={e => { setSelectedYear(Number(e.target.value)); setSelectedMonth(null); }}
          style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #D6D9F0', fontWeight: 600, color: '#5B5CEB', background: '#fff' }}
        >
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>

      {/* ── Summary ── */}
      <SummaryBox tasks={tasksVisible} />

      {/* ── Lưới 12 tháng ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '8px', marginBottom: '28px' }}>
        {monthStats.map((count, index) => {
          const isActive = selectedMonth === index;
          const hasTask = count > 0;
          return (
            <div
              key={index}
              onClick={() => hasTask && setSelectedMonth(isActive ? null : index)}
              style={{
                background: isActive ? '#5B5CEB' : '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 6px',
                textAlign: 'center',
                boxShadow: isActive
                  ? '0 6px 18px rgba(91,92,235,0.30)'
                  : '0 2px 8px rgba(91,92,235,0.07)',
                cursor: hasTask ? 'pointer' : 'default',
                border: isActive ? '2px solid #5B5CEB' : '2px solid #ECECF7',
                transform: isActive ? 'scale(1.10)' : 'scale(1)',
                transition: 'all 0.18s ease',
              }}
            >
              <div style={{
                color: isActive ? '#C7D2FE' : '#9CA3AF',
                fontWeight: 600, fontSize: '11px',
                marginBottom: '8px', letterSpacing: '0.3px'
              }}>
                {MONTH_NAMES[index]}
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '50%',
                background: isActive ? 'rgba(255,255,255,0.22)' : hasTask ? '#EF4444' : '#F3F4F6',
                color: isActive ? '#FFFFFF' : hasTask ? '#FFFFFF' : '#D1D5DB',
                fontWeight: 700, fontSize: '14px',
              }}>
                {count}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Sorting ── */}
      <SortingToolbar sortBy={sortBy} setSortBy={setSortBy} />

      {/* ── Chip tháng đang lọc ── */}
      {selectedMonth !== null && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          marginBottom: '16px', background: '#EEF2FF', borderRadius: '12px', padding: '10px 16px'
        }}>
          <span style={{ color: '#4338CA', fontWeight: 600 }}>
            📅 Tháng {selectedMonth + 1} · {tasksVisible.length} nhiệm vụ
          </span>
          <button
            onClick={() => setSelectedMonth(null)}
            style={{
              background: '#5B5CEB', color: '#FFF', border: 'none',
              borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '13px'
            }}
          >
            ✕ Xem cả năm
          </button>
        </div>
      )}

      {/* ── Bulk delete ── */}
      {selectionMode && (
        <BulkDeleteBar
          count={selectedIds.length}
          onDelete={handleBulkDelete}
          onCancel={() => { setSelectionMode(false); setSelectedIds([]); }}
        />
      )}

      {/* ── Nút chọn nhiều ── */}
      <button
        onClick={() => setSelectionMode(!selectionMode)}
        style={{
          marginBottom: '20px', background: '#5B5CEB', color: '#FFF',
          border: 'none', borderRadius: '12px', padding: '10px 16px', cursor: 'pointer'
        }}
      >
        {selectionMode ? 'Huỷ chọn' : 'Chọn nhiều'}
      </button>

      {/* ── Danh sách task ── */}
      {tasksVisible.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#FFFFFF', borderRadius: '24px' }}>
          <h2>📚</h2>
          <p style={{ color: '#6B7280' }}>
            Không có nhiệm vụ nào{' '}
            {selectedMonth !== null
              ? `trong tháng ${selectedMonth + 1}/${selectedYear}`
              : `trong năm ${selectedYear}`}
          </p>
        </div>
      ) : (
        tasksVisible.map(task => (
          <TaskYearCard
            key={task.id}
            task={task}
            selectionMode={selectionMode}
            selected={selectedIds.includes(task.id)}
            onToggle={toggleTask}
          />
        ))
      )}

    </div>
  );
};

export default YCalendar;
