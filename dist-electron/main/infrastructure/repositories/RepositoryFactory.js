"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const SqliteTaskRepository_1 = require("./SqliteTaskRepository");
class RepositoryFactory {
    // Lấy ra Repository tuỳ thuộc cấu hình tương lai (nếu đổi sang dùng MongoDB/JSON, cấu hình trong Factory này)
    static getTaskRepository() {
        return new SqliteTaskRepository_1.SqliteTaskRepository();
    }
}
exports.RepositoryFactory = RepositoryFactory;
