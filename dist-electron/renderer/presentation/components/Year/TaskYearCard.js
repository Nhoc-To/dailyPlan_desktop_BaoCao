"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TaskYearCard = ({ task, selectionMode, selected, onToggle }) => {
    const overdue = !task.status &&
        new Date(task.endDate).getTime() <
            Date.now();
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '18px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
            borderLeft: task.status
                ? '6px solid #22C55E'
                : overdue
                    ? '6px solid #EF4444'
                    : '6px solid #5B5CEB'
        }, children: [selectionMode && ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selected, onChange: () => onToggle(task.id), style: {
                    width: '20px',
                    height: '20px',
                    accentColor: '#EF4444',
                    marginTop: '8px'
                } })), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                                    margin: 0,
                                    color: '#1F2937',
                                    fontSize: '20px',
                                    fontWeight: 700
                                }, children: task.name }), (0, jsx_runtime_1.jsx)("span", { style: {
                                    padding: '6px 12px',
                                    borderRadius: '999px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    background: task.status
                                        ? '#DCFCE7'
                                        : overdue
                                            ? '#FEE2E2'
                                            : '#E0E7FF',
                                    color: task.status
                                        ? '#15803D'
                                        : overdue
                                            ? '#DC2626'
                                            : '#4338CA'
                                }, children: task.status
                                    ? '✓ Hoàn thành'
                                    : overdue
                                        ? '⚠ Quá hạn'
                                        : '⏳ Đang thực hiện' })] }), task.description && ((0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#6B7280',
                            lineHeight: '1.6',
                            marginBottom: '14px'
                        }, children: task.description })), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '14px',
                            marginBottom: '12px'
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                    background: '#F5F6FF',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    color: '#5B5CEB',
                                    fontSize: '14px'
                                }, children: ["\uD83D\uDCC5 B\u1EAFt \u0111\u1EA7u: ", task.startDate] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                    background: '#FFF7ED',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    color: '#EA580C',
                                    fontSize: '14px'
                                }, children: ["\uD83C\uDFAF H\u1EA1n ch\u00F3t: ", task.endDate] })] }), task.tags && ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'inline-block',
                            background: '#EEF2FF',
                            color: '#4338CA',
                            padding: '6px 12px',
                            borderRadius: '999px',
                            fontSize: '13px',
                            fontWeight: 600
                        }, children: ["#", task.tags] }))] })] }));
};
exports.default = TaskYearCard;
