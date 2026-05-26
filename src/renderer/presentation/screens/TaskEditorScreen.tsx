import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Repeat, CheckCircle, Plus, Calendar, Clock } from 'lucide-react';
import { SYSTEM_CATEGORIES } from '../../../shared/constants';

interface Props {
  onTaskUpdated: () => void;
}

const REMINDER_OPTS = ['5 phút', '10 phút', '30 phút', '1 giờ', '1 ngày'];
const REPEAT_OPTS = ['Hàng ngày', 'Hàng tuần', 'Hàng tháng'];

const TaskEditorScreen: React.FC<Props> = ({ onTaskUpdated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editTask = location.state?.task;
  const getLocalYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const [taskName, setTaskName] = useState(editTask?.name || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [date, setDate] = useState(editTask?.startDate || getLocalYMD(new Date()));
  const [endDate, setEndDate] = useState(editTask?.endDate || editTask?.startDate || getLocalYMD(new Date()));
  const [startTime, setStartTime] = useState(editTask?.startTime || '');
  const [endTime, setEndTime] = useState(editTask?.endTime || '');
  
  const [customCategory, setCustomCategory] = useState(editTask?.tags || ''); // Using tags column for custom category
  
  const [categoryId, setCategoryId] = useState(editTask?.categoryId || 1);
  const [customColor, setCustomColor] = useState(editTask?.color || SYSTEM_CATEGORIES[0].color);

  const [reminderOn, setReminderOn] = useState(false);
  const [reminderAt, setReminderAt] = useState(REMINDER_OPTS[0]);

  const [repeatOn, setRepeatOn] = useState(!!editTask?.repeat && editTask.repeat !== 'none');
  const [repeatFreq, setRepeatFreq] = useState(editTask?.repeat && editTask.repeat !== 'none' ? editTask.repeat : REPEAT_OPTS[0]);

  const activeCategory = SYSTEM_CATEGORIES.find(c => c.id === categoryId);
  const activeCategoryName = customCategory.trim() || activeCategory?.name || 'Chưa thiết lập';

  useEffect(() => {
    // Sync end date when start date changes (if end date was equal to previous start date or if not set)
    if (!editTask) {
      setEndDate(date);
    }
  }, [date, editTask]);

  const handleSave = async () => {
    if (!taskName) return;
    if (window.api && window.api.tasks) {
      const finalEndTime = endTime || '23:59';
      const payload = {
        categoryId: categoryId, 
        name: taskName,
        description: description, 
        repeat: repeatOn ? repeatFreq : 'none',
        startDate: date,
        endDate: endDate || date,
        startTime: startTime,
        endTime: finalEndTime,
        tags: customCategory.trim(), // Save custom string instead of JSON array
        color: customColor,
        status: editTask ? editTask.status : false
      };
      
      if (editTask) {
        await window.api.tasks.update(editTask.id, payload);
      } else {
        await window.api.tasks.create(payload);
      }
      
      onTaskUpdated();
      navigate('/yearly');
    }
  };

  const currentTheme = customColor;
  const isInvalid = !taskName.trim();

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%', alignItems: 'flex-start' }}>
      {/* thẻ  tạo tác vụ */}
      <div className="glass card" style={{ 
        flex: 1.2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        maxHeight: '100%',
        overflowY: 'auto',
        
      }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.8rem', fontWeight: 700 }}>
          Tạo Tác Vụ Mới
        </h2>
        {/* tên và mô tả */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            className="form-input"
            style={{ fontSize: '1.2rem', padding: '16px', fontWeight: 600, borderLeft: `4px solid ${currentTheme}` }}
            type="text" 
            placeholder="Tên tác vụ..." 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea 
            className="form-input" 
            placeholder="Mô tả chi tiết" 
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* cài đặt ngày giờ */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={16} /> Bắt đầu
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ flex: 2 }} />
                <input className="form-input" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
               <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={16} /> Kết thúc
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ flex: 2 }} />
                <input className="form-input" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="23:59" style={{ flex: 1 }} />
              </div>
            </div>
          </div>
        </div>
        {/* chọn phân loại cho tác vụ */}
        <div>
          <label style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }}>Phân loại tác vụ</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {SYSTEM_CATEGORIES.map(c => (
               <button 
                key={c.id}
                onClick={() => { setCategoryId(c.id); setCustomColor(c.color); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid transparent',
                  background: categoryId === c.id ? `${c.color}40` : 'var(--bg-gradient-start)',
                  color: categoryId === c.id ? c.color : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                {c.name}
              </button>
            ))}
            <input 
              type="text" 
              placeholder="+ Gõ tùy chỉnh..." 
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px dashed var(--text-muted)',
                background: customCategory.trim() ? `${currentTheme}20` : 'transparent',
                color: customCategory.trim() ? currentTheme : 'var(--text-main)',
                fontWeight: 600,
                outline: 'none',
                minWidth: '150px'
              }}
            />
          </div>
          {customCategory.trim() && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>* Tên phân loại mặc định sẽ dán nhãn là "{customCategory}".</div>}
        </div>

        <div>
           <label style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }}>Bảng màu cá nhân hóa</label>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <input 
                type="color" 
                value={customColor} 
                onChange={e => setCustomColor(e.target.value)}
                style={{ 
                  width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '50%', cursor: 'pointer', 
                  WebkitAppearance: 'none'
                }}
             />
             <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bạn có thể chọn màu bất kỳ!</span>
           </div>
        </div>
        {/* nhắc nhở và lặp lại */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '16px' }}>
           <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <Bell size={18} color={currentTheme} /> Nhắc nhở
                </span>
                <label className="toggle-switch">
                  <input type="checkbox" checked={reminderOn} onChange={e => setReminderOn(e.target.checked)} />
                  <span className="slider round">

                  </span>
                </label>
              </div>
              {reminderOn && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {REMINDER_OPTS.map(opt => (
                    <span 
                      key={opt}
                      onClick={() => setReminderAt(opt)}
                      style={{
                        padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                        background: reminderAt === opt ? currentTheme : 'var(--surface-bg)',
                        color: reminderAt === opt ? 'white' : 'var(--text-muted)'
                      }}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              )}
           </div>

           <div style={{ width: '100%', height: '1px', background: 'var(--surface-border)' }}></div>

           <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <Repeat size={18} color={currentTheme} /> Lặp lại
                </span>
                <label className="toggle-switch">
                  <input type="checkbox" checked={repeatOn} onChange={e => setRepeatOn(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              {repeatOn && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                  {REPEAT_OPTS.map(opt => (
                    <span 
                      key={opt}
                      onClick={() => setRepeatFreq(opt)}
                      style={{
                        padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                        background: repeatFreq === opt ? currentTheme : 'var(--surface-bg)',
                        color: repeatFreq === opt ? 'white' : 'var(--text-muted)'
                      }}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              )}
           </div>
        </div>
        {/* nút lưu */}
        <button 
          className="btn-primary" 
          onClick={handleSave} 
          disabled={isInvalid}
          style={{ 
            marginTop: 'auto', 
            padding: '16px', 
            fontSize: '1.1rem', 
            background: isInvalid ? 'var(--text-muted)' : currentTheme,
            opacity: isInvalid ? 0.5 : 1,
            cursor: isInvalid ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600
          }}
        >
          {isInvalid ? 'Nhập tên tác vụ để lưu' : (editTask ? 'CẬP NHẬT TÁC VỤ' : 'TẠO TÁC VỤ')}
        </button>
      </div>


      {/* khung xem trước */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{
          padding: '24px',
          borderRadius: '24px',
          background: isInvalid ? 'rgba(255, 82, 82, 0.1)' : `${customColor}1A`, 
          border: `2px dashed ${isInvalid ? '#ff5252' : customColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '350px',
          transition: 'all 0.3s ease',
          textAlign: 'center'
        }}>
           {isInvalid ? (
             <>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ff5252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>!</span>
               </div>
               <h3 style={{ color: '#ff5252', marginBottom: '8px' }}>Chưa có gì cả!</h3>
               <p style={{ color: 'var(--text-muted)', maxWidth: '250px' }}>Hãy nhập tên tác vụ bên trái để xem trước thẻ công việc của bạn.</p>
             </>
           ) : (
             <div style={{ width: '100%', background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'left', borderLeft: `6px solid ${customColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '12px', background: `${customColor}20`, color: customColor, fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>
                      {activeCategoryName}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>{taskName}</h3>
                  </div>
                  {reminderOn && <Bell size={18} color={customColor} />}
                </div>
                
                {description && <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{description}</p>}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Calendar size={14} /> {date} {startTime && <span> {startTime}</span>}
                     {(endDate !== date || endTime) && (
                       <span> - {endDate !== date ? endDate : ''} {endTime || '23:59'}</span>
                     )}
                   </div>
                   {repeatOn && (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Repeat size={14} /> {repeatFreq}
                     </div>
                   )}
                </div>
             </div>
           )}
        </div>
      </div>

    </div>
  );
};

export default TaskEditorScreen;
