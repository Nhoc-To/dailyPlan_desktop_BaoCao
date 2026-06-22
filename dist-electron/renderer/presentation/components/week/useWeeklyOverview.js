"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWeeklyOverview = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const weeklyHelpers_1 = require("./weeklyHelpers");
const useWeeklyOverview = (tasks, onTaskUpdated) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [currentDate, setCurrentDate] = (0, react_1.useState)(new Date());
    const [selectedDay, setSelectedDay] = (0, react_1.useState)(null);
    const [selectedTask, setSelectedTask] = (0, react_1.useState)(null);
    const [selectedTaskDateStr, setSelectedTaskDateStr] = (0, react_1.useState)('');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const tasksByDateStr = (0, react_1.useMemo)(() => (0, weeklyHelpers_1.buildTasksByDateStr)(tasks), [tasks]);
    const currentWeekDays = (0, react_1.useMemo)(() => {
        return (0, weeklyHelpers_1.getWeekDays)(selectedDay || new Date());
    }, [selectedDay]);
    const getTasksForDate = (date) => {
        return tasksByDateStr.get((0, weeklyHelpers_1.formatDateStr)(date)) || [];
    };
    const hasTasks = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return tasksByDateStr.has(dateStr);
    };
    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleGoToday = () => {
        const today = new Date();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDay(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    };
    const handleSelectDay = (day) => {
        setSelectedDay(new Date(year, month, day));
    };
    const handleEdit = (task) => {
        navigate('/editor', { state: { task } });
    };
    const handleDelete = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            if (window.api?.tasks) {
                await window.api.tasks.delete(id);
                onTaskUpdated?.();
            }
        }
    };
    const handleToggleStatus = async (task, dateStr) => {
        if (!window.api?.tasks)
            return;
        let completedDays = [];
        try {
            completedDays = JSON.parse(task.completedDays || '[]');
        }
        catch { }
        const newCompletedDays = completedDays.includes(dateStr)
            ? completedDays.filter(d => d !== dateStr)
            : [...completedDays, dateStr];
        const sd = new Date(task.startDate);
        const ed = new Date(task.endDate || task.startDate);
        const totalDays = Math.round((ed.getTime() - sd.getTime()) / (1000 * 3600 * 24)) + 1;
        const newStatus = newCompletedDays.length >= totalDays;
        await window.api.tasks.update(task.id, {
            completedDays: JSON.stringify(newCompletedDays),
            status: newStatus,
        });
        onTaskUpdated?.();
    };
    const handleOpenTaskDetail = (task, dateStr) => {
        setSelectedTask(task);
        setSelectedTaskDateStr(dateStr);
    };
    const handleCloseTaskDetail = () => {
        setSelectedTask(null);
        setSelectedTaskDateStr('');
    };
    return {
        currentDate,
        selectedDay,
        currentWeekDays,
        year,
        month,
        selectedTask,
        selectedTaskDateStr,
        getTasksForDate,
        hasTasks,
        handlePrevMonth,
        handleNextMonth,
        handleGoToday,
        handleSelectDay,
        handleEdit,
        handleDelete,
        handleToggleStatus,
        handleOpenTaskDetail,
        handleCloseTaskDetail,
    };
};
exports.useWeeklyOverview = useWeeklyOverview;
