import React, { useState, useMemo } from 'react';
import { Task } from '../../../shared/domain/entities';

import SummaryBox from '../components/Year/SumaryBox';
import SortingToolbar from '../components/Year/SortingToolbar';
import TaskYearCard from '../components/Year/TaskYearCard';
import BulkDeleteBar from '../components/Year/BulDeleteBar';

type SortType =
  | 'date'
  | 'duration'
  | 'name';

interface Props {
  tasks: Task[];
  onTaskUpdated: () => Promise<void>;
}

const YCalendar: React.FC<Props> = ({
  tasks,
  onTaskUpdated
}) => {

  const [sortBy, setSortBy] =
    useState<SortType>('date');

  const [selectedYear, setSelectedYear] =
    useState(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] =
    useState<number | null>(null);

  const [selectionMode, setSelectionMode] =
    useState(false);

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const years = Array.from(
    { length: 11 },
    (_, i) =>
      new Date().getFullYear() - 5 + i
  );

  const tasksForYear = useMemo<Task[]>(() => {

    const list = tasks.filter(task => {

      const d = new Date(task.startDate);
      const year = d.getFullYear();
      const month = d.getMonth();

      if (year !== selectedYear) return false;
      if (selectedMonth !== null && month !== selectedMonth) return false;
      return true;

    });

    const isTaskCompletedOrOverdue =
      (task: Task) => {

        const isDone =
          task.status;

        const endDateTime =
          new Date(
            `${task.endDate}T${task.endTime || '23:59'}`
          ).getTime();

        const isOverdue =
          !isDone &&
          endDateTime <= Date.now();

        return isDone || isOverdue;
      };

    return [...list].sort((a, b) => {

      const bottomA =
        isTaskCompletedOrOverdue(a);

      const bottomB =
        isTaskCompletedOrOverdue(b);

      if (bottomA && !bottomB)
        return 1;

      if (!bottomA && bottomB)
        return -1;

      switch (sortBy) {

        case 'date':

          return (
            new Date(b.startDate).getTime()
            -
            new Date(a.startDate).getTime()
          );

        case 'duration':

          const remainA =
            new Date(
              `${a.endDate}T${a.endTime || '23:59'}`
            ).getTime()
            - Date.now();

          const remainB =
            new Date(
              `${b.endDate}T${b.endTime || '23:59'}`
            ).getTime()
            - Date.now();

          return remainA - remainB;

        case 'name':

          return a.name.localeCompare(
            b.name
          );

        default:
          return 0;
      }

    });

  }, [tasks, sortBy, selectedYear, selectedMonth]);

  const monthStats = useMemo(() => {

    const stats =
      Array(12).fill(0);

    tasksForYear.forEach(task => {

      const month =
        new Date(task.startDate)
          .getMonth();

      stats[month]++;

    });

    return stats;

  }, [tasksForYear]);

  const toggleTask =
    (id: number) => {

      setSelectedIds(prev =>
        prev.includes(id)
          ? prev.filter(x => x !== id)
          : [...prev, id]
      );

    };
    const handleBulkDelete = async () => {

  if (
    !window.confirm(
      `Xóa ${selectedIds.length} nhiệm vụ?`
    )
  ) {
    return;
  }

  try {

    await window.api.tasks.deleteTasks(selectedIds);

    setSelectedIds([]);

    setSelectionMode(false);

    await onTaskUpdated();

  } catch (error) {

    console.error(
      'Bulk delete failed',
      error
    );

  }

};

  return (
    <div
      style={{
        padding: '30px',
        background: '#F5F6FF',
        minHeight: '100vh'
      }}
    >

      {/* Header */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >

        <div>
          <h1
            style={{
              margin: 0,
              color: '#1F2937'
            }}
          >
            📅 Lịch năm {selectedYear}
          </h1>

          <p
            style={{
              color: '#6B7280',
              marginTop: '8px'
            }}
          >
            Tổng hợp toàn bộ nhiệm vụ trong năm
          </p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              Number(e.target.value)
            )
          }
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid #D6D9F0',
            fontWeight: 600,
            color: '#5B5CEB'
          }}
        >
          {years.map(year => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

      </div>

      {/* Summary */}

      <SummaryBox tasks={tasksForYear} />

      {/* Thống kê theo tháng */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(12,1fr)',
          gap: '10px',
          marginBottom: '30px'
        }}
      >
      {monthStats.map(
          (count, index) => {
            const isActive = selectedMonth === index;
            const hasTask = count > 0;
            return (
            <div
              key={index}
              onClick={() =>
                setSelectedMonth(
                  isActive ? null : index
                )
              }
              style={{
                background: isActive
                  ? '#5B5CEB'
                  : '#FFFFFF',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center',
                boxShadow:
                  '0 4px 12px rgba(91,92,235,0.08)',
                cursor: hasTask ? 'pointer' : 'default',
                border: isActive
                  ? '2px solid #5B5CEB'
                  : hasTask
                  ? '2px solid #D6D9F0'
                  : '2px solid transparent',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.18s ease'
              }}
            >
              <div
                style={{
                  color: isActive ? '#FFFFFF' : '#5B5CEB',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                T{index + 1}
              </div>

              <div
                style={{
                  color: isActive ? '#E0E7FF' : '#374151',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginTop: '4px'
                }}
              >
                {count}
              </div>

            </div>
            );
          }
        )}
      </div>

      {/* Sorting */}

      <SortingToolbar
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Filter tháng active */}
      {selectedMonth !== null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
            background: '#EEF2FF',
            borderRadius: '12px',
            padding: '10px 16px',
            width: 'fit-content'
          }}
        >
          <span style={{ color: '#4338CA', fontWeight: 600 }}>
            📅 Tháng {selectedMonth + 1} — {tasksForYear.length} nhiệm vụ
          </span>
          <button
            onClick={() => setSelectedMonth(null)}
            style={{
              background: '#5B5CEB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            ✕ Bỏ lọc
          </button>
        </div>
      )}

      {/* Bulk Delete */}

      {selectionMode && (

       <BulkDeleteBar
      count={selectedIds.length}
      onDelete={handleBulkDelete}
      onCancel={() => {setSelectionMode(false); setSelectedIds([]);}}/>

      )}

      {/* Toggle Selection */}

      <button
        onClick={() =>
          setSelectionMode(
            !selectionMode
          )
        }
        style={{
          marginBottom: '20px',
          background: '#5B5CEB',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '12px',
          padding: '10px 16px',
          cursor: 'pointer'
        }}
      >
        {selectionMode
          ? 'Huỷ chọn'
          : 'Chọn nhiều'}
      </button>

      

      {/* Tasks */}

      {tasksForYear.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            padding: '50px',
            background: '#FFFFFF',
            borderRadius: '24px'
          }}
        >
          <h2>📚</h2>

          <p>
            Không có nhiệm vụ nào
            trong năm {selectedYear}
          </p>

        </div>

      ) : (

        tasksForYear.map(task => (

          <TaskYearCard
            key={task.id}
            task={task}
            selectionMode={selectionMode}
            selected={
              selectedIds.includes(
                task.id
              )
            }
            onToggle={
              toggleTask
            }
          />

        ))

      )}

    </div>
  );
};

export default YCalendar;