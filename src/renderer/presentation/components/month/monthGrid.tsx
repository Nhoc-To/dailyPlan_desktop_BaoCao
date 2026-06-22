// src/renderer/presentation/components/month/monthGrid.tsx
import React from 'react';
import { Task } from '../../../../shared/domain/entities';
import MonthDayCell from './monthDayCell';

interface Props {
  year: number;
  month: number;
  tasksByDate: Map<number, Task[]>;
  onDayClick: (date: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  selectedDate?: string;
}

const MonthGrid: React.FC<Props> = ({
  year,
  month,
  tasksByDate,
  onDayClick,
  onEdit,
  onDelete,
  selectedDate
}) => {
  // Tính toán các ngày trong tháng
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const firstDay = new Date(y, m, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // 0 = Thứ 2
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  // Tạo mảng 42 ngày
  const calendarDays = [];
  
  // Ngày tháng trước
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: prevMonthDays - i,
      isCurrentMonth: false,
      dateStr: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`
    });
  }
  
  // Ngày tháng hiện tại
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: i,
      isCurrentMonth: true,
      dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }
  
  // Tổng số ô = số hàng cần thiết × 7 (có thể là 35 hoặc 42 tuỳ tháng)
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  const remaining = totalCells - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      date: i,
      isCurrentMonth: false,
      dateStr: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px'
    }}>
      {/* Header các thứ */}
      {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map(day => (
        <div key={day} style={{
          textAlign: 'center',
          fontWeight: 600,
          padding: '8px',
          color: 'var(--text-muted)'
        }}>
          {day}
        </div>
      ))}
      
      {/* Các ô ngày */}
      {calendarDays.map((day, idx) => {
        return (
          <MonthDayCell
            key={idx}
            date={day.date}
            isCurrentMonth={day.isCurrentMonth}
            dateStr={day.dateStr}
            tasks={day.isCurrentMonth ? tasksByDate.get(day.date) || [] : []}
            onDayClick={onDayClick}
            onEdit={(e, task) => onEdit(task)}
            onDelete={(e, id) => onDelete(id)}
            isSelected={selectedDate === day.dateStr}
          />
        );
      })}
    </div>
  );
};

export default MonthGrid;