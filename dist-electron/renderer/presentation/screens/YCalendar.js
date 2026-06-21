"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const SumaryBox_1 = __importDefault(require("../components/Year/SumaryBox"));
const SortingToolbar_1 = __importDefault(require("../components/Year/SortingToolbar"));
const TaskYearCard_1 = __importDefault(require("../components/Year/TaskYearCard"));
const BulDeleteBar_1 = __importDefault(require("../components/Year/BulDeleteBar"));
const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
const YCalendar = ({ tasks, onTaskUpdated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [sortBy, setSortBy] = (0, react_1.useState)('date');
    const [selectedYear, setSelectedYear] = (0, react_1.useState)(new Date().getFullYear());
    const [selectionMode, setSelectionMode] = (0, react_1.useState)(false);
    const [selectedIds, setSelectedIds] = (0, react_1.useState)([]);
    const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
    const tasksForYear = (0, react_1.useMemo)(() => {
        const list = tasks.filter(t => new Date(t.startDate).getFullYear() === selectedYear);
        const isBottom = (t) => {
            const isOverdue = !t.status && new Date(`${t.endDate}T${t.endTime || '23:59'}`).getTime() <= Date.now();
            return t.status || isOverdue;
        };
        return [...list].sort((a, b) => {
            if (isBottom(a) && !isBottom(b))
                return 1;
            if (!isBottom(a) && isBottom(b))
                return -1;
            switch (sortBy) {
                case 'date': return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                case 'duration': {
                    const ra = new Date(`${a.endDate}T${a.endTime || '23:59'}`).getTime() - Date.now();
                    const rb = new Date(`${b.endDate}T${b.endTime || '23:59'}`).getTime() - Date.now();
                    return ra - rb;
                }
                case 'name': return a.name.localeCompare(b.name);
                default: return 0;
            }
        });
    }, [tasks, sortBy, selectedYear]);
    const monthStats = (0, react_1.useMemo)(() => {
        const s = Array(12).fill(0);
        tasksForYear.forEach(t => { s[new Date(t.startDate).getMonth()]++; });
        return s;
    }, [tasksForYear]);
    const maxMonth = Math.max(...monthStats, 1);
    const toggleTask = (id) => setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    // ── Toggle status (XONG column) ──
    const handleToggleStatus = async (task) => {
        try {
            await window.api.tasks.update(task.id, { status: !task.status });
            await onTaskUpdated();
        }
        catch (err) {
            console.error('Toggle status failed', err);
        }
    };
    // ── Navigate to editor (click on task name) ──
    const handleEditTask = (task) => {
        navigate('/editor', { state: { task } });
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
        catch (err) {
            console.error('Bulk delete failed', err);
        }
    };
    const COLS = [
        { key: 'xong', label: 'XONG', width: '52px' },
        { key: 'name', label: 'TÁC VỤ', width: '1fr' },
        { key: 'tags', label: 'PHÂN LOẠI', width: '110px' },
        { key: 'desc', label: 'MÔ TẢ', width: '130px' },
        { key: 'start', label: 'BẮT ĐẦU', width: '120px' },
        { key: 'end', label: 'KẾT THÚC', width: '120px' },
        { key: 'status', label: 'THỜI GIAN CÒN LẠI', width: '118px' },
        { key: 'actions', label: 'THAO TÁC', width: '80px' },
    ];
    const gridCols = COLS.map(c => c.width).join(' ');
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '28px 32px', background: '#F9FAFB', minHeight: '100vh' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { style: { margin: 0, fontSize: '22px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#5B5CEB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }), "L\u1ECBch N\u0103m", (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: '4px', background: '#EEF2FF', color: '#5B5CEB', fontSize: '13px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px' }, children: [tasksForYear.length, " T\u00E1c v\u1EE5"] })] }), (0, jsx_runtime_1.jsxs)("p", { style: { margin: '6px 0 0', fontSize: '13px', color: '#6B7280' }, children: ["T\u1ED5ng h\u1EE3p to\u00E0n b\u1ED9 nhi\u1EC7m v\u1EE5 trong n\u0103m ", selectedYear] })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("select", { value: selectedYear, onChange: e => setSelectedYear(Number(e.target.value)), style: {
                                        padding: '7px 32px 7px 14px', borderRadius: '8px',
                                        border: '1.5px solid #E5E7EB', fontWeight: 600, fontSize: '13px',
                                        color: '#111827', background: '#FFFFFF', cursor: 'pointer',
                                        appearance: 'none', outline: 'none',
                                    }, children: years.map(y => (0, jsx_runtime_1.jsx)("option", { value: y, children: y }, y)) }), (0, jsx_runtime_1.jsx)("svg", { style: { position: 'absolute', right: '10px', pointerEvents: 'none' }, width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "#6B7280", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("polyline", { points: "6 9 12 15 18 9" }) })] }) })] }), (0, jsx_runtime_1.jsx)(SumaryBox_1.default, { tasks: tasksForYear }), (0, jsx_runtime_1.jsxs)("div", { style: { background: '#FFFFFF', borderRadius: '12px', padding: '20px 24px', border: '1px solid #E5E7EB', marginBottom: '20px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#5B5CEB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("line", { x1: "18", y1: "20", x2: "18", y2: "10" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "20", x2: "12", y2: "4" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", y1: "20", x2: "6", y2: "14" }), (0, jsx_runtime_1.jsx)("line", { x1: "2", y1: "20", x2: "22", y2: "20" })] }), "Ph\u00E2n b\u1ED1 theo th\u00E1ng"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '8px', alignItems: 'flex-end' }, children: monthStats.map((count, i) => ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: '12px', fontWeight: 600, color: count > 0 ? '#5B5CEB' : '#D1D5DB', marginBottom: '4px' }, children: count }), (0, jsx_runtime_1.jsx)("div", { style: { height: `${Math.max(6, (count / maxMonth) * 48)}px`, background: count > 0 ? 'linear-gradient(180deg,#818CF8,#5B5CEB)' : '#F3F4F6', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' } }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '11px', color: '#9CA3AF', marginTop: '4px', fontWeight: 500 }, children: MONTHS[i] })] }, i))) })] }), selectionMode && ((0, jsx_runtime_1.jsx)(BulDeleteBar_1.default, { count: selectedIds.length, onDelete: handleBulkDelete, onCancel: () => { setSelectionMode(false); setSelectedIds([]); } })), (0, jsx_runtime_1.jsxs)("div", { style: { background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { padding: '14px 16px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(SortingToolbar_1.default, { sortBy: sortBy, setSortBy: setSortBy }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => { setSelectionMode(!selectionMode); setSelectedIds([]); }, style: {
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '7px 14px', borderRadius: '8px',
                                    border: selectionMode ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                                    background: selectionMode ? '#FEE2E2' : '#FFFFFF',
                                    color: selectionMode ? '#DC2626' : '#6B7280',
                                    fontWeight: 500, fontSize: '13px', cursor: 'pointer',
                                    flexShrink: 0,
                                }, children: [(0, jsx_runtime_1.jsx)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: selectionMode
                                            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] })
                                            : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M9 3h6l1 1h4v2H4V4h4z" }), (0, jsx_runtime_1.jsx)("path", { d: "M5 7l1 14h12l1-14" })] }) }), selectionMode ? 'Huỷ' : 'Xóa'] })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'grid', gridTemplateColumns: gridCols, background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }, children: COLS.map(col => ((0, jsx_runtime_1.jsx)("div", { style: {
                                padding: col.key === 'xong' ? '10px 0' : '10px 8px',
                                fontSize: '11px', fontWeight: 600, color: '#6B7280',
                                letterSpacing: '0.05em',
                                textAlign: col.key === 'xong' ? 'center' : 'left',
                                borderRight: col.key !== 'actions' ? '1px solid #F3F4F6' : 'none',
                            }, children: col.label }, col.key))) }), tasksForYear.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', padding: '60px 20px' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "#D1D5DB", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", style: { marginBottom: '12px' }, children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: '14px', color: '#9CA3AF', margin: 0 }, children: ["Kh\u00F4ng c\u00F3 nhi\u1EC7m v\u1EE5 n\u00E0o trong n\u0103m ", selectedYear] })] })) : (tasksForYear.map(task => ((0, jsx_runtime_1.jsx)(TaskYearCard_1.default, { task: task, selectionMode: selectionMode, selected: selectedIds.includes(task.id), onToggle: toggleTask, onToggleStatus: handleToggleStatus, onEdit: handleEditTask }, task.id))))] })] }));
};
exports.default = YCalendar;
