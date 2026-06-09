"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SortingToolbar = ({ sortBy, setSortBy }) => {
    const buttonStyle = (active) => ({
        padding: '12px 22px',
        borderRadius: '14px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        transition: '0.2s',
        background: active
            ? '#5B5CEB'
            : '#F5F6FF',
        color: active
            ? '#FFFFFF'
            : '#5B5CEB',
        boxShadow: active
            ? '0 4px 12px rgba(91,92,235,0.25)'
            : 'none'
    });
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px',
            marginBottom: '24px',
            boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
            border: '1px solid #ECECF7'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    marginBottom: '14px',
                    fontWeight: 600,
                    color: '#374151'
                }, children: "S\u1EAFp x\u1EBFp nhi\u1EC7m v\u1EE5" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setSortBy('date'), style: buttonStyle(sortBy === 'date'), children: "\uD83D\uDCC5 Ng\u00E0y g\u1EA7n nh\u1EA5t" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSortBy('duration'), style: buttonStyle(sortBy === 'duration'), children: "\u23F3 S\u1EAFp \u0111\u1EBFn h\u1EA1n" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setSortBy('name'), style: buttonStyle(sortBy === 'name'), children: "\uD83D\uDD24 T\u00EAn A-Z" })] })] }));
};
exports.default = SortingToolbar;
