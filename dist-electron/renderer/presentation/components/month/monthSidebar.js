"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../../shared/constants");
const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MonthSidebar = ({ year, month, tasksByDate, prevMonth, nextMonth, onDayClick, onSelectDay, selectedDate }) => {
    const [localSelectedDate, setLocalSelectedDate] = (0, react_1.useState)(null);
    const getDaysInMonth = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (y, m) => {
        let day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const nextMonthEmptyDays = totalCells - (daysInMonth + firstDay);
    const handleDateClick = (dateStr, isCurrentMonth, e) => {
        e.stopPropagation();
        if (isCurrentMonth) {
            // CHỈ chọn ngày, KHÔNG mở form
            onSelectDay(dateStr);
            setLocalSelectedDate(dateStr);
        }
    };
    const handleDateDoubleClick = (dateStr, isCurrentMonth, e) => {
        e.stopPropagation();
        if (isCurrentMonth) {
            // Mở form tạo tác vụ
            onDayClick(dateStr, e);
        }
    };
    const isSelectedDate = (dateStr) => {
        return selectedDate === dateStr || localSelectedDate === dateStr;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: {
            width: '280px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    prevMonth(e);
                                }, style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--primary-color)'
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { size: 20 }) }), (0, jsx_runtime_1.jsxs)("h4", { style: { margin: 0 }, children: [month + 1, "/", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    nextMonth(e);
                                }, style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--primary-color)'
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { size: 20 }) })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '4px',
                            textAlign: 'center'
                        }, children: WEEK_DAYS.map(day => ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: '12px', fontWeight: 600 }, children: day }, day))) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '4px'
                        }, children: [Array.from({ length: firstDay }).map((_, i) => {
                                const prevDate = prevMonthDays - firstDay + i + 1;
                                return ((0, jsx_runtime_1.jsx)("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        aspectRatio: '1',
                                        borderRadius: '50%',
                                        color: 'var(--text-muted)',
                                        opacity: 0.3,
                                        fontSize: '12px',
                                        cursor: 'default'
                                    }, children: prevDate }, `prev-${i}`));
                            }), Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const hasTask = tasksByDate.has(day);
                                const today = new Date();
                                const isToday = today.getDate() === day &&
                                    today.getMonth() === month &&
                                    today.getFullYear() === year;
                                const isSelected = isSelectedDate(dateStr);
                                return ((0, jsx_runtime_1.jsxs)("div", { onClick: (e) => handleDateClick(dateStr, true, e), onDoubleClick: (e) => handleDateDoubleClick(dateStr, true, e), style: {
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
                                    }, children: [day, hasTask && !isSelected && !isToday && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                position: 'absolute',
                                                bottom: '2px',
                                                width: '4px',
                                                height: '4px',
                                                borderRadius: '50%',
                                                background: 'var(--primary-color)'
                                            } }))] }, day));
                            }), Array.from({ length: nextMonthEmptyDays }).map((_, i) => {
                                const nextDate = i + 1;
                                return ((0, jsx_runtime_1.jsx)("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        aspectRatio: '1',
                                        borderRadius: '50%',
                                        color: 'var(--text-muted)',
                                        opacity: 0.3,
                                        fontSize: '12px',
                                        cursor: 'default'
                                    }, children: nextDate }, `next-${i}`));
                            })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { style: { marginBottom: '12px', fontSize: '14px' }, children: "Ph\u00E2n lo\u1EA1i l\u1ECBch" }), constants_1.SYSTEM_CATEGORIES.map(c => ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '12px',
                            fontSize: '13px'
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: c.color
                                } }), c.name] }, c.id)))] })] }));
};
exports.default = MonthSidebar;
