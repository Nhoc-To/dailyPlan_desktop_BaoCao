"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const BulkDeleteBar = ({ count, onDelete, onCancel }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
            border: '1px solid #ECECF7'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    fontWeight: 600,
                    color: '#374151'
                }, children: ["\u0110\u00E3 ch\u1ECDn ", count, " nhi\u1EC7m v\u1EE5"] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: '12px'
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: onCancel, style: {
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            cursor: 'pointer',
                            background: '#E5E7EB',
                            color: '#374151',
                            fontWeight: 600
                        }, children: "Hu\u1EF7" }), (0, jsx_runtime_1.jsxs)("button", { onClick: onDelete, disabled: count === 0, style: {
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            cursor: count === 0
                                ? 'not-allowed'
                                : 'pointer',
                            background: count === 0
                                ? '#FCA5A5'
                                : '#EF4444',
                            color: '#FFFFFF',
                            fontWeight: 600
                        }, children: ["\uD83D\uDDD1 Xo\u00E1 (", count, ")"] })] })] }));
};
exports.default = BulkDeleteBar;
