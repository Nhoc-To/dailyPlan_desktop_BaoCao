export interface Category {
    id: number;
    name: string;
    color: string;
    status: boolean;
}

export interface Task {
    id: number;
    categoryId: number;
    name: string;
    description?: string;
    repeat?: string;
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    tags?: string;
    color?: string;
    completedDays?: string;
    status: boolean;
}

export interface Note {
    id: number;
    taskId: number;
    content: string;
}

export interface Reminder {
    id: number;
    taskId: number;
    time: string;
}

export interface Student {
    id: number;
    name: string;
    fullName: string;
    gender: string;
    phone: string;
    email: string;
    status: string;
}