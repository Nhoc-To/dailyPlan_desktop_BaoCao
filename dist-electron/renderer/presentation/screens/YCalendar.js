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
const YCalendar = ({ tasks, onTaskUpdated }) => {
    const [sortBy, setSortBy] = (0, react_1.useState)('date');
    const [selectedYear, setSelectedYear] = (0, react_1.useState)(new Date().getFullYear());
    const [selectionMode, setSelectionMode] = (0, react_1.useState)(false);
    const [selectedIds, setSelectedIds] = (0, react_1.useState)([]);
    const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
    const tasksForYear = (0, react_1.useMemo)(() => {
        const list = tasks.filter(task => {
            const year = new Date(task.startDate)
                .getFullYear();
            return year === selectedYear;
        });
        const isTaskCompletedOrOverdue = (task) => {
            const isDone = task.status;
            const endDateTime = new Date(`${task.endDate}T${task.endTime || '23:59'}`).getTime();
            const isOverdue = !isDone &&
                endDateTime <= Date.now();
            return isDone || isOverdue;
        };
        return [...list].sort((a, b) => {
            const bottomA = isTaskCompletedOrOverdue(a);
            const bottomB = isTaskCompletedOrOverdue(b);
            if (bottomA && !bottomB)
                return 1;
            if (!bottomA && bottomB)
                return -1;
            switch (sortBy) {
                case 'date':
                    return (new Date(b.startDate).getTime()
                        -
                            new Date(a.startDate).getTime());
                case 'duration':
                    const remainA = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime()
                        - Date.now();
                    const remainB = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime()
                        - Date.now();
                    return remainA - remainB;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
    }, [tasks, sortBy, selectedYear]);
    const monthStats = (0, react_1.useMemo)(() => {
        const stats = Array(12).fill(0);
        tasksForYear.forEach(task => {
            const month = new Date(task.startDate)
                .getMonth();
            stats[month]++;
        });
        return stats;
    }, [tasksForYear]);
    const toggleTask = (id) => {
        setSelectedIds(prev => prev.includes(id)
            ? prev.filter(x => x !== id)
            : [...prev, id]);
    };
    const handleBulkDelete = async () => {
        if (!window.confirm(`Xóa ${selectedIds.length} nhiệm vụ?`)) {
            return;
        }
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
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            padding: '30px',
            background: '#F5F6FF',
            minHeight: '100vh'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { style: {
                                    margin: 0,
                                    color: '#1F2937'
                                }, children: ["\uD83D\uDCC5 L\u1ECBch n\u0103m ", selectedYear] }), (0, jsx_runtime_1.jsx)("p", { style: {
                                    color: '#6B7280',
                                    marginTop: '8px'
                                }, children: "T\u1ED5ng h\u1EE3p to\u00E0n b\u1ED9 nhi\u1EC7m v\u1EE5 trong n\u0103m" })] }), (0, jsx_runtime_1.jsx)("select", { value: selectedYear, onChange: (e) => setSelectedYear(Number(e.target.value)), style: {
                            padding: '10px 16px',
                            borderRadius: '12px',
                            border: '1px solid #D6D9F0',
                            fontWeight: 600,
                            color: '#5B5CEB'
                        }, children: years.map(year => ((0, jsx_runtime_1.jsx)("option", { value: year, children: year }, year))) })] }), (0, jsx_runtime_1.jsx)(SumaryBox_1.default, { tasks: tasksForYear }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12,1fr)',
                    gap: '10px',
                    marginBottom: '30px'
                }, children: monthStats.map((count, index) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '12px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(91,92,235,0.08)'
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                color: '#5B5CEB',
                                fontWeight: 600
                            }, children: ["T", index + 1] }), (0, jsx_runtime_1.jsx)("div", { children: count })] }, index))) }), (0, jsx_runtime_1.jsx)(SortingToolbar_1.default, { sortBy: sortBy, setSortBy: setSortBy }), selectionMode && ((0, jsx_runtime_1.jsx)(BulDeleteBar_1.default, { count: selectedIds.length, onDelete: handleBulkDelete, onCancel: () => { setSelectionMode(false); setSelectedIds([]); } })), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSelectionMode(!selectionMode), style: {
                    marginBottom: '20px',
                    background: '#5B5CEB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    cursor: 'pointer'
                }, children: selectionMode
                    ? 'Huỷ chọn'
                    : 'Chọn nhiều' }), tasksForYear.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                    textAlign: 'center',
                    padding: '50px',
                    background: '#FFFFFF',
                    borderRadius: '24px'
                }, children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uD83D\uDCDA" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Kh\u00F4ng c\u00F3 nhi\u1EC7m v\u1EE5 n\u00E0o trong n\u0103m ", selectedYear] })] })) : (tasksForYear.map(task => ((0, jsx_runtime_1.jsx)(TaskYearCard_1.default, { task: task, selectionMode: selectionMode, selected: selectedIds.includes(task.id), onToggle: toggleTask }, task.id))))] }));
};
exports.default = YCalendar;
