"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const TaskItem = ({ task, themeColor, isCompleted, onToggle, onEdit, onDelete, onClick, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { onClick: onClick, style: {
            background: `${themeColor}15`,
            padding: '12px',
            borderRadius: '12px',
            borderLeft: `4px solid ${themeColor}`,
            opacity: isCompleted ? 0.6 : 1,
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)("div", { onClick: (e) => {
                            e.stopPropagation();
                            onToggle();
                        }, style: { cursor: 'pointer', marginTop: '2px', color: themeColor }, children: isCompleted ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 16 }) }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    marginBottom: '4px',
                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                    color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                                }, children: task.name }), task.description && ((0, jsx_runtime_1.jsx)("div", { style: {
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                }, children: task.description }))] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '6px',
                    marginTop: '6px',
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.stopPropagation();
                            onEdit();
                        }, style: {
                            background: 'transparent',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            color: 'var(--primary-color)',
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 14 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                            e.stopPropagation();
                            onDelete();
                        }, style: {
                            background: 'transparent',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            color: '#ff5252',
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 14 }) })] })] }));
};
exports.default = TaskItem;
