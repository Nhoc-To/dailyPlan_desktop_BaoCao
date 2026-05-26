import React from 'react';
import { Task } from '../../../shared/domain/entities';
import MiniCalendar from './week/MiniCalendar';
import WeekDayCell from './week/WeekDayCell';
import TaskDetailModal from './week/TaskDetailModal';
import { useWeeklyOverview } from './week/useWeeklyOverview';
import { WEEK_DAYS, isTaskCompletedOnDate } from './week/weeklyHelpers';

interface Props {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

const WeeklyOverview: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const {
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
  } = useWeeklyOverview(tasks, onTaskUpdated);

  const today = new Date();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Kế hoạch Tuần</h2>
        <button
          onClick={handleGoToday}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--primary-color)',
            background: 'transparent',
            color: 'var(--primary-color)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Hôm nay
        </button>
      </div>

      {/* Lưới 4x2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '24px',
        flex: 1,
        width: '100%',
      }}>
        {/* Ô 1: Mini Calendar */}
        <MiniCalendar
          year={year}
          month={month}
          selectedDay={selectedDay}
          hasTasks={hasTasks}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onGoToday={handleGoToday}
          onSelectDay={handleSelectDay}
        />

        {/* Ô 2-8: 7 ngày trong tuần */}
        {currentWeekDays.map((d, idx) => (
          <WeekDayCell
            key={idx}
            title={WEEK_DAYS[idx]}
            date={d}
            tasks={getTasksForDate(d)}
            isSelected={selectedDay?.toDateString() === d.toDateString()}
            isToday={today.toDateString() === d.toDateString()}
            onToggleTask={handleToggleStatus}
            onEditTask={handleEdit}
            onDeleteTask={handleDelete}
            onTaskClick={handleOpenTaskDetail}
          />
        ))}
      </div>

      {/* Modal chi tiết task */}
      <TaskDetailModal
        task={selectedTask}
        dateStr={selectedTaskDateStr}
        isCompleted={
          selectedTask
            ? isTaskCompletedOnDate(selectedTask, selectedTaskDateStr)
            : false
        }
        onClose={handleCloseTaskDetail}
        onToggle={() => {
          if (selectedTask) {
            handleToggleStatus(selectedTask, selectedTaskDateStr);
          }
        }}
      />
    </div>
  );
};

export default WeeklyOverview;