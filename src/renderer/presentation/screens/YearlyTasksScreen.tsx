import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../shared/domain/entities';
import { CheckCircle, Circle, Calendar, Trash2, Edit, Clock, ArrowUpDown, CheckSquare, Square } from 'lucide-react';
import { SYSTEM_CATEGORIES } from '../../../shared/constants';

interface Props {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

const YearlyTasksScreen: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const navigate = useNavigate();

  // State quản lý chọn nhiều & sắp xếp
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'endDate' | 'duration' | 'name'>('date');

  // Hàm định dạng phân cấp thời gian
  const formatDuration = (ms: number): string => {
    if (ms <= 0) return "0 phút";
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    if (day >= 1) return `${day} ngày`;
    if (hr >= 1) return `${hr} giờ`;
    return `${Math.max(1, min)} phút`;
  };

  const getCategoryTheme = (id: number, customColor?: string) => {
    if (customColor) return customColor;
    const cat = SYSTEM_CATEGORIES.find(c => c.id === id);
    return cat ? cat.color : SYSTEM_CATEGORIES[0].color;
  };
  
  const getCategoryName = (id: number) => {
    const cat = SYSTEM_CATEGORIES.find(c => c.id === id);
    return cat ? cat.name : 'Chưa thiết lập';
  };

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

  const handleToggleGlobalStatus = async (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    if (window.api?.tasks) {
      const isCurrentlyCompleted = task.status;
      let newCompletedDays: string[] = [];
      
      if (!isCurrentlyCompleted) {
        // Mark all days as completed
        const sd = new Date(task.startDate);
        const ed = new Date(task.endDate || task.startDate);
        
        let current = sd;
        while (current <= ed) {
          const dStr = `${current.getFullYear()}-${String(current.getMonth()+1).padStart(2,'0')}-${String(current.getDate()).padStart(2,'0')}`;
          newCompletedDays.push(dStr);
          current.setDate(current.getDate() + 1);
        }
      } else {
        // Unmark all days
        newCompletedDays = [];
      }

      await window.api.tasks.update(task.id, { 
        status: !isCurrentlyCompleted,
        completedDays: JSON.stringify(newCompletedDays)
      });
      if (onTaskUpdated) onTaskUpdated();
    }
  };

  // Chọn/bỏ chọn một tác vụ
  const handleSelectToggle = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Sắp xếp danh sách tác vụ cục bộ (đẩy hoàn thành và quá hạn xuống cuối)
  const sortedTasks = useMemo(() => {
    const list = [...tasks];
    const now = new Date().getTime();

    const compareFn = (a: Task, b: Task) => {
      if (sortBy === 'date') {
        const timeA = new Date(a.startDate + 'T' + (a.startTime || '00:00')).getTime();
        const timeB = new Date(b.startDate + 'T' + (b.startTime || '00:00')).getTime();
        return timeB - timeA; // Mới nhất / gần đây nhất lên đầu (Giảm dần)
      }
      if (sortBy === 'endDate') {
        const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
        const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
        return Math.abs(endA - now) - Math.abs(endB - now); // Gần với hôm nay nhất lên đầu
      }
      if (sortBy === 'duration') {
        const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
        const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
        const remainingA = endA - now;
        const remainingB = endB - now;
        return remainingA - remainingB; // Khoảng thời gian còn lại ít nhất lên đầu
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    };

    return list.sort((a, b) => {
      const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
      const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
      const isOverdueA = !a.status && (endA <= now);
      const isOverdueB = !b.status && (endB <= now);

      const bottomA = a.status || isOverdueA;
      const bottomB = b.status || isOverdueB;

      if (bottomA && !bottomB) return 1;
      if (!bottomA && bottomB) return -1;
      return compareFn(a, b);
    });
  }, [tasks, sortBy]);

  // Chọn toàn bộ / Bỏ chọn toàn bộ
  const handleSelectAllToggle = () => {
    if (selectedIds.length === sortedTasks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedTasks.map(t => t.id));
    }
  };

  // Xử lý Xóa loạt đã chọn
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} tác vụ đã chọn?`)) {
      if (window.api?.tasks) {
        for (const id of selectedIds) {
          await window.api.tasks.delete(id);
        }
        setSelectedIds([]);
        setIsSelectionMode(false);
        if (onTaskUpdated) onTaskUpdated();
      }
    }
  };

  return (
    <div className="glass card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <h2 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Lịch Năm</h2>
           <span style={{ background: 'var(--bg-gradient-start)', padding: '6px 16px', borderRadius: '20px', color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.85rem' }}>
             {tasks.length} Tác vụ
           </span>
         </div>

         {/* TOOLBAR CONTROLS */}
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
           {isSelectionMode ? (
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
               <span style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 600 }}>Đã chọn: {selectedIds.length}</span>
               <button 
                 onClick={handleBulkDelete} 
                 disabled={selectedIds.length === 0}
                 style={{ 
                   background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', 
                   fontWeight: 600, fontSize: '0.85rem', cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer',
                   opacity: selectedIds.length === 0 ? 0.6 : 1, transition: 'all 0.2s'
                 }}
               >
                 Xóa đã chọn
               </button>
               <button 
                 onClick={() => { setIsSelectionMode(false); setSelectedIds([]); }} 
                 style={{ 
                   background: 'rgba(255,255,255,0.6)', color: 'var(--text-main)', border: '1px solid var(--surface-border)', 
                   padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer'
                 }}
               >
                 Hủy
               </button>
             </div>
           ) : (
             <>
               {/* Sort Selector */}
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--surface-border)' }}>
                 <ArrowUpDown size={14} color="var(--text-muted)" />
                 <select 
                   value={sortBy} 
                   onChange={(e: any) => setSortBy(e.target.value)}
                   style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
                 >
                   <option value="date">Bắt đầu gần nhất</option>
                   <option value="endDate">Tới hạn gần nhất</option>
                   <option value="duration">Thời lượng dài nhất</option>
                   <option value="name">Tên tác vụ A-Z</option>
                 </select>
               </div>

               {/* Bulk Delete Trigger */}
               {tasks.length > 0 && (
                 <button 
                   onClick={() => setIsSelectionMode(true)}
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', color: 'var(--text-main)', 
                     border: '1px solid var(--surface-border)', padding: '8px 16px', borderRadius: '10px', fontWeight: 600, 
                     fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                   }}
                   className="btn-hover-effect"
                 >
                   <Trash2 size={14} />
                   <span>Xóa hàng loạt</span>
                 </button>
               )}
             </>
           )}
         </div>
      </div>
      
      {/* TABLE SECTION */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ borderSpacing: '0 12px', width: '100%' }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {isSelectionMode && (
                <th style={{ width: '50px', textAlign: 'center' }}>
                  <div onClick={handleSelectAllToggle} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                    {selectedIds.length === sortedTasks.length ? <CheckSquare size={18} color="var(--primary-color)" /> : <Square size={18} />}
                  </div>
                </th>
              )}
              <th style={{ width: '60px', textAlign: 'center' }}>Xong</th>
              <th style={{ width: '22%' }}>Tác vụ</th>
              <th style={{ width: '12%' }}>Phân loại</th>
              <th>Mô tả</th>
              <th style={{ width: '15%' }}>Bắt đầu</th>
              <th style={{ width: '15%' }}>Kết thúc</th>
              <th style={{ width: '18%', textAlign: 'center' }}>Thời gian còn lại</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map(task => {
              const cId = task.categoryId || 1;
              const theme = getCategoryTheme(cId, task.color);
              const cName = task.tags?.trim() || getCategoryName(cId);
              const isSelected = selectedIds.includes(task.id);

              // Tính toán thời gian
              const start = new Date(task.startDate + "T" + (task.startTime || "00:00"));
              const end = new Date((task.endDate || task.startDate) + "T" + (task.endTime || "23:59"));
              const totalMs = end.getTime() - start.getTime();

              const now = new Date();
              const remainingMs = end.getTime() - now.getTime();
              const isOverdue = remainingMs <= 0;
              
              return (
                <tr 
                  key={task.id} 
                  onClick={() => isSelectionMode && handleSelectToggle(task.id)}
                  style={{ 
                    background: isSelected ? 'rgba(239, 68, 68, 0.05)' : 'var(--surface-bg)', 
                    boxShadow: 'var(--shadow-sm)', 
                    transition: 'all 0.2s ease',
                    cursor: isSelectionMode ? 'pointer' : 'default',
                    border: isSelected ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
                  }}
                  className="table-row-hover"
                >
                  {isSelectionMode && (
                    <td style={{ textAlign: 'center', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', color: isSelected ? '#ef4444' : 'var(--text-muted)' }}>
                        {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                      </div>
                    </td>
                  )}
                  <td style={{ 
                    textAlign: 'center', 
                    borderTopLeftRadius: isSelectionMode ? '0' : '12px', 
                    borderBottomLeftRadius: isSelectionMode ? '0' : '12px' 
                  }}>
                    <div 
                      onClick={(e) => {
                        if (isSelectionMode) {
                          e.stopPropagation();
                          handleSelectToggle(task.id);
                        } else {
                          handleToggleGlobalStatus(e, task);
                        }
                      }} 
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                    >
                      {task.status ? <CheckCircle color="var(--primary-color)" size={20} /> : <Circle color="var(--text-muted)" size={20} />}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: task.status ? 'var(--text-muted)' : 'var(--text-main)', fontSize: '1.05rem', textDecoration: task.status ? 'line-through' : 'none' }}>
                    {task.name}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme }}></div>
                       <span style={{ color: theme, fontWeight: 600, fontSize: '0.85rem' }}>{cName}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: task.status ? 'line-through' : 'none' }}>
                    {task.description || '-'}
                  </td>
                  <td>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} /> <span>{task.startDate}</span>
                        </div>
                        {task.startTime && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                            <Clock size={12} /> <span>{task.startTime}</span>
                          </div>
                        )}
                     </div>
                  </td>
                  <td>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} /> <span>{task.endDate || task.startDate}</span>
                        </div>
                        {task.endTime && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                            <Clock size={12} /> <span>{task.endTime}</span>
                          </div>
                        )}
                     </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                     {task.status ? (
                       <span style={{ 
                         display: 'inline-flex', padding: '4px 12px', borderRadius: '12px', 
                         background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontWeight: 700, fontSize: '0.78rem' 
                       }}>
                         Hoàn thành
                       </span>
                     ) : isOverdue ? (
                       <span style={{ 
                         display: 'inline-flex', padding: '4px 12px', borderRadius: '12px', 
                         background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontWeight: 700, fontSize: '0.78rem' 
                       }}>
                         Quá hạn
                       </span>
                     ) : (
                       <span style={{ 
                         display: 'inline-flex', padding: '4px 12px', borderRadius: '12px', 
                         background: 'rgba(0, 123, 255, 0.08)', color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.78rem' 
                       }}>
                         Còn {formatDuration(remainingMs)} / {formatDuration(totalMs)}
                       </span>
                     )}
                  </td>
                  <td style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px', textAlign: 'center' }}>
                     <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                       <button 
                         onClick={(e) => {
                           if (isSelectionMode) {
                             e.stopPropagation();
                             handleSelectToggle(task.id);
                           } else {
                             handleEdit(e, task);
                           }
                         }} 
                         style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }} 
                         title="Sửa"
                       >
                         <Edit size={16} />
                       </button>
                       <button 
                         onClick={(e) => {
                           if (isSelectionMode) {
                             e.stopPropagation();
                             handleSelectToggle(task.id);
                           } else {
                             handleDelete(e, task.id);
                           }
                         }} 
                         style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff5252' }} 
                         title="Xóa"
                       >
                         <Trash2 size={16} />
                       </button>
                     </div>
                  </td>
                </tr>
              );
            })}
            
            {tasks.length === 0 && (
              <tr>
                <td colSpan={isSelectionMode ? 9 : 8} style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: 'var(--bg-gradient-start)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Calendar size={32} color="var(--primary-color)" />
                     </div>
                     <span style={{ fontSize: '1.1rem' }}>Chưa có tác vụ. Vui lòng tạo mới!</span>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlyTasksScreen;
