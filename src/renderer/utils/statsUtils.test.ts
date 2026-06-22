import { countTaskStatus, countTasksByCategory } from './statsUtils';

describe('Stats Utils', () => {

  test('đếm số task hoàn thành và chưa hoàn thành', () => {
    const tasks = [
      { status: true },
      { status: false },
      { status: true }
    ];

    expect(countTaskStatus(tasks)).toEqual({
      total: 3,
      completed: 2,
      pending: 1
    });
  });

  test('danh sách rỗng trả về 0', () => {
    expect(countTaskStatus([])).toEqual({
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

    expect(countTasksByCategory(tasks)).toEqual({
      'Loại 1': 2,
      'Loại 2': 1,
      'Chưa phân loại': 1
    });
  });

  test('tất cả task đều đã hoàn thành', () => {
    const tasks = [
      { status: true },
      { status: true },
      { status: true }
    ];

    expect(countTaskStatus(tasks)).toEqual({
      total: 3,
      completed: 3,
      pending: 0
    });
  });

  test('tất cả task đều chưa hoàn thành', () => {
    const tasks = [
      { status: false },
      { status: false }
    ];

    expect(countTaskStatus(tasks)).toEqual({
      total: 2,
      completed: 0,
      pending: 2
    });
  });

});