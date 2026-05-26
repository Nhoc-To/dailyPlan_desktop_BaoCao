"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const TaskDetailModal = ({ task, dateStr, isCompleted, onClose, onToggle, }) => {
    if (!task)
        return null;
    const themeColor = task.color || '#4f46e5';
    return ((0, jsx_runtime_1.jsx)("div", { onClick: onClose, style: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }, children: (0, jsx_runtime_1.jsxs)("div", { onClick: (e) => e.stopPropagation(), style: {
                background: 'var(--surface-bg, #ffffff)',
                borderRadius: '16px',
                padding: '24px',
                width: '90%',
                maxWidth: '500px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                borderTop: `6px solid ${themeColor}`,
            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '16px',
                    }, children: [(0, jsx_runtime_1.jsx)("h2", { style: {
                                margin: 0,
                                color: 'var(--text-main)',
                                fontSize: '1.4rem',
                                textDecoration: isCompleted ? 'line-through' : 'none',
                                opacity: isCompleted ? 0.6 : 1,
                            }, children: task.name }), (0, jsx_runtime_1.jsx)("button", { onClick: onClose, style: {
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted)',
                                padding: '4px',
                            }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 20 }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 16 }), (0, jsx_runtime_1.jsxs)("span", { children: ["Ng\u00E0y: ", dateStr] })] }), (0, jsx_runtime_1.jsxs)("button", { onClick: onToggle, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${themeColor}`,
                        background: isCompleted ? `${themeColor}20` : 'transparent',
                        color: themeColor,
                        cursor: 'pointer',
                        fontWeight: 600,
                        marginBottom: '20px',
                        width: '100%',
                        justifyContent: 'center',
                    }, children: [isCompleted ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 18 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 18 }), isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                                fontSize: '1rem',
                                color: 'var(--text-main)',
                                marginBottom: '8px',
                            }, children: "\uD83D\uDCDD Ghi ch\u00FA" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                padding: '16px',
                                background: `${themeColor}10`,
                                borderRadius: '12px',
                                borderLeft: `4px solid ${themeColor}`,
                                minHeight: '100px',
                                fontSize: '0.95rem',
                                color: 'var(--text-main)',
                                lineHeight: 1.6,
                            }, children: task.description || ((0, jsx_runtime_1.jsx)("span", { style: { color: 'var(--text-muted)', fontStyle: 'italic' }, children: "Ch\u01B0a c\u00F3 ghi ch\u00FA cho t\u00E1c v\u1EE5 n\u00E0y." })) })] })] }) }));
};
exports.default = TaskDetailModal;
