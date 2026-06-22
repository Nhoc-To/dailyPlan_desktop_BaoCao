"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../../shared/constants");
const MonthDayCell = ({ date, dateStr, isCurrentMonth, tasks, onDayClick, onEdit, onDelete, isSelected = false }) => {
    const isToday = () => {
        const today = new Date();
        return today.getDate() === date &&
            today.getMonth() === new Date(dateStr).getMonth() &&
            today.getFullYear() === new Date(dateStr).getFullYear();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { onClick: (e) => {
            e.stopPropagation();
            if (isCurrentMonth) {
                onDayClick(dateStr, e);
            }
        }, style: {
            background: isCurrentMonth ? 'var(--surface-bg)' : '#f5f5f5',
            border: isSelected
                ? '2px solid var(--primary-color)'
                : isToday() ? '2px solid #ef4444' : '1px solid var(--surface-border)',
            boxShadow: isSelected
                ? '0 0 0 3px rgba(79,70,229,0.15)'
                : isToday() ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none',
            borderRadius: '12px',
            padding: '8px',
            minHeight: '100px',
            cursor: isCurrentMonth ? 'pointer' : 'default',
            opacity: isCurrentMonth ? 1 : 0.5,
            transition: 'all 0.2s'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    textAlign: 'right',
                    fontWeight: isToday() ? 700 : 400,
                    color: isSelected ? 'var(--primary-color)' : isToday() ? '#ef4444' : 'var(--text-main)',
                    marginBottom: '8px'
                }, children: date }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [tasks.slice(0, 3).map(task => {
                        const theme = task.color || constants_1.SYSTEM_CATEGORIES.find(c => c.id === task.categoryId)?.color || '#448aff';
                        let completedDays = [];
                        try {
                            completedDays = JSON.parse(task.completedDays || '[]');
                        }
                        catch { }
                        const isCompleted = completedDays.includes(dateStr);
                        return ((0, jsx_runtime_1.jsxs)("div", { onClick: (e) => e.stopPropagation(), style: {
                                background: `${theme}20`,
                                borderLeft: `3px solid ${theme}`,
                                padding: '4px 6px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                opacity: isCompleted ? 0.6 : 1,
                                textDecoration: isCompleted ? 'line-through' : 'none'
                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1
                                    }, children: task.name }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '4px', marginLeft: '4px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => onEdit(e, task), style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 10 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => onDelete(e, task.id), style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 10 }) })] })] }, task.id));
                    }), tasks.length > 3 && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }, children: ["+", tasks.length - 3, " n\u1EEFa"] }))] })] }));
};
exports.default = MonthDayCell;
