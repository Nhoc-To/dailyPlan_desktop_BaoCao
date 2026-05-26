"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const monthDayCell_1 = __importDefault(require("./monthDayCell"));
const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'
];
const MonthGrid = ({ year, month, tasksByDate, onDayClick, onEdit, onDelete }) => {
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
    const nextMonthEmptyDays = totalCells - (daysInMonth + firstDay);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    borderBottom: '1px solid var(--surface-border)',
                    paddingBottom: '8px',
                    marginBottom: '8px'
                }, children: WEEK_DAYS.map(day => ((0, jsx_runtime_1.jsx)("div", { style: {
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--text-muted)'
                    }, children: day }, day))) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    gridAutoRows: 'minmax(100px,auto)',
                    gap: '8px'
                }, children: [Array.from({
                        length: firstDay
                    }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { style: {
                            background: 'var(--surface-bg)',
                            opacity: 0.5,
                            borderRadius: '12px',
                            padding: '8px'
                        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: 'right',
                                color: 'var(--text-muted)'
                            }, children: prevMonthDays - firstDay + i + 1 }) }, `pre-${i}`))), Array.from({
                        length: daysInMonth
                    }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayTasks = tasksByDate.get(day) || [];
                        const now = new Date();
                        const isToday = now.getDate() === day &&
                            now.getMonth() === month &&
                            now.getFullYear() === year;
                        return ((0, jsx_runtime_1.jsx)(monthDayCell_1.default, { day: day, dateStr: dateStr, tasks: dayTasks, isToday: isToday, onDayClick: onDayClick, onEdit: onEdit, onDelete: onDelete }, day));
                    }), Array.from({
                        length: nextMonthEmptyDays
                    }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { style: {
                            background: 'var(--surface-bg)',
                            opacity: 0.5,
                            borderRadius: '12px',
                            padding: '8px'
                        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: 'right',
                                color: 'var(--text-muted)'
                            }, children: i + 1 }) }, `next-${i}`)))] })] }));
};
exports.default = MonthGrid;
