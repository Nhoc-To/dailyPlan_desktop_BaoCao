"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const categoryColors = {
    'Học tập': { bg: '#FEE2E2', color: '#DC2626' },
    'Công việc': { bg: '#DBEAFE', color: '#2563EB' },
    'Giải trí': { bg: '#D1FAE5', color: '#059669' },
    'Cá nhân': { bg: '#FEF3C7', color: '#D97706' },
};
const getCategoryStyle = (tag) => {
    if (!tag)
        return { bg: '#F3F4F6', color: '#6B7280' };
    return categoryColors[tag] ?? { bg: '#EEF2FF', color: '#4338CA' };
};
const TaskYearCard = ({ task, selectionMode, selected, onToggle, onToggleStatus, onEdit }) => {
    const overdue = !task.status && new Date(task.endDate).getTime() < Date.now();
    const catStyle = getCategoryStyle(task.tags);
    const statusConfig = task.status
        ? { bg: '#DCFCE7', color: '#16A34A', label: 'Hoàn thành', dot: '#16A34A' }
        : overdue
            ? { bg: '#FEE2E2', color: '#DC2626', label: 'Quá hạn', dot: '#DC2626' }
            : { bg: '#EEF2FF', color: '#5B5CEB', label: 'Đang thực hiện', dot: '#5B5CEB' };
    const leftBorder = task.status ? '#16A34A' : overdue ? '#DC2626' : '#5B5CEB';
    // grid columns must match YCalendar's COLS definition
    const gridCols = '52px 1fr 110px 130px 120px 120px 118px 80px';
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'grid',
            gridTemplateColumns: gridCols,
            alignItems: 'center',
            background: selected ? '#F5F3FF' : '#FFFFFF',
            borderBottom: '1px solid #F3F4F6',
            borderLeft: `3px solid ${leftBorder}`,
            minHeight: '60px',
            transition: 'background 0.15s',
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }, children: selectionMode ? ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selected, onChange: () => onToggle(task.id), style: { width: '16px', height: '16px', accentColor: '#5B5CEB', cursor: 'pointer' } })) : ((0, jsx_runtime_1.jsx)("button", { title: task.status ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành', onClick: () => onToggleStatus(task), style: {
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${task.status ? '#16A34A' : '#D1D5DB'}`,
                        background: task.status ? '#16A34A' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', padding: 0, transition: 'all 0.15s',
                    }, children: task.status && ((0, jsx_runtime_1.jsx)("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("polyline", { points: "20 6 9 17 4 12" }) })) })) }), (0, jsx_runtime_1.jsxs)("div", { onClick: () => onEdit(task), style: { padding: '12px 16px 12px 8px', overflow: 'hidden', cursor: 'pointer' }, title: "Nh\u1EA5n \u0111\u1EC3 ch\u1EC9nh s\u1EEDa", children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            fontWeight: 600, fontSize: '14px', color: '#111827',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            textDecoration: task.status ? 'line-through' : 'none',
                            opacity: task.status ? 0.55 : 1,
                        }, children: task.name }), task.description && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: '12px', color: '#9CA3AF', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: task.description }))] }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '0 8px' }, children: task.tags ? ((0, jsx_runtime_1.jsxs)("span", { style: {
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 9px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                        background: catStyle.bg, color: catStyle.color,
                    }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" }), (0, jsx_runtime_1.jsx)("line", { x1: "7", y1: "7", x2: "7.01", y2: "7" })] }), task.tags] })) : ((0, jsx_runtime_1.jsx)("span", { style: { color: '#D1D5DB', fontSize: '13px' }, children: "\u2014" })) }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '0 8px', fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: task.description || (0, jsx_runtime_1.jsx)("span", { style: { color: '#D1D5DB' }, children: "\u2014" }) }), (0, jsx_runtime_1.jsxs)("div", { style: { padding: '0 8px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#374151' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "#9CA3AF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }), task.startDate] }), task.startTime && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '11px', color: '#9CA3AF', marginTop: '2px', paddingLeft: '17px' }, children: task.startTime })] }), (0, jsx_runtime_1.jsxs)("div", { style: { padding: '0 8px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: overdue ? '#DC2626' : '#374151' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: overdue ? '#DC2626' : '#9CA3AF', strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }), task.endDate] }), task.endTime && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '11px', color: overdue ? '#FCA5A5' : '#9CA3AF', marginTop: '2px', paddingLeft: '17px' }, children: task.endTime })] }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '0 8px' }, children: (0, jsx_runtime_1.jsxs)("span", { style: {
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                        background: statusConfig.bg, color: statusConfig.color,
                        whiteSpace: 'nowrap',
                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { width: '6px', height: '6px', borderRadius: '50%', background: statusConfig.dot, flexShrink: 0 } }), statusConfig.label] }) }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '0 12px', display: 'flex', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)("button", { title: "Ch\u1EC9nh s\u1EEDa", onClick: () => onEdit(task), style: {
                        width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E5E7EB',
                        background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280',
                    }, children: (0, jsx_runtime_1.jsxs)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), (0, jsx_runtime_1.jsx)("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })] }) }) })] }));
};
exports.default = TaskYearCard;
