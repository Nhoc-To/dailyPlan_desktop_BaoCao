import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../shared/domain/entities';
import { SYSTEM_CATEGORIES } from '../../../shared/constants';
import { getLocalYMD, getLocalHM } from '../../shared/utils';

export const REMINDER_OPTS = ['5 phút', '10 phút', '30 phút', '1 giờ', '1 ngày'];
export const REPEAT_OPTS = ['Hàng ngày', 'Hàng tuần', 'Hàng tháng'];

export const useTaskForm = (editTask?: Task, onTaskUpdated?: () => void) => {
  const navigate = useNavigate();
  const isEditing = !!editTask?.id;

  const [taskName, setTaskName] = useState(editTask?.name || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [date, setDate] = useState(editTask?.startDate || getLocalYMD(new Date()));
  const [endDate, setEndDate] = useState(editTask?.endDate || editTask?.startDate || getLocalYMD(new Date()));
  const [startTime, setStartTime] = useState(editTask?.startTime || (isEditing ? '' : getLocalHM(new Date())));
  const [endTime, setEndTime] = useState(editTask?.endTime || (isEditing ? '' : '23:59'));
  
  const [customCategory, setCustomCategory] = useState(editTask?.tags || '');
  const [categoryId, setCategoryId] = useState(editTask?.categoryId || 1);
  const [customColor, setCustomColor] = useState(editTask?.color || SYSTEM_CATEGORIES[0].color);

  const [reminderOn, setReminderOn] = useState(false);
  const [reminderAt, setReminderAt] = useState(REMINDER_OPTS[0]);

  const [repeatOn, setRepeatOn] = useState(!!editTask?.repeat && editTask.repeat !== 'none');
  const [repeatFreq, setRepeatFreq] = useState(editTask?.repeat && editTask.repeat !== 'none' ? editTask.repeat : REPEAT_OPTS[0]);

  useEffect(() => {
    if (!editTask) {
      setEndDate(date);
    }
  }, [date, editTask]);

  const isValidTime = (t: string) => {
    if (!t) return true;
    const parts = t.split(':');
    if (parts.length !== 2) return false;
    const h = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const handleSave = async () => {
    
    if (!taskName) return;
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      alert("Giờ nhập vào không hợp lệ! Vui lòng nhập đúng định dạng 24h (ví dụ: 08:30 hoặc 23:59, nằm trong khoảng 00:00 - 24:00).");
      return;
    }
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
        tags: customCategory.trim(),
        color: customColor,
        status: editTask ? editTask.status : false
      };
      
      if (editTask) {
        await window.api.tasks.update(editTask.id, payload);
      } else {
        await window.api.tasks.create(payload);
      }
      
      if (onTaskUpdated) onTaskUpdated();
      console.log('Task saved successfully:', payload);
      // navigate('/yearly');
    }
    console.log('clicked')
  };

  const activeCategory = SYSTEM_CATEGORIES.find((c: any) => c.id === categoryId);
  const activeCategoryName = customCategory.trim() || activeCategory?.name || 'Chưa thiết lập';
  const isInvalid = !taskName.trim();

  return {
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
  };
};
