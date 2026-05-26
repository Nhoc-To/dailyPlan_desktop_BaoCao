"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../../shared/constants");
const WEEK_DAYS = [
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'CN'
];
const MonthSidebar = ({ year, month, tasksByDate, prevMonth, nextMonth, onDayClick }) => {
    const getDaysInMonth = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (y, m) => {
        let day = new Date(y, m, 1).getDay();
        return day === 0
            ? 6
            : day - 1;
    };
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const nextMonthEmptyDays = totalCells -
        (daysInMonth + firstDay);
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
                        }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: prevMonth, style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--primary-color)'
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { size: 20 }) }), (0, jsx_runtime_1.jsxs)("h4", { style: {
                                    margin: 0
                                }, children: [month + 1, "/", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: nextMonth, style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--primary-color)'
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { size: 20 }) })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7,1fr)',
                            gap: '4px',
                            textAlign: 'center'
                        }, children: WEEK_DAYS.map(day => ((0, jsx_runtime_1.jsx)("div", { children: day }, day))) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7,1fr)',
                            gap: '4px'
                        }, children: [Array.from({
                                length: firstDay
                            }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { children: prevMonthDays -
                                    firstDay +
                                    i +
                                    1 }, i))), Array.from({
                                length: daysInMonth
                            }).map((_, i) => {
                                const day = i + 1;
                                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const hasTask = tasksByDate.has(day);
                                const today = new Date();
                                const isToday = today.getDate() === day &&
                                    today.getMonth() === month &&
                                    today.getFullYear() === year;
                                return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => {
                                        onDayClick(dateStr);
                                    }, style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        aspectRatio: '1',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        background: isToday
                                            ? 'var(--primary-color)'
                                            : 'transparent',
                                        color: isToday
                                            ? 'white'
                                            : 'var(--text-main)',
                                        position: 'relative'
                                    }, children: [day, hasTask &&
                                            !isToday && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                position: 'absolute',
                                                bottom: '2px',
                                                width: '4px',
                                                height: '4px',
                                                borderRadius: '50%',
                                                background: 'var(--primary-color)'
                                            } }))] }, day));
                            }), Array.from({
                                length: nextMonthEmptyDays
                            }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { children: i + 1 }, i)))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Ph\u00E2n lo\u1EA1i l\u1ECBch" }), constants_1.SYSTEM_CATEGORIES.map(c => ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '12px'
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: c.color
                                } }), c.name] }, c.id)))] })] }));
};
exports.default = MonthSidebar;
