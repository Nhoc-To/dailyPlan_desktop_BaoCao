"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTasksByCategory = exports.countTaskStatus = void 0;
const countTaskStatus = (tasks) => {
    const completed = tasks.filter(task => task.status === true).length;
    const pending = tasks.length - completed;
    return {
        total: tasks.length,
        completed,
        pending
    };
};
exports.countTaskStatus = countTaskStatus;
const countTasksByCategory = (tasks) => {
    const result = {};
    tasks.forEach(task => {
        const key = task.categoryId ? `Loại ${task.categoryId}` : 'Chưa phân loại';
        result[key] = (result[key] || 0) + 1;
    });
    return result;
};
exports.countTasksByCategory = countTasksByCategory;
