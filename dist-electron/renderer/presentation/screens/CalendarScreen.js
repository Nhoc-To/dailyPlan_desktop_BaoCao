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
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(undefined); // THÊM state
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const tasksByDate = (0, usemonthTask_1.default)(tasks, year, month);
    const prevMonth = (e) => {
        e.stopPropagation();
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(undefined); // Reset selected date khi chuyển tháng
    };
    const nextMonth = (e) => {
        e.stopPropagation();
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(undefined); // Reset selected date khi chuyển tháng
    };
    const goToday = () => {
        const today = new Date();
        setCurrentDate(today);
        // Set selected date to today
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        setSelectedDate(todayStr);
    };
    // CHỈ mở form tạo task khi double-click hoặc có nút thêm
    const handleDayDoubleClick = (date, e) => {
        e.stopPropagation();
        navigate('/editor', {
            state: {
                task: {
                    startDate: date,
                    endDate: date
                }
            }
        });
    };
    // Chọn ngày (không mở form)
    const handleSelectDay = (date) => {
        setSelectedDate(date);
    };
    const handleEdit = (task) => {
        navigate('/editor', {
            state: { task }
        });
    };
    const handleDelete = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            if (window.api?.tasks) {
                await window.api.tasks.delete(id);
                onTaskUpdated?.();
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '24px', height: '100%', width: '100%' }, children: [(0, jsx_runtime_1.jsx)(monthSidebar_1.default, { year: year, month: month, tasksByDate: tasksByDate, prevMonth: prevMonth, nextMonth: nextMonth, onDayClick: handleDayDoubleClick, onSelectDay: handleSelectDay, selectedDate: selectedDate }), (0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: { flex: 1, padding: '24px' }, children: [(0, jsx_runtime_1.jsx)(monthHeader_1.default, { month: month, year: year, goToday: goToday, onPrevMonth: prevMonth, onNextMonth: nextMonth }), (0, jsx_runtime_1.jsx)(monthGrid_1.default, { year: year, month: month, tasksByDate: tasksByDate, onDayClick: handleSelectDay, onEdit: handleEdit, onDelete: handleDelete, selectedDate: selectedDate })] })] }));
};
exports.default = CalendarScreen;
