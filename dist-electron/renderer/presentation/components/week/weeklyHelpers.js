"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEEK_DAYS = exports.buildTasksByDateStr = exports.isTaskCompletedOnDate = exports.getWeekDays = exports.addDaysToStr = exports.getFirstDayOfMonth = exports.getDaysInMonth = exports.formatDateStr = void 0;
// Format Date → "YYYY-MM-DD"
const formatDateStr = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};
exports.formatDateStr = formatDateStr;
// Lấy số ngày trong tháng
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};
exports.getDaysInMonth = getDaysInMonth;
// Lấy thứ của ngày 1 trong tháng (0 = Thứ 2, 6 = Chủ nhật)
const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};
exports.getFirstDayOfMonth = getFirstDayOfMonth;
// Cộng N ngày vào date string "YYYY-MM-DD"
const addDaysToStr = (dateStr, days) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return (0, exports.formatDateStr)(d);
};
exports.addDaysToStr = addDaysToStr;
// Lấy 7 ngày của tuần chứa date (bắt đầu từ Thứ 2)
const getWeekDays = (baseDate) => {
    const date = new Date(baseDate);
    const day = date.getDay() || 7;
    if (day !== 1) {
        date.setDate(date.getDate() - (day - 1));
    }
    const week = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(date);
        d.setDate(d.getDate() + i);
        week.push(d);
    }
    return week;
};
exports.getWeekDays = getWeekDays;
// Kiểm tra task đã hoàn thành vào ngày cụ thể chưa
const isTaskCompletedOnDate = (task, dateStr) => {
    try {
        const days = JSON.parse(task.completedDays || '[]');
        return days.includes(dateStr);
    }
    catch {
        return false;
    }
};
exports.isTaskCompletedOnDate = isTaskCompletedOnDate;
// Ánh xạ danh sách task → Map<dateStr, Task[]> (mỗi ngày trong khoảng startDate–endDate)
const buildTasksByDateStr = (tasks) => {
    const map = new Map();
    tasks.forEach(t => {
        let currentStr = t.startDate;
        const endStr = t.endDate || t.startDate;
        let loopCount = 0;
        while (currentStr <= endStr && loopCount < 365) {
            const arr = map.get(currentStr) || [];
            if (!arr.find(existing => existing.id === t.id)) {
                arr.push(t);
                map.set(currentStr, arr);
            }
            currentStr = (0, exports.addDaysToStr)(currentStr, 1);
            loopCount++;
        }
    });
    return map;
};
exports.buildTasksByDateStr = buildTasksByDateStr;
// Tên các thứ trong tuần
exports.WEEK_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
