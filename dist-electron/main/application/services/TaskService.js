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
        const allTasks = this.repository.findAll();
        return strategy.filter(allTasks); // Áp dụng Strategy pattern để lọc dữ liệu nếu cần
    }
    async fetchTaskDetails(id) {
        return this.repository.findById(id);
    }
    async createNewTask(taskInfo) {
        // Các logic validation có thể đặt ở đây
        return this.repository.create(taskInfo);
    }
    async updateExistingTask(id, updates) {
        return this.repository.update(id, updates);
    }
    async removeTask(id) {
        return this.repository.delete(id);
    }
}
exports.TaskService = TaskService;
