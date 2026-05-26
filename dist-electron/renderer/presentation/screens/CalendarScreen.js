"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const monthSidebar_1 = __importDefault(require("../components/month/monthSidebar"));
const monthHeader_1 = __importDefault(require("../components/month/monthHeader"));
const monthGrid_1 = __importDefault(require("../components/month/monthGrid"));
const usemonthTask_1 = __importDefault(require("../components/month/usemonthTask"));
const CalendarScreen = ({ tasks, onTaskUpdated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [currentDate, setCurrentDate] = (0, react_1.useState)(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const tasksByDate = (0, usemonthTask_1.default)(tasks, year, month);
    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };
    const goToday = () => {
        setCurrentDate(new Date());
    };
    const handleDayClick = (date) => {
        navigate('/editor', {
            state: {
                task: {
                    startDate: date,
                    endDate: date
                }
            }
        });
    };
    const handleEdit = (task) => {
        navigate('/editor', {
            state: {
                task
            }
        });
    };
    const handleDelete = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            if (window.api?.tasks) {
                await window
                    .api
                    .tasks
                    .delete(id);
                onTaskUpdated?.();
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'flex',
            gap: '24px',
            height: '100%',
            width: '100%'
        }, children: [(0, jsx_runtime_1.jsx)(monthSidebar_1.default, { year: year, month: month, tasksByDate: tasksByDate, prevMonth: prevMonth, nextMonth: nextMonth, onDayClick: handleDayClick }), (0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: {
                    flex: 1,
                    padding: '24px'
                }, children: [(0, jsx_runtime_1.jsx)(monthHeader_1.default, { month: month, year: year, goToday: goToday }), (0, jsx_runtime_1.jsx)(monthGrid_1.default, { year: year, month: month, tasksByDate: tasksByDate, onDayClick: handleDayClick, onEdit: handleEdit, onDelete: handleDelete })] })] }));
};
exports.default = CalendarScreen;
