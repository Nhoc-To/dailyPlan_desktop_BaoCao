"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const MonthHeader = ({ month, year, goToday, onPrevMonth, onNextMonth }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: onPrevMonth, style: {
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-bg)',
                            cursor: 'pointer'
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { size: 20 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: onNextMonth, style: {
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-bg)',
                            cursor: 'pointer'
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { size: 20 }) })] }), (0, jsx_runtime_1.jsxs)("h2", { style: { margin: 0, color: 'var(--primary-color)' }, children: ["Th\u00E1ng ", month + 1, ", ", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: goToday, style: {
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--primary-color)',
                    background: 'transparent',
                    color: 'var(--primary-color)',
                    cursor: 'pointer'
                }, children: "H\u00F4m nay" })] }));
};
exports.default = MonthHeader;
