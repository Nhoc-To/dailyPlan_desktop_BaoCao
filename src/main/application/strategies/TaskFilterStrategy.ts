import { Task } from '../../../shared/domain/entities';

export interface TaskFilterStrategy {
  filter(tasks: Task[]): Task[];
}

// Strategy lọc theo trạng thái
export class StatusFilterStrategy implements TaskFilterStrategy {
  constructor(private status: boolean) {}

  filter(tasks: Task[]): Task[] {
    return tasks.filter((t) => t.status === this.status);
  }
}

// Strategy lọc theo thời gian (Hôm nay, trong tuần v.v)
export class DateFilterStrategy implements TaskFilterStrategy {
  constructor(private targetDate: string) {}

  filter(tasks: Task[]): Task[] {
    // Demo đơn giản lọc theo ngày bắt đầu chính xác
    return tasks.filter((t) => t.startDate.startsWith(this.targetDate));
  }
}

// Strategy không lọc
export class NullFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }
}
