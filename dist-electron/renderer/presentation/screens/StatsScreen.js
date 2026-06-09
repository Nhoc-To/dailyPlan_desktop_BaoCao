"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const recharts_1 = require("recharts");
const COLORS = ['#22c55e', '#ef4444'];
const StatsScreen = ({ tasks = [] }) => {
    const completedTasks = (0, react_1.useMemo)(() => {
        return tasks.filter(task => task.status === true).length;
    }, [tasks]);
    const pendingTasks = tasks.length - completedTasks;
    const pieData = [
        { name: 'Đã hoàn thành', value: completedTasks },
        { name: 'Chưa hoàn thành', value: pendingTasks }
    ];
    const categoryData = (0, react_1.useMemo)(() => {
        const categoryMap = {};
        tasks.forEach(task => {
            const category = task.categoryId
                ? `Loại ${task.categoryId}`
                : 'Chưa phân loại';
            categoryMap[category] =
                (categoryMap[category] || 0) + 1;
        });
        return Object.entries(categoryMap).map(([key, value]) => ({
            category: key,
            tasks: value
        }));
    }, [tasks]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '28px' }, children: [(0, jsx_runtime_1.jsx)("h1", { style: {
                    fontSize: '32px',
                    fontWeight: 700,
                    marginBottom: '24px'
                }, children: "\uD83D\uDCCA Th\u1ED1ng k\u00EA t\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '36px',
                    flexWrap: 'wrap'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            background: '#e0f2fe',
                            padding: '20px',
                            borderRadius: '16px',
                            minWidth: '180px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "T\u1ED5ng t\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '28px', fontWeight: 700 }, children: tasks.length })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            background: '#dcfce7',
                            padding: '20px',
                            borderRadius: '16px',
                            minWidth: '180px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0110\u00E3 ho\u00E0n th\u00E0nh" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '28px', fontWeight: 700 }, children: completedTasks })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            background: '#fee2e2',
                            padding: '20px',
                            borderRadius: '16px',
                            minWidth: '180px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Ch\u01B0a ho\u00E0n th\u00E0nh" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '28px', fontWeight: 700 }, children: pendingTasks })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: '32px',
                    flexWrap: 'wrap'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            width: 420,
                            height: 360,
                            background: 'white',
                            padding: '20px',
                            borderRadius: '18px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "T\u1EF7 l\u1EC7 ho\u00E0n th\u00E0nh c\u00F4ng vi\u1EC7c" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "85%", children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: pieData, dataKey: "value", outerRadius: 100, label: true, children: pieData.map((_, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[index] }, index))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {})] }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            width: 540,
                            height: 360,
                            background: 'white',
                            padding: '20px',
                            borderRadius: '18px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Th\u1ED1ng k\u00EA theo lo\u1EA1i t\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "85%", children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: categoryData, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "category" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { allowDecimals: false }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "tasks", name: "S\u1ED1 t\u00E1c v\u1EE5", fill: "#3b82f6" })] }) })] })] })] }));
};
exports.default = StatsScreen;
