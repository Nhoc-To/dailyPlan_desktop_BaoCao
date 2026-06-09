"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SORTS = [
    {
        key: 'date',
        icon: '📅',
        label: 'Ngày gần nhất',
        desc: 'Mới tạo lên trên'
    },
    {
        key: 'duration',
        icon: '⏳',
        label: 'Sắp đến hạn',
        desc: 'Hạn chót gần nhất'
    },
    {
        key: 'name',
        icon: '🔤',
        label: 'Tên A–Z',
        desc: 'Theo bảng chữ cái'
    }
];
const SortingToolbar = ({ sortBy, setSortBy }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px 22px',
            marginBottom: '24px',
            boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
            border: '1px solid #ECECF7'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    marginBottom: '14px',
                    fontWeight: 700,
                    color: '#374151',
                    fontSize: '15px'
                }, children: "\uD83D\uDDC2 S\u1EAFp x\u1EBFp nhi\u1EC7m v\u1EE5" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                }, children: SORTS.map(({ key, icon, label, desc }) => {
                    const active = sortBy === key;
                    return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSortBy(key), style: {
                            padding: '12px 20px',
                            borderRadius: '16px',
                            border: active
                                ? '2px solid #5B5CEB'
                                : '2px solid #ECECF7',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '14px',
                            transition: 'all 0.18s ease',
                            background: active ? '#5B5CEB' : '#F5F6FF',
                            color: active ? '#FFFFFF' : '#5B5CEB',
                            boxShadow: active
                                ? '0 4px 14px rgba(91,92,235,0.28)'
                                : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '2px',
                            minWidth: '140px'
                        }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '15px' }, children: [icon, " ", label] }), (0, jsx_runtime_1.jsx)("span", { style: {
                                    fontSize: '11px',
                                    fontWeight: 400,
                                    opacity: active ? 0.85 : 0.6
                                }, children: desc })] }, key));
                }) })] }));
};
exports.default = SortingToolbar;
