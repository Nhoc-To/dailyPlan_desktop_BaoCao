"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const taskitem_1 = __importDefault(require("./taskitem"));
const MonthDayCell = ({ day, dateStr, tasks, isToday, onDayClick, onEdit, onDelete }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => onDayClick(dateStr), style: {
            background: isToday
                ? 'rgba(79,70,229,0.1)'
                : 'var(--surface-bg)',
            border: isToday
                ? '2px solid var(--primary-color)'
                : '1px solid var(--surface-border)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '120px',
            cursor: 'pointer'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    textAlign: 'right',
                    fontWeight: isToday
                        ? 800
                        : 600,
                    color: isToday
                        ? 'white'
                        : 'var(--text-main)',
                    background: isToday
                        ? 'var(--primary-color)'
                        : 'transparent',
                    alignSelf: 'flex-end',
                    padding: isToday
                        ? '2px 8px'
                        : '0',
                    borderRadius: isToday
                        ? '12px'
                        : '0',
                    marginBottom: '8px'
                }, children: day }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                }, children: tasks.map(task => ((0, jsx_runtime_1.jsx)(taskitem_1.default, { task: task, dateStr: dateStr, onEdit: onEdit, onDelete: onDelete }, task.id))) })] }));
};
exports.default = MonthDayCell;
