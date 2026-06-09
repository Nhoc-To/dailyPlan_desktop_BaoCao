"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SummaryBox = ({ tasks }) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status).length;
    const overdue = tasks.filter(task => {
        if (task.status)
            return false;
        return (new Date(task.endDate).getTime() <
            Date.now());
    }).length;
    const active = total -
        completed -
        overdue;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '20px',
            marginBottom: '30px'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
                    border: '1px solid #ECECF7'
                }, children: [(0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#6B7280',
                            margin: 0,
                            fontSize: '14px'
                        }, children: "T\u1ED5ng nhi\u1EC7m v\u1EE5" }), (0, jsx_runtime_1.jsx)("h2", { style: {
                            color: '#5B5CEB',
                            marginTop: '10px',
                            marginBottom: 0,
                            fontSize: '32px',
                            fontWeight: 700
                        }, children: total })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
                    border: '1px solid #ECECF7'
                }, children: [(0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#6B7280',
                            margin: 0,
                            fontSize: '14px'
                        }, children: "\u0110ang th\u1EF1c hi\u1EC7n" }), (0, jsx_runtime_1.jsx)("h2", { style: {
                            color: '#5B5CEB',
                            marginTop: '10px',
                            marginBottom: 0,
                            fontSize: '32px',
                            fontWeight: 700
                        }, children: active })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
                    border: '1px solid #ECECF7'
                }, children: [(0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#6B7280',
                            margin: 0,
                            fontSize: '14px'
                        }, children: "Ho\u00E0n th\u00E0nh" }), (0, jsx_runtime_1.jsx)("h2", { style: {
                            color: '#22C55E',
                            marginTop: '10px',
                            marginBottom: 0,
                            fontSize: '32px',
                            fontWeight: 700
                        }, children: completed })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
                    border: '1px solid #ECECF7'
                }, children: [(0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#6B7280',
                            margin: 0,
                            fontSize: '14px'
                        }, children: "Qu\u00E1 h\u1EA1n" }), (0, jsx_runtime_1.jsx)("h2", { style: {
                            color: '#EF4444',
                            marginTop: '10px',
                            marginBottom: 0,
                            fontSize: '32px',
                            fontWeight: 700
                        }, children: overdue })] })] }));
};
exports.default = SummaryBox;
