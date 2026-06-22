"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SortingToolbar = ({ sortBy, setSortBy }) => {
    const options = [
        {
            key: 'date',
            label: 'Bắt đầu gần nhất',
            icon: ((0, jsx_runtime_1.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] })),
        },
        {
            key: 'duration',
            label: 'Sắp đến hạn',
            icon: ((0, jsx_runtime_1.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }), (0, jsx_runtime_1.jsx)("polyline", { points: "12 6 12 12 16 14" })] })),
        },
        {
            key: 'name',
            label: 'Tên A–Z',
            icon: ((0, jsx_runtime_1.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "12", x2: "15", y2: "12" }), (0, jsx_runtime_1.jsx)("line", { x1: "3", y1: "18", x2: "9", y2: "18" })] })),
        },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '13px', color: '#6B7280', fontWeight: 500, marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#6B7280", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("line", { x1: "4", y1: "6", x2: "20", y2: "6" }), (0, jsx_runtime_1.jsx)("line", { x1: "8", y1: "12", x2: "16", y2: "12" }), (0, jsx_runtime_1.jsx)("line", { x1: "11", y1: "18", x2: "13", y2: "18" })] }), "S\u1EAFp x\u1EBFp:"] }), options.map(opt => {
                const active = sortBy === opt.key;
                return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSortBy(opt.key), style: {
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: active ? '1.5px solid #5B5CEB' : '1.5px solid #E5E7EB',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '13px',
                        background: active ? '#EEF2FF' : '#FFFFFF',
                        color: active ? '#5B5CEB' : '#374151',
                        transition: 'all 0.15s',
                    }, children: [opt.icon, opt.label] }, opt.key));
            })] }));
};
exports.default = SortingToolbar;
