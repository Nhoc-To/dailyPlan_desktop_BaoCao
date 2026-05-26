"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MonthHeader = ({ month, year, goToday }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        }, children: [(0, jsx_runtime_1.jsxs)("h2", { style: {
                    margin: 0,
                    color: 'var(--primary-color)'
                }, children: ["L\u1ECBch Th\u00E1ng ", month + 1, ", ", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: goToday, style: {
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--primary-color)',
                    background: 'transparent',
                    color: 'var(--primary-color)',
                    fontWeight: 600,
                    cursor: 'pointer'
                }, children: "H\u00F4m nay" })] }));
};
exports.default = MonthHeader;
