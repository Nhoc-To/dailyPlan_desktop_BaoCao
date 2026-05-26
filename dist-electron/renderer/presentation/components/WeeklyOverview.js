"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MiniCalendar_1 = __importDefault(require("./week/MiniCalendar"));
const WeekDayCell_1 = __importDefault(require("./week/WeekDayCell"));
const TaskDetailModal_1 = __importDefault(require("./week/TaskDetailModal"));
const useWeeklyOverview_1 = require("./week/useWeeklyOverview");
const weeklyHelpers_1 = require("./week/weeklyHelpers");
const WeeklyOverview = ({ tasks, onTaskUpdated }) => {
    const { selectedDay, currentWeekDays, year, month, selectedTask, selectedTaskDateStr, getTasksForDate, hasTasks, handlePrevMonth, handleNextMonth, handleGoToday, handleSelectDay, handleEdit, handleDelete, handleToggleStatus, handleOpenTaskDetail, handleCloseTaskDetail, } = (0, useWeeklyOverview_1.useWeeklyOverview)(tasks, onTaskUpdated);
    const today = new Date();
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { margin: 0, color: 'var(--text-main)' }, children: "K\u1EBF ho\u1EA1ch Tu\u1EA7n" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleGoToday, style: {
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--primary-color)',
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }, children: "H\u00F4m nay" })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: '24px',
                    flex: 1,
                    width: '100%',
                }, children: [(0, jsx_runtime_1.jsx)(MiniCalendar_1.default, { year: year, month: month, selectedDay: selectedDay, hasTasks: hasTasks, onPrevMonth: handlePrevMonth, onNextMonth: handleNextMonth, onGoToday: handleGoToday, onSelectDay: handleSelectDay }), currentWeekDays.map((d, idx) => ((0, jsx_runtime_1.jsx)(WeekDayCell_1.default, { title: weeklyHelpers_1.WEEK_DAYS[idx], date: d, tasks: getTasksForDate(d), isSelected: selectedDay?.toDateString() === d.toDateString(), isToday: today.toDateString() === d.toDateString(), onToggleTask: handleToggleStatus, onEditTask: handleEdit, onDeleteTask: handleDelete, onTaskClick: handleOpenTaskDetail }, idx)))] }), (0, jsx_runtime_1.jsx)(TaskDetailModal_1.default, { task: selectedTask, dateStr: selectedTaskDateStr, isCompleted: selectedTask
                    ? (0, weeklyHelpers_1.isTaskCompletedOnDate)(selectedTask, selectedTaskDateStr)
                    : false, onClose: handleCloseTaskDetail, onToggle: () => {
                    if (selectedTask) {
                        handleToggleStatus(selectedTask, selectedTaskDateStr);
                    }
                } })] }));
};
exports.default = WeeklyOverview;
