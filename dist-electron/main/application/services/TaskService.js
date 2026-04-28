"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const TaskFilterStrategy_1 = require("../strategies/TaskFilterStrategy");
class TaskService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async fetchAllTasks(strategy = new TaskFilterStrategy_1.NullFilterStrategy()) {
        const allTasks = await this.repository.getAllTasks();
        return strategy.filter(allTasks); // Áp dụng Strategy pattern để lọc dữ liệu nếu cần
    }
    async fetchTaskDetails(id) {
        return this.repository.getTaskById(id);
    }
    async createNewTask(taskInfo) {
        // Các logic validation có thể đặt ở đây
        return this.repository.createTask(taskInfo);
    }
    async updateExistingTask(id, updates) {
        return this.repository.updateTask(id, updates);
    }
    async removeTask(id) {
        return this.repository.deleteTask(id);
    }
}
exports.TaskService = TaskService;
