"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Sidebar_1 = __importDefault(require("../components/Sidebar"));
// import WeeklyOverviewScreen from './WeeklyOverviewScreen';
// import CalendarScreen from './CalendarScreen';
// import YearlyTasksScreen from './YearlyTasksScreen';
// import StatsScreen from './StatsScreen';
const TaskEditorScreen_1 = __importDefault(require("./TaskEditorScreen"));
const App = () => {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const fetchTasks = async () => {
        try {
            if (window.api && window.api.tasks) {
                const data = await window.api.tasks.fetchAll();
                setTasks(data);
            }
        }
        catch (e) {
            console.error('Lỗi khi fetch tasks:', e);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchTasks();
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "app-layout", children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "main-content", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/editor", element: (0, jsx_runtime_1.jsx)(TaskEditorScreen_1.default, { onTaskUpdated: fetchTasks }) }) }) })] }) }));
};
exports.default = App;
