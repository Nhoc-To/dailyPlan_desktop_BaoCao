"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const recharts_1 = require("recharts");
const pieData = [
    { name: 'Học tập', value: 400, color: '#ff5252' },
    { name: 'Khác', value: 300, color: '#f0f2f5' },
];
const barData = [
    { name: 'T2', pt: 80 }, { name: 'T3', pt: 60 }, { name: 'T4', pt: 40 },
    { name: 'T5', pt: 20 }, { name: 'T6', pt: 90 }, { name: 'T7', pt: 50 }, { name: 'CN', pt: 100 }
];
const TaskEditorAndStats = ({ tasks, onTaskUpdated }) => {
    const [taskName, setTaskName] = (0, react_1.useState)('');
    const handleCreate = async () => {
        if (!taskName)
            return;
        if (window.api && window.api.tasks) {
            await window.api.tasks.create({
                categoryId: 1,
                name: taskName,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
                status: false
            });
            setTaskName('');
            onTaskUpdated();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '20px', width: '100%', alignItems: 'stretch' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "card", style: { flex: '0 0 250px' }, children: [(0, jsx_runtime_1.jsx)("h3", { style: { borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }, children: "T\u00EAn t\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Nh\u1EADp t\u00EAn...", value: taskName, onChange: (e) => setTaskName(e.target.value), style: { padding: '8px', border: '1px solid #ccc' } }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "M\u00F4 t\u1EA3", style: { padding: '8px', border: '1px solid #ccc' } }), (0, jsx_runtime_1.jsx)("input", { type: "date", style: { padding: '8px', border: '1px solid #ccc' } }), (0, jsx_runtime_1.jsx)("input", { type: "date", style: { padding: '8px', border: '1px solid #ccc' } }), (0, jsx_runtime_1.jsx)("button", { className: "btn-primary", onClick: handleCreate, children: "L\u01B0u T\u00E1c V\u1EE5" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "card", style: { flex: '0 0 250px', backgroundColor: '#0052cc', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)("h3", { children: "Xem tr\u01B0\u1EDBc t\u00E1c v\u1EE5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "stats-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chart-card", children: [(0, jsx_runtime_1.jsx)("h4", { style: { textAlign: 'center' }, children: "Kh\u1ED1i l\u01B0\u1EE3ng c\u00F4ng vi\u1EC7c" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 200, children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 60, children: pieData.map((entry, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: entry.color }, `cell-${index}`))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chart-card", children: [(0, jsx_runtime_1.jsx)("h4", { style: { textAlign: 'center' }, children: "Ti\u1EBFn \u0111\u1ED9 ho\u00E0n th\u00E0nh" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 200, children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: barData, layout: "vertical", margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { type: "number" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { dataKey: "name", type: "category" }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "pt", fill: "#448aff" })] }) })] })] })] }));
};
exports.default = TaskEditorAndStats;
