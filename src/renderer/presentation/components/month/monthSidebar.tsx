import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../../../../shared/domain/entities';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';

interface Props {
  year: number;
  month: number;
  tasksByDate: Map<number, Task[]>;
  prevMonth: (e: React.MouseEvent) => void;
  nextMonth: (e: React.MouseEvent) => void;
  onDayClick: (date: string, e: React.MouseEvent) => void;  // Giữ lại cho double-click
  onSelectDay: (date: string) => void;  // THÊM: cho single-click chọn ngày
  selectedDate?: string;  // THÊM: ngày đang được chọn
}

const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MonthSidebar: React.FC<Props> = ({
  year,
  month,
  tasksByDate,
  prevMonth,
  nextMonth,
  onDayClick,
  onSelectDay,
  selectedDate
}) => {
  const [localSelectedDate, setLocalSelectedDate] = useState<string | null>(null);
  
  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    let day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  const nextMonthEmptyDays = totalCells - (daysInMonth + firstDay);

  const handleDateClick = (dateStr: string, isCurrentMonth: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentMonth) {
      // CHỈ chọn ngày, KHÔNG mở form
      onSelectDay(dateStr);
      setLocalSelectedDate(dateStr);
    }
  };

  const handleDateDoubleClick = (dateStr: string, isCurrentMonth: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentMonth) {
      // Mở form tạo tác vụ
      onDayClick(dateStr, e);
    }
  };

  const isSelectedDate = (dateStr: string) => {
    return selectedDate === dateStr || localSelectedDate === dateStr;
  };

  return (
    <div
      className="glass card"
      style={{
        width: '280px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevMonth(e);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary-color)'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <h4 style={{ margin: 0 }}>
            {month + 1}/{year}
          </h4>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMonth(e);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary-color)'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            textAlign: 'center'
          }}
        >
          {WEEK_DAYS.map(day => (
            <div key={day} style={{ fontSize: '12px', fontWeight: 600 }}>
              {day}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px'
          }}
        >
          {/* Ngày tháng trước */}
          {Array.from({ length: firstDay }).map((_, i) => {
            const prevDate = prevMonthDays - firstDay + i + 1;
            return (
              <div
                key={`prev-${i}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  color: 'var(--text-muted)',
                  opacity: 0.3,
                  fontSize: '12px',
                  cursor: 'default'
                }}
              >
                {prevDate}
              </div>
            );
          })}

          {/* Ngày tháng hiện tại */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasTask = tasksByDate.has(day);
            const today = new Date();
            const isToday = today.getDate() === day && 
                           today.getMonth() === month && 
                           today.getFullYear() === year;
            const isSelected = isSelectedDate(dateStr);

            return (
              <div
                key={day}
                onClick={(e) => handleDateClick(dateStr, true, e)}
                onDoubleClick={(e) => handleDateDoubleClick(dateStr, true, e)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: isSelected 
                    ? 'var(--primary-color)' 
                    : (isToday ? 'rgba(239,68,68,0.15)' : 'transparent'),
                  color: isSelected 
                    ? 'white' 
                    : (isToday ? '#ef4444' : 'var(--text-main)'),
                  border: isToday && !isSelected ? '1.5px solid #ef4444' : 'none',
                  position: 'relative',
                  fontWeight: isSelected || isToday ? 700 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {day}
                {hasTask && !isSelected && !isToday && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--primary-color)'
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Ngày tháng sau */}
          {Array.from({ length: nextMonthEmptyDays }).map((_, i) => {
            const nextDate = i + 1;
            return (
              <div
                key={`next-${i}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  color: 'var(--text-muted)',
                  opacity: 0.3,
                  fontSize: '12px',
                  cursor: 'default'
                }}
              >
                {nextDate}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>
          Phân loại lịch
        </h4>
        {SYSTEM_CATEGORIES.map(c => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '13px'
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: c.color
              }}
            />
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthSidebar;