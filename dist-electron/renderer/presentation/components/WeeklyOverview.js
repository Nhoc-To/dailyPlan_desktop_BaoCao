"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../shared/constants");
const WEEK_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const WeeklyOverview = ({ tasks, onTaskUpdated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [currentDate, setCurrentDate] = (0, react_1.useState)(new Date());
    const [selectedDay, setSelectedDay] = (0, react_1.useState)(null);
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // 0 is Monday
    };
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToday = () => {
        const today = new Date();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDay(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    };
    // Convert array to deterministic dictionary by date to avoid jumpy mock data
    // Khai triển các task trải dài nhiều ngày
    const tasksByDateStr = (0, react_1.useMemo)(() => {
        const map = new Map();
        // Helper function to add days to a string date
        const getNextDateStr = (dateStr, daysToAdd) => {
            const d = new Date(dateStr);
            d.setDate(d.getDate() + daysToAdd);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        tasks.forEach(t => {
            let currentStr = t.startDate;
            const endStr = t.endDate || t.startDate;
            // Safety limit: max 365 days to prevent infinite loops
            let loopCount = 0;
            while (currentStr <= endStr && loopCount < 365) {
                const arr = map.get(currentStr) || [];
                // Prevent duplicate tasks in same day if data is weird
                if (!arr.find(existing => existing.id === t.id)) {
                    arr.push(t);
                    map.set(currentStr, arr);
                }
                currentStr = getNextDateStr(currentStr, 1);
                loopCount++;
            }
        });
        return map;
    }, [tasks]);
    const hasTasks = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return tasksByDateStr.has(dateStr);
    };
    const handleDayClick = (day) => {
        setSelectedDay(new Date(year, month, day));
    };
    const getTasksForDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`; // Use Local timezone format to prevent jumping
        return tasksByDateStr.get(dateStr) || [];
    };
    // Tính 7 ngày của tuần hiện tại để hiển thị ở Ô 2 - Ô 8
    const currentWeekDays = (0, react_1.useMemo)(() => {
        const baseDate = selectedDay || new Date();
        const date = new Date(baseDate);
        const day = date.getDay() || 7;
        if (day !== 1) {
            date.setDate(date.getDate() - (day - 1)); // Fixed UTC / setHours bug!
        }
        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(date);
            d.setDate(d.getDate() + i);
            week.push(d);
        }
        return week;
    }, [selectedDay]);
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            if (window.api?.tasks) {
                await window.api.tasks.delete(id);
                if (onTaskUpdated)
                    onTaskUpdated();
            }
        }
    };
    const handleEdit = (e, task) => {
        e.stopPropagation();
        navigate('/editor', { state: { task } });
    };
    const handleToggleStatus = async (e, t, dateStr) => {
        e.stopPropagation();
        if (window.api?.tasks) {
            let completedDays = [];
            try {
                completedDays = JSON.parse(t.completedDays || '[]');
            }
            catch { }
            const newCompletedDays = completedDays.includes(dateStr)
                ? completedDays.filter(d => d !== dateStr)
                : [...completedDays, dateStr];
            const sd = new Date(t.startDate);
            const ed = new Date(t.endDate || t.startDate);
            const totalDays = Math.round((ed.getTime() - sd.getTime()) / (1000 * 3600 * 24)) + 1;
            const newStatus = newCompletedDays.length >= totalDays;
            await window.api.tasks.update(t.id, {
                completedDays: JSON.stringify(newCompletedDays),
                status: newStatus
            });
            if (onTaskUpdated)
                onTaskUpdated();
        }
    };
    const renderCellContent = (title, cellTasks, dateBadge, dateStr) => {
        const isTaskCompletedToday = (t) => {
            let cDays = [];
            try {
                cDays = JSON.parse(t.completedDays || '[]');
            }
            catch { }
            return cDays.includes(dateStr);
        };
        const sortedTasks = [...cellTasks].sort((a, b) => {
            return Number(isTaskCompletedToday(a)) - Number(isTaskCompletedToday(b)) || a.id - b.id;
        });
        return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--surface-border)' }, children: [(0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '1.2rem', color: 'var(--primary-color)', margin: 0 }, children: title }), dateBadge && (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }, children: dateBadge })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }, children: sortedTasks.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }, children: "Kh\u00F4ng c\u00F3 t\u00E1c v\u1EE5" })) : (sortedTasks.map((t, idx) => {
                        const theme = t.color || constants_1.SYSTEM_CATEGORIES.find(c => c.id === t.categoryId)?.color || constants_1.SYSTEM_CATEGORIES[0].color;
                        const isCompletedToday = isTaskCompletedToday(t);
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                background: `${theme}15`,
                                padding: '12px', borderRadius: '12px',
                                borderLeft: `4px solid ${theme}`,
                                opacity: isCompletedToday ? 0.6 : 1,
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column'
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)("div", { onClick: (e) => handleToggleStatus(e, t, dateStr), style: { cursor: 'pointer', marginTop: '2px', color: theme }, children: isCompletedToday ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 16 }) }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', textDecoration: isCompletedToday ? 'line-through' : 'none', color: isCompletedToday ? 'var(--text-muted)' : 'var(--text-main)' }, children: t.name }), t.description && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: isCompletedToday ? 'line-through' : 'none', marginBottom: '4px' }, children: t.description }), t.startTime && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 12, style: { opacity: 0.8 } }), (0, jsx_runtime_1.jsxs)("span", { children: [t.startTime, t.endTime && t.endTime !== '23:59' ? ` - ${t.endTime}` : ''] })] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '6px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => handleEdit(e, t), style: { background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--primary-color)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 14 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => handleDelete(e, t.id), style: { background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: '#ff5252' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 14 }) })] })] }, t.id || idx));
                    })) })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { margin: 0, color: 'var(--text-main)' }, children: "K\u1EBF ho\u1EA1ch Tu\u1EA7n" }), (0, jsx_runtime_1.jsx)("button", { onClick: goToday, style: { padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }, children: "H\u00F4m nay" })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: '24px',
                    flex: 1,
                    width: '100%'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: { padding: '20px', display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: prevMonth, style: { background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {}) }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: (0, jsx_runtime_1.jsxs)("h3", { style: { fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }, children: ["Th\u00E1ng ", month + 1, ", ", year] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: nextMonth, style: { background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }, children: [(0, jsx_runtime_1.jsx)("div", { children: "T2" }), (0, jsx_runtime_1.jsx)("div", { children: "T3" }), (0, jsx_runtime_1.jsx)("div", { children: "T4" }), (0, jsx_runtime_1.jsx)("div", { children: "T5" }), (0, jsx_runtime_1.jsx)("div", { children: "T6" }), (0, jsx_runtime_1.jsx)("div", { children: "T7" }), (0, jsx_runtime_1.jsx)("div", { children: "CN" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1 }, children: [Array.from({ length: firstDay }).map((_, i) => (0, jsx_runtime_1.jsx)("div", {}, `empty-${i}`)), Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const hasTask = hasTasks(day);
                                        const isSelected = selectedDay?.getDate() === day && selectedDay?.getMonth() === month && selectedDay?.getFullYear() === year;
                                        const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
                                        return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => handleDayClick(day), style: {
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', borderRadius: '8px',
                                                background: isSelected ? 'var(--primary-color)' : (isToday ? 'rgba(79,70,229,0.2)' : (hasTask ? 'rgba(79,70,229,0.05)' : 'transparent')),
                                                color: isSelected ? 'white' : (isToday ? 'var(--primary-color)' : 'var(--text-main)'),
                                                fontWeight: isSelected || hasTask || isToday ? 600 : 400,
                                                transition: 'all 0.2s',
                                                position: 'relative',
                                                border: isToday && !isSelected ? '1px solid var(--primary-color)' : '1px solid transparent'
                                            }, children: [day, hasTask && !isSelected && (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 10, color: "var(--primary-color)", style: { position: 'absolute', bottom: '2px' } }), hasTask && isSelected && (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 10, color: "white", style: { position: 'absolute', bottom: '2px' } })] }, day));
                                    })] })] }), (() => {
                        const d = currentWeekDays[0];
                        const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                        const isSelectedCell = selectedDay && d.toDateString() === selectedDay.toDateString();
                        const isTodayCell = d.toDateString() === new Date().toDateString();
                        return ((0, jsx_runtime_1.jsx)("div", { className: "glass card", style: {
                                padding: 0,
                                border: isSelectedCell ? '2px solid var(--primary-color)' : (isTodayCell ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
                                boxShadow: isSelectedCell ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
                                background: isTodayCell ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)'
                            }, children: renderCellContent(WEEK_DAYS[0], getTasksForDate(d), `${d.getDate()}/${d.getMonth() + 1}`, dStr) }));
                    })(), currentWeekDays.slice(1).map((d, idx) => {
                        const isSelectedCell = selectedDay && d.toDateString() === selectedDay.toDateString();
                        const isTodayCell = d.toDateString() === new Date().toDateString();
                        return ((0, jsx_runtime_1.jsx)("div", { className: "glass card", style: {
                                padding: 0,
                                border: isSelectedCell ? '2px solid var(--primary-color)' : (isTodayCell ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'),
                                boxShadow: isSelectedCell ? '0 0 0 2px rgba(79,70,229,0.2)' : 'none',
                                background: isTodayCell ? 'rgba(79,70,229,0.02)' : 'var(--surface-bg)'
                            }, children: (() => {
                                const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                return renderCellContent(WEEK_DAYS[idx + 1], getTasksForDate(d), `${d.getDate()}/${d.getMonth() + 1}`, dStr);
                            })() }, idx));
                    })] })] }));
};
exports.default = WeeklyOverview;
