"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const BulkDeleteBar = ({ count, onDelete, onCancel }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: '#FEF2F2',
            borderRadius: '10px',
            padding: '12px 18px',
            marginBottom: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #FECACA',
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#DC2626' }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#DC2626", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M9 3h6l1 1h4v2H4V4h4z" }), (0, jsx_runtime_1.jsx)("path", { d: "M5 7l1 14h12l1-14" }), (0, jsx_runtime_1.jsx)("line", { x1: "10", y1: "11", x2: "10", y2: "17" }), (0, jsx_runtime_1.jsx)("line", { x1: "14", y1: "11", x2: "14", y2: "17" })] }), "\u0110\u00E3 ch\u1ECDn ", count, " nhi\u1EC7m v\u1EE5"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px' }, children: [(0, jsx_runtime_1.jsxs)("button", { onClick: onCancel, style: {
                            display: 'flex', alignItems: 'center', gap: '5px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '8px', padding: '7px 14px',
                            cursor: 'pointer', background: '#FFFFFF',
                            color: '#374151', fontWeight: 500, fontSize: '13px'
                        }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }), "Hu\u1EF7"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: onDelete, disabled: count === 0, style: {
                            display: 'flex', alignItems: 'center', gap: '5px',
                            border: 'none', borderRadius: '8px', padding: '7px 14px',
                            cursor: count === 0 ? 'not-allowed' : 'pointer',
                            background: count === 0 ? '#FCA5A5' : '#EF4444',
                            color: '#FFFFFF', fontWeight: 600, fontSize: '13px'
                        }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M9 3h6l1 1h4v2H4V4h4z" }), (0, jsx_runtime_1.jsx)("path", { d: "M5 7l1 14h12l1-14" })] }), "Xo\u00E1 (", count, ")"] })] })] }));
};
exports.default = BulkDeleteBar;
