"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SumaryBox_1 = __importDefault(require("../components/Year/SumaryBox"));
const SortingToolbar_1 = __importDefault(require("../components/Year/SortingToolbar"));
const TaskYearCard_1 = __importDefault(require("../components/Year/TaskYearCard"));
const BulDeleteBar_1 = __importDefault(require("../components/Year/BulDeleteBar"));
const MONTH_NAMES = [
    'Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6',
    'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'
];
const YCalendar = ({ tasks, onTaskUpdated }) => {
    const [sortBy, setSortBy] = (0, react_1.useState)('date');
    const [selectedYear, setSelectedYear] = (0, react_1.useState)(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = (0, react_1.useState)(null);
    const [selectionMode, setSelectionMode] = (0, react_1.useState)(false);
    const [selectedIds, setSelectedIds] = (0, react_1.useState)([]);
    const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
    // Tất cả tasks của năm (KHÔNG filter tháng) — dùng để tính monthStats
    const tasksForYearAll = (0, react_1.useMemo)(() => {
        return tasks.filter(task => new Date(task.startDate).getFullYear() === selectedYear);
    }, [tasks, selectedYear]);
    // Thống kê theo tháng — luôn hiện đủ 12 tháng
    const monthStats = (0, react_1.useMemo)(() => {
        const stats = Array(12).fill(0);
        tasksForYearAll.forEach(task => {
            const month = new Date(task.startDate).getMonth();
            stats[month]++;
        });
        return stats;
    }, [tasksForYearAll]);
    // Tasks đã lọc tháng + sắp xếp
    const tasksFiltered = (0, react_1.useMemo)(() => {
        const list = tasksForYearAll.filter(task => {
            if (selectedMonth === null)
                return true;
            return new Date(task.startDate).getMonth() === selectedMonth;
        });
        return [...list].sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    // Ngày bắt đầu gần nhất (mới nhất) lên trên
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                case 'duration':
                    // Hạn chót gần nhất lên trên
                    const endA = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime();
                    const endB = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime();
                    return endA - endB;
                case 'name':
                    // A → Z
                    return a.name.localeCompare(b.name, 'vi');
                default:
                    return 0;
            }
        });
    }, [tasksForYearAll, selectedMonth, sortBy]);
    const toggleTask = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const handleBulkDelete = async () => {
        if (!window.confirm(`Xóa ${selectedIds.length} nhiệm vụ?`))
            return;
        try {
            await window.api.tasks.deleteTasks(selectedIds);
            setSelectedIds([]);
            setSelectionMode(false);
            await onTaskUpdated();
        }
        catch (error) {
            console.error('Bulk delete failed', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '30px', background: '#F5F6FF', minHeight: '100vh' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { style: { margin: 0, color: '#1F2937' }, children: ["\uD83D\uDCC5 L\u1ECBch n\u0103m ", selectedYear] }), (0, jsx_runtime_1.jsx)("p", { style: { color: '#6B7280', marginTop: '8px' }, children: "T\u1ED5ng h\u1EE3p to\u00E0n b\u1ED9 nhi\u1EC7m v\u1EE5 trong n\u0103m" })] }), (0, jsx_runtime_1.jsx)("select", { value: selectedYear, onChange: e => setSelectedYear(Number(e.target.value)), style: { padding: '10px 16px', borderRadius: '12px', border: '1px solid #D6D9F0', fontWeight: 600, color: '#5B5CEB' }, children: years.map(year => (0, jsx_runtime_1.jsx)("option", { value: year, children: year }, year)) })] }), (0, jsx_runtime_1.jsx)(SumaryBox_1.default, { tasks: tasksFiltered }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '10px', marginBottom: '30px' }, children: monthStats.map((count, index) => {
                    const isActive = selectedMonth === index;
                    const hasTask = count > 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => hasTask && setSelectedMonth(isActive ? null : index), style: {
                            background: isActive ? '#5B5CEB' : '#FFFFFF',
                            borderRadius: '16px',
                            padding: '12px 8px',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(91,92,235,0.08)',
                            cursor: hasTask ? 'pointer' : 'default',
                            border: isActive ? '2px solid #5B5CEB' : '2px solid #ECECF7',
                            transform: isActive ? 'scale(1.08)' : 'scale(1)',
                            transition: 'all 0.18s ease',
                            position: 'relative'
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: isActive ? '#C7D2FE' : '#6B7280', fontWeight: 600, fontSize: '11px', marginBottom: '6px' }, children: MONTH_NAMES[index] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: isActive
                                        ? 'rgba(255,255,255,0.2)'
                                        : hasTask ? '#EF4444' : '#F3F4F6',
                                    color: isActive ? '#FFFFFF' : hasTask ? '#FFFFFF' : '#9CA3AF',
                                    fontWeight: 700,
                                    fontSize: '15px'
                                }, children: count })] }, index));
                }) }), (0, jsx_runtime_1.jsx)(SortingToolbar_1.default, { sortBy: sortBy, setSortBy: setSortBy }), selectedMonth !== null && ((0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    marginBottom: '16px', background: '#EEF2FF',
                    borderRadius: '12px', padding: '10px 16px'
                }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { color: '#4338CA', fontWeight: 600 }, children: ["\uD83D\uDCC5 Th\u00E1ng ", selectedMonth + 1, " \u2014 ", tasksFiltered.length, " nhi\u1EC7m v\u1EE5"] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSelectedMonth(null), style: { background: '#5B5CEB', color: '#FFF', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '13px' }, children: "\u2715 B\u1ECF l\u1ECDc" })] })), selectionMode && ((0, jsx_runtime_1.jsx)(BulDeleteBar_1.default, { count: selectedIds.length, onDelete: handleBulkDelete, onCancel: () => { setSelectionMode(false); setSelectedIds([]); } })), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSelectionMode(!selectionMode), style: { marginBottom: '20px', background: '#5B5CEB', color: '#FFF', border: 'none', borderRadius: '12px', padding: '10px 16px', cursor: 'pointer' }, children: selectionMode ? 'Huỷ chọn' : 'Chọn nhiều' }), tasksFiltered.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', padding: '50px', background: '#FFFFFF', borderRadius: '24px' }, children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uD83D\uDCDA" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Kh\u00F4ng c\u00F3 nhi\u1EC7m v\u1EE5 n\u00E0o ", selectedMonth !== null ? `trong tháng ${selectedMonth + 1}` : `trong năm ${selectedYear}`] })] })) : (tasksFiltered.map(task => ((0, jsx_runtime_1.jsx)(TaskYearCard_1.default, { task: task, selectionMode: selectionMode, selected: selectedIds.includes(task.id), onToggle: toggleTask }, task.id))))] }));
};
exports.default = YCalendar;
