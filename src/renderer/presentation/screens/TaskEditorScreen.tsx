import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { useTaskForm } from '../hooks/useTaskForm';
import { CategorySelector } from '../components/editor/CategorySelector';
import { ReminderRepeatSettings } from '../components/editor/ReminderRepeatSettings';
import { TaskPreviewCard } from '../components/editor/TaskPreviewCard';

interface Props {
  onTaskUpdated: () => void;
}

export default function TaskEditorScreen({ onTaskUpdated }: Props) {
  const location = useLocation();
  const editTask = location.state?.task;

  const {
    taskName,
    setTaskName,
    description,
    setDescription,
    date,
    setDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    customCategory,
    setCustomCategory,
    categoryId,
    setCategoryId,
    customColor,
    setCustomColor,
    reminderOn,
    setReminderOn,
    reminderAt,
    setReminderAt,
    repeatOn,
    setRepeatOn,
    repeatFreq,
    setRepeatFreq,
    activeCategoryName,
    isInvalid,
    handleSave,
  } = useTaskForm(editTask, onTaskUpdated);

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%', alignItems: 'flex-start', flexWrap: 'wrap', overflowY: 'auto', paddingRight: '8px' }}>

      {/* FORM INPUT SECTION */}
      <div className="glass card" style={{
        flex: 1.2,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxHeight: '100%',
        overflowY: 'auto',
        minWidth: '360px'
      }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.8rem', fontWeight: 700 }}>
          {editTask ? 'Chỉnh Sửa Tác Vụ' : 'Tạo Tác Vụ Mới'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            className="form-input"
            style={{ fontSize: '1.2rem', padding: '16px', fontWeight: 600, borderLeft: `4px solid ${customColor}` }}
            type="text"
            placeholder="Tên tác vụ"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            className="form-input"
            placeholder="Mô tả tác vụ"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={16} /> Bắt đầu
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ flex: 2, minWidth: '130px' }} />
                <input
                  className="form-input"
                  type="text"
                  placeholder="HH:MM (24h)"
                  maxLength={5}
                  value={startTime}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length > 2) {
                      val = val.slice(0, 2) + ':' + val.slice(2, 4);
                    }
                    setStartTime(val);
                  }}
                  style={{ flex: 1, minWidth: '95px', textAlign: 'center' }}
                />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={16} /> Kết thúc
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input className="form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ flex: 2, minWidth: '130px' }} />
                <input
                  className="form-input"
                  type="text"
                  placeholder="23:59 (24h)"
                  maxLength={5}
                  value={endTime}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length > 2) {
                      val = val.slice(0, 2) + ':' + val.slice(2, 4);
                    }
                    setEndTime(val);
                  }}
                  style={{ flex: 1, minWidth: '95px', textAlign: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY & COLOR SELECTORS */}
        <CategorySelector
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          customColor={customColor}
          setCustomColor={setCustomColor}
          currentTheme={customColor}
        />

        {/* REMINDER & REPEAT SETTINGS */}
        <ReminderRepeatSettings
          currentTheme={customColor}
          reminderOn={reminderOn}
          setReminderOn={setReminderOn}
          reminderAt={reminderAt}
          setReminderAt={setReminderAt}
          repeatOn={repeatOn}
          setRepeatOn={setRepeatOn}
          repeatFreq={repeatFreq}
          setRepeatFreq={setRepeatFreq}
        />

        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={isInvalid}
          style={{
            marginTop: 'auto',
            padding: '16px',
            fontSize: '1.1rem',
            background: isInvalid ? 'var(--text-muted)' : 'var(--primary-color)',
            opacity: isInvalid ? 0.5 : 1,
            cursor: isInvalid ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600
          }}
        >
          {isInvalid ? 'Nhập tên tác vụ' : (editTask ? 'CẬP NHẬT' : 'XÁC NHẬN')}
        </button>
      </div>

      {/* LIVE PREVIEW SECTION */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
        <TaskPreviewCard
          isInvalid={isInvalid}
          customColor={customColor}
          activeCategoryName={activeCategoryName}
          taskName={taskName}
          reminderOn={reminderOn}
          description={description}
          date={date}
          startTime={startTime}
          endDate={endDate}
          endTime={endTime}
          repeatOn={repeatOn}
          repeatFreq={repeatFreq}
        />
      </div>

    </div>
  );
};


