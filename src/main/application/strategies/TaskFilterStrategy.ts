import { Task } from "../services/TaskService";

export interface TaskFilterStrategy {
  filter(tasks: Task[]): Task[];
}

// Strategy lọc theo trạng thái
export class StatusFilterStrategy implements TaskFilterStrategy {
  private status: string;

  constructor(status: string) {
    this.status = status;
  }

  filter(tasks: Task[]): Task[] {
    return tasks.filter((t) => t.status === this.status);
  }
}

// Strategy lọc theo thời gian (Hôm nay, trong tuần v.v)
export class DateFilterStrategy implements TaskFilterStrategy {
  private targetDate: string;

  constructor(targetDate: string) {
    this.targetDate = targetDate;
  }

  filter(tasks: Task[]): Task[] {
    // Demo đơn giản lọc theo ngày bắt đầu chính xác
    return tasks.filter((t) => (t.startDate as string).startsWith(this.targetDate));
  }
}

// Strategy không lọc
export class NullFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }
}