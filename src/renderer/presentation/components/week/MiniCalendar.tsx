import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getDaysInMonth, getFirstDayOfMonth } from './weeklyHelpers';

interface MiniCalendarProps {
  year: number;
  month: number;
  selectedDay: Date | null;
  hasTasks: (day: number) => boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
  onSelectDay: (day: number) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  year, month, selectedDay, hasTasks,
  onPrevMonth, onNextMonth, onGoToday, onSelectDay,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  return (
    <div className="glass card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <button
          onClick={onPrevMonth}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}
        >
          <ChevronLeft />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
            Tháng {month + 1}, {year}
          </h3>
          <button
            onClick={onGoToday}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--primary-color)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '4px',
              textDecoration: 'underline',
            }}
          >
            
          </button>
        </div>
        <button
          onClick={onNextMonth}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}
        >
          <ChevronRight />
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        textAlign: 'center',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        marginBottom: '8px',
      }}>
        <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1 }}>
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const hasTask = hasTasks(day);
          const isSelected = selectedDay?.getDate() === day
            && selectedDay?.getMonth() === month
            && selectedDay?.getFullYear() === year;
          const isToday = today.getDate() === day
            && today.getMonth() === month
            && today.getFullYear() === year;

          return (
            <div
              key={day}
              onClick={() => onSelectDay(day)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
                background: isSelected
                  ? 'var(--primary-color)'
                  : (isToday ? 'rgba(79,70,229,0.2)' : (hasTask ? 'rgba(79,70,229,0.05)' : 'transparent')),
                color: isSelected ? 'white' : (isToday ? 'var(--primary-color)' : 'var(--text-main)'),
                fontWeight: isSelected || hasTask || isToday ? 600 : 400,
                transition: 'all 0.2s',
                position: 'relative',
                border: isToday && !isSelected ? '1px solid var(--primary-color)' : '1px solid transparent',
              }}
            >
              {day}
              {hasTask && (
                <CheckCircle2
                  size={10}
                  color={isSelected ? 'white' : 'var(--primary-color)'}
                  style={{ position: 'absolute', bottom: '2px' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;