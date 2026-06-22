import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../shared/domain/entities';
import { ChevronLeft, ChevronRight, CheckCircle2, Calendar as CalendarIcon, Edit, Trash2, CheckSquare, Square, Clock } from 'lucide-react';
import { SYSTEM_CATEGORIES } from '../../../shared/constants';

interface Props {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

const WEEK_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

const WeeklyOverview: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // 0 is Monday
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  };

  // Convert array to deterministic dictionary by date to avoid jumpy mock data
  // Khai triển các task trải dài nhiều ngày
  const tasksByDateStr = useMemo(() => {
    const map = new Map<string, Task[]>();
    
    // Helper function to add days to a string date
    const getNextDateStr = (dateStr: string, daysToAdd: number) => {
      const d = new Date(dateStr);
      d.setDate(d.getDate() + daysToAdd);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    tasks.forEach(t => {
      let currentStr = t.startDate;
      const endStr = t.endDate || t.startDate;
      
      // Safety limit: max 365 days to prevent infinite loops
      let loopCount = 0;
      while (currentStr <= endStr && loopCount < 365) {
        const arr = map.get(currentStr) || [];
        // Prevent duplicate tasks in same day if data is weird
        if (!arr.find(existing => existing.id === t.id)) {
          arr.push(t);
          map.set(currentStr, arr);
        }
        currentStr = getNextDateStr(currentStr, 1);
        loopCount++;
      }
    });
    return map;
  }, [tasks]);

  const hasTasks = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasksByDateStr.has(dateStr);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(new Date(year, month, day));
  };

  const getTasksForDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`; // Use Local timezone format to prevent jumping
    return tasksByDateStr.get(dateStr) || [];
  };

  // Tính 7 ngày của tuần hiện tại để hiển thị ở Ô 2 - Ô 8
  const currentWeekDays = useMemo(() => {
    const baseDate = selectedDay || new Date();
    const date = new Date(baseDate);
    const day = date.getDay() || 7; 
    if(day !== 1) {
      date.setDate(date.getDate() - (day - 1)); // Fixed UTC / setHours bug!
    }
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(date);
      d.setDate(d.getDate() + i);
      week.push(d);
    }
    return week;
  }, [selectedDay]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
      if (window.api?.tasks) {
        await window.api.tasks.delete(id);
        if (onTaskUpdated) onTaskUpdated();
      }
    }
  };

  const handleEdit = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    navigate('/editor', { state: { task } });
  };
  
  const handleToggleStatus = async (e: React.MouseEvent, t: Task, dateStr: string) => {
    e.stopPropagation();
    if (window.api?.tasks) {
      let completedDays: string[] = [];
      try { completedDays = JSON.parse(t.completedDays || '[]'); } catch { }
      
      const newCompletedDays = completedDays.includes(dateStr)
        ? completedDays.filter(d => d !== dateStr)
        : [...completedDays, dateStr];

      const sd = new Date(t.startDate);
      const ed = new Date(t.endDate || t.startDate);
      const totalDays = Math.round((ed.getTime() - sd.getTime()) / (1000 * 3600 * 24)) + 1;
      const newStatus = newCompletedDays.length >= totalDays;

      await window.api.tasks.update(t.id, { 
        completedDays: JSON.stringify(newCompletedDays),
        status: newStatus 
      });
      if (onTaskUpdated) onTaskUpdated();
    }
  };

  const renderCellContent = (title: string, cellTasks: Task[], dateBadge: string, dateStr: string) => {
    const isTaskCompletedToday = (t: Task) => {
      let cDays: string[] = [];
      try { cDays = JSON.parse(t.completedDays || '[]'); } catch { }
      return cDays.includes(dateStr);
    };

    const sortedTasks = [...cellTasks].sort((a, b) => {
      return Number(isTaskCompletedToday(a)) - Number(isTaskCompletedToday(b)) || a.id - b.id;
    });
    
    return (
    <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--surface-border)' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', margin: 0 }}>
          {title}
        </h3>
        {dateBadge && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{dateBadge}</span>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
        {sortedTasks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Không có tác vụ</p>
        ) : (
          sortedTasks.map((t, idx) => {
            const theme = t.color || SYSTEM_CATEGORIES.find(c => c.id === t.categoryId)?.color || SYSTEM_CATEGORIES[0].color;
            const isCompletedToday = isTaskCompletedToday(t);

            return (
            <div key={t.id || idx} style={{ 
              background: `${theme}15`, 
              padding: '12px', borderRadius: '12px', 
              borderLeft: `4px solid ${theme}`,
              opacity: isCompletedToday ? 0.6 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div onClick={(e) => handleToggleStatus(e, t, dateStr)} style={{ cursor: 'pointer', marginTop: '2px', color: theme }}>
                  {isCompletedToday ? <CheckSquare size={16} /> : <Square size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', textDecoration: isCompletedToday ? 'line-through' : 'none', color: isCompletedToday ? 'var(--text-muted)' : 'var(--text-main)' }}>{t.name}</div>
                  {t.description && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: isCompletedToday ? 'line-through' : 'none', marginBottom: '4px' }}>{t.description}</div>}
                  {t.startTime && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <Clock size={12} style={{ opacity: 0.8 }} />
                      <span>
                        {t.startTime}
                        {t.endTime && t.endTime !== '23:59' ? ` - ${t.endTime}` : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '6px' }}>
                 <button onClick={(e) => handleEdit(e, t)} style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--primary-color)' }}><Edit size={14} /></button>
                 <button onClick={(e) => handleDelete(e, t.id)} style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: '#ff5252' }}><Trash2 size={14} /></button>
              </div>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Kế hoạch Tuần</h2>
        <button onClick={goToday} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>
          Hôm nay
        </button>
     </div>
     
     <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gridTemplateRows: 'repeat(2, 1fr)', 
      gap: '24px', 
      flex: 1,
      width: '100%'
    }}>
      
      {/* Ô 1: Mini Calendar */}
      <div className="glass card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
           <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}><ChevronLeft /></button>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Tháng {month + 1}, {year}</h3>
           </div>
           <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}><ChevronRight /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1 }}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasTask = hasTasks(day);
            const isSelected = selectedDay?.getDate() === day && selectedDay?.getMonth() === month && selectedDay?.getFullYear() === year;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            
            return (
              <div 
                key={day} 
                onClick={() => handleDayClick(day)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', borderRadius: '8px',
                  background: isSelected ? 'var(--primary-color)' : (isToday ? 'rgba(79,70,229,0.2)' : (hasTask ? 'rgba(79,70,229,0.05)' : 'transparent')),
                  color: isSelected ? 'white' : (isToday ? 'var(--primary-color)' : 'var(--text-main)'),
                  fontWeight: isSelected || hasTask || isToday ? 600 : 400,
                  transition: 'all 0.2s',
                  position: 'relative',
                  border: isToday && !isSelected ? '1px solid var(--primary-color)' : '1px solid transparent'
                }}
              >
                {day}
                {hasTask && !isSelected && <CheckCircle2 size={10} color="var(--primary-color)" style={{ position: 'absolute', bottom: '2px' }} />}
                {hasTask && isSelected && <CheckCircle2 size={10} color="white" style={{ position: 'absolute', bottom: '2px' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ô 2: Dynamic Cell -> Hiển thị ngày Thứ 2 của tuần đó (currentWeekDays[0]) */}
      {(() => {
        const d = currentWeekDays[0];
        const dStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        const isSelectedCell = selectedDay && d.toDateString() === selectedDay.toDateString();
        const isTodayCell = d.toDateString() === new Date().toDateString();
        return (
          <div className="glass card" style={{
            padding: 0,
            border: isSelectedCell ? '2px solid var(--primary-color)' : (isTodayCell ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
            boxShadow: isSelectedCell ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
            background: isTodayCell ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)'
          }}>
            {renderCellContent(
              WEEK_DAYS[0],
              getTasksForDate(d),
              `${d.getDate()}/${d.getMonth()+1}`,
              dStr
            )}
          </div>
        );
      })()}

      {/* Ô 3 đến 8: Các ngày còn lại trong tuần */}
      {currentWeekDays.slice(1).map((d, idx) => {
        const isSelectedCell = selectedDay && d.toDateString() === selectedDay.toDateString();
        const isTodayCell = d.toDateString() === new Date().toDateString();
        
        return (
        <div key={idx} className="glass card" style={{ 
          padding: 0, 
          border: isSelectedCell ? '2px solid var(--primary-color)' : (isTodayCell ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
          boxShadow: isSelectedCell ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
          background: isTodayCell ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)'
        }}>
           {(() => {
              const dStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
              return renderCellContent(
                WEEK_DAYS[idx + 1], 
                getTasksForDate(d),
                `${d.getDate()}/${d.getMonth()+1}`,
                dStr
              );
           })()} 
        </div>
        );
      })}
      
     </div>
    </div>
  );
};

export default WeeklyOverview;
