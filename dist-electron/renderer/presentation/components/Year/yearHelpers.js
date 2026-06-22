"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSummary = exports.buildMonthStats = exports.sortTasks = exports.filterByYear = exports.isBottom = void 0;
/** Task đã xong hoặc đã quá hạn → đẩy xuống cuối bảng */
const isBottom = (task, now = Date.now()) => {
    if (task.status)
        return true;
    const deadline = new Date(`${task.endDate}T${task.endTime || '23:59'}`).getTime();
    return deadline <= now;
};
exports.isBottom = isBottom;
/** Lọc task theo năm của startDate */
const filterByYear = (tasks, year) => tasks.filter(t => new Date(t.startDate).getFullYear() === year);
exports.filterByYear = filterByYear;
/** Sắp xếp: active trước, completed/overdue sau; trong mỗi nhóm theo sortBy */
const sortTasks = (tasks, sortBy, now = Date.now()) => [...tasks].sort((a, b) => {
    const ba = (0, exports.isBottom)(a, now);
    const bb = (0, exports.isBottom)(b, now);
    if (ba && !bb)
        return 1;
    if (!ba && bb)
        return -1;
    switch (sortBy) {
        case 'date':
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'duration': {
            const ra = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime() - now;
            const rb = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime() - now;
            return ra - rb;
        }
        case 'name':
            return a.name.localeCompare(b.name);
        default:
            return 0;
    }
});
exports.sortTasks = sortTasks;
/** Đếm số task theo từng tháng (index 0–11) */
const buildMonthStats = (tasks) => {
    const stats = Array(12).fill(0);
    tasks.forEach(t => { stats[new Date(t.startDate).getMonth()]++; });
    return stats;
};
exports.buildMonthStats = buildMonthStats;
/** Tính số: tổng / đang thực hiện / hoàn thành / quá hạn */
const calcSummary = (tasks, now = Date.now()) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status).length;
    const overdue = tasks.filter(t => {
        if (t.status)
            return false;
        return new Date(t.endDate).getTime() < now;
    }).length;
    const active = total - completed - overdue;
    return { total, completed, overdue, active };
};
exports.calcSummary = calcSummary;
