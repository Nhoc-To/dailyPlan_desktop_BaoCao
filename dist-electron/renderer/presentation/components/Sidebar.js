"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const Sidebar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "sidebar glass", children: [(0, jsx_runtime_1.jsx)("h2", { children: "DailyPlan" }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: "/", className: ({ isActive }) => isActive ? 'active' : '', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CalendarDays, { size: 20 }), (0, jsx_runtime_1.jsx)("span", { children: "L\u1ECBch tu\u1EA7n" })] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: "/calendar", className: ({ isActive }) => isActive ? 'active' : '', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 20 }), (0, jsx_runtime_1.jsx)("span", { children: "L\u1ECBch th\u00E1ng" })] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: "/yearly", className: ({ isActive }) => isActive ? 'active' : '', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ListTodo, { size: 20 }), (0, jsx_runtime_1.jsx)("span", { children: "Nhi\u1EC7m v\u1EE5 n\u0103m" })] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: "/stats", className: ({ isActive }) => isActive ? 'active' : '', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, { size: 20 }), (0, jsx_runtime_1.jsx)("span", { children: "Th\u1ED1ng k\u00EA" })] }), (0, jsx_runtime_1.jsx)("div", { className: "create-btn-wrapper", children: (0, jsx_runtime_1.jsxs)("button", { className: "btn-floating-primary", onClick: () => navigate('/editor'), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { size: 20 }), "T\u1EA1o t\u00E1c v\u1EE5"] }) })] }));
};
exports.default = Sidebar;
