"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../../shared/constants");
const TaskItem = ({ task, dateStr, onEdit, onDelete }) => {
    const theme = task.color ||
        constants_1.SYSTEM_CATEGORIES.find(c => c.id === task.categoryId)?.color ||
        constants_1.SYSTEM_CATEGORIES[0].color;
    let completedDays = [];
    try {
        completedDays = JSON.parse(task.completedDays || '[]');
    }
    catch {
        completedDays = [];
    }
    const isCompletedToday = completedDays.includes(dateStr);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: `${theme}20`,
            borderLeft: `3px solid ${theme}`,
            padding: '6px 8px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            opacity: isCompletedToday
                ? 0.6
                : 1,
            textDecoration: isCompletedToday
                ? 'line-through'
                : 'none'
        }, title: task.description ||
            task.name, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 600
                }, children: task.name }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: '4px',
                    marginLeft: '4px'
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }, style: {
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--primary-color)'
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 12 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }, style: {
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ff5252'
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 12 }) })] })] }));
};
exports.default = TaskItem;
