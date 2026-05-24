"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const weeklyHelpers_1 = require("./weeklyHelpers");
const MiniCalendar = ({ year, month, selectedDay, hasTasks, onPrevMonth, onNextMonth, onGoToday, onSelectDay, }) => {
    const daysInMonth = (0, weeklyHelpers_1.getDaysInMonth)(year, month);
    const firstDay = (0, weeklyHelpers_1.getFirstDayOfMonth)(year, month);
    const today = new Date();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: { padding: '20px', display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: onPrevMonth, style: { background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {}) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: { fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }, children: ["Th\u00E1ng ", month + 1, ", ", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: onGoToday, style: {
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--primary-color)',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '4px',
                                    textDecoration: 'underline',
                                } })] }), (0, jsx_runtime_1.jsx)("button", { onClick: onNextMonth, style: { background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                }, children: [(0, jsx_runtime_1.jsx)("div", { children: "T2" }), (0, jsx_runtime_1.jsx)("div", { children: "T3" }), (0, jsx_runtime_1.jsx)("div", { children: "T4" }), (0, jsx_runtime_1.jsx)("div", { children: "T5" }), (0, jsx_runtime_1.jsx)("div", { children: "T6" }), (0, jsx_runtime_1.jsx)("div", { children: "T7" }), (0, jsx_runtime_1.jsx)("div", { children: "CN" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1 }, children: [Array.from({ length: firstDay }).map((_, i) => (0, jsx_runtime_1.jsx)("div", {}, `empty-${i}`)), Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const hasTask = hasTasks(day);
                        const isSelected = selectedDay?.getDate() === day
                            && selectedDay?.getMonth() === month
                            && selectedDay?.getFullYear() === year;
                        const isToday = today.getDate() === day
                            && today.getMonth() === month
                            && today.getFullYear() === year;
                        return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => onSelectDay(day), style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                background: isSelected
                                    ? 'var(--primary-color)'
                                    : (isToday ? 'rgba(79,70,229,0.2)' : (hasTask ? 'rgba(79,70,229,0.05)' : 'transparent')),
                                color: isSelected ? 'white' : (isToday ? 'var(--primary-color)' : 'var(--text-main)'),
                                fontWeight: isSelected || hasTask || isToday ? 600 : 400,
                                transition: 'all 0.2s',
                                position: 'relative',
                                border: isToday && !isSelected ? '1px solid var(--primary-color)' : '1px solid transparent',
                            }, children: [day, hasTask && ((0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 10, color: isSelected ? 'white' : 'var(--primary-color)', style: { position: 'absolute', bottom: '2px' } }))] }, day));
                    })] })] }));
};
exports.default = MiniCalendar;
