"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../../../shared/constants");
const TaskItem_1 = __importDefault(require("./TaskItem"));
const weeklyHelpers_1 = require("./weeklyHelpers");
const WeekDayCell = ({ title, date, tasks, isSelected, isToday, onToggleTask, onEditTask, onDeleteTask, onTaskClick, }) => {
    const dateStr = (0, weeklyHelpers_1.formatDateStr)(date);
    const dateBadge = `${date.getDate()}/${date.getMonth() + 1}`;
    const sortedTasks = [...tasks].sort((a, b) => {
        return Number((0, weeklyHelpers_1.isTaskCompletedOnDate)(a, dateStr)) - Number((0, weeklyHelpers_1.isTaskCompletedOnDate)(b, dateStr))
            || a.id - b.id;
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "glass card", style: {
            padding: 0,
            border: isSelected
                ? '2px solid var(--primary-color)'
                : (isToday ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
            boxShadow: isSelected ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
            background: isToday ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)',
        }, children: (0, jsx_runtime_1.jsxs)("div", { style: { padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid var(--surface-border)',
                    }, children: [(0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '1.2rem', color: 'var(--primary-color)', margin: 0 }, children: title }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }, children: dateBadge })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingRight: '4px',
                    }, children: sortedTasks.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }, children: "Kh\u00F4ng c\u00F3 t\u00E1c v\u1EE5" })) : (sortedTasks.map(task => {
                        const themeColor = task.color
                            || constants_1.SYSTEM_CATEGORIES.find(c => c.id === task.categoryId)?.color
                            || constants_1.SYSTEM_CATEGORIES[0].color;
                        return ((0, jsx_runtime_1.jsx)(TaskItem_1.default, { task: task, themeColor: themeColor, isCompleted: (0, weeklyHelpers_1.isTaskCompletedOnDate)(task, dateStr), onToggle: () => onToggleTask(task, dateStr), onEdit: () => onEditTask(task), onDelete: () => onDeleteTask(task.id), onClick: () => onTaskClick(task, dateStr) }, task.id));
                    })) })] }) }));
};
exports.default = WeekDayCell;
