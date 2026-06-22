import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../shared/domain/entities';
import MonthSidebar from '../components/month/monthSidebar';
import MonthHeader from '../components/month/monthHeader';
import MonthGrid from '../components/month/monthGrid';
import useMonthTask from '../components/month/usemonthTask';

interface Props {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

const CalendarScreen: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined); // THÊM state
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const tasksByDate = useMonthTask(tasks, year, month);
  
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(undefined); // Reset selected date khi chuyển tháng
  };
  
  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(undefined); // Reset selected date khi chuyển tháng
  };
  
  const goToday = () => {
    const today = new Date();
    setCurrentDate(today);
    // Set selected date to today
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDate(todayStr);
  };
  
  // CHỈ mở form tạo task khi double-click hoặc có nút thêm
  const handleDayDoubleClick = (date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/editor', {
      state: {
        task: {
          startDate: date,
          endDate: date
        }
      }
    });
  };
  
  // Chọn ngày (không mở form)
  const handleSelectDay = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleEdit = (task: Task) => {
    navigate('/editor', {
      state: { task }
    });
  };
  
  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
      if (window.api?.tasks) {
        await window.api.tasks.delete(id);
        onTaskUpdated?.();
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%', width: '100%' }}>
      <MonthSidebar
        year={year}
        month={month}
        tasksByDate={tasksByDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        onDayClick={handleDayDoubleClick}  // Đổi tên cho rõ
        onSelectDay={handleSelectDay}       // Thêm prop mới
        selectedDate={selectedDate}         // Truyền ngày được chọn
      />
      
      <div className="glass card" style={{ flex: 1, padding: '24px' }}>
        <MonthHeader
          month={month}
          year={year}
          goToday={goToday}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />
        
        <MonthGrid
          year={year}
          month={month}
          tasksByDate={tasksByDate}
          onDayClick={handleSelectDay}       // Click = chọn ngày
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedDate={selectedDate}        // Truyền ngày được chọn xuống grid
        />
      </div>
    </div>
  );
};

export default CalendarScreen;