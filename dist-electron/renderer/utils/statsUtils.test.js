"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statsUtils_1 = require("./statsUtils");
describe('Stats Utils', () => {
    test('đếm số task hoàn thành và chưa hoàn thành', () => {
        const tasks = [
            { status: true },
            { status: false },
            { status: true }
        ];
        expect((0, statsUtils_1.countTaskStatus)(tasks)).toEqual({
            total: 3,
            completed: 2,
            pending: 1
        });
    });
    test('danh sách rỗng trả về 0', () => {
        expect((0, statsUtils_1.countTaskStatus)([])).toEqual({
            total: 0,
            completed: 0,
            pending: 0
        });
    });
    test('đếm số task theo category', () => {
        const tasks = [
            { categoryId: 1 },
            { categoryId: 1 },
            { categoryId: 2 },
            { categoryId: null }
        ];
        expect((0, statsUtils_1.countTasksByCategory)(tasks)).toEqual({
            'Loại 1': 2,
            'Loại 2': 1,
            'Chưa phân loại': 1
        });
    });
});
