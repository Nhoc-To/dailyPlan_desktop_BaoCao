"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullFilterStrategy = exports.DateFilterStrategy = exports.StatusFilterStrategy = void 0;
// Strategy lọc theo trạng thái
class StatusFilterStrategy {
    status;
    constructor(status) {
        this.status = status;
    }
    filter(tasks) {
        return tasks.filter((t) => t.status === this.status);
    }
}
exports.StatusFilterStrategy = StatusFilterStrategy;
// Strategy lọc theo thời gian (Hôm nay, trong tuần v.v)
class DateFilterStrategy {
    targetDate;
    constructor(targetDate) {
        this.targetDate = targetDate;
    }
    filter(tasks) {
        // Demo đơn giản lọc theo ngày bắt đầu chính xác
        return tasks.filter((t) => t.startDate.startsWith(this.targetDate));
    }
}
exports.DateFilterStrategy = DateFilterStrategy;
// Strategy không lọc
class NullFilterStrategy {
    filter(tasks) {
        return tasks;
    }
}
exports.NullFilterStrategy = NullFilterStrategy;
