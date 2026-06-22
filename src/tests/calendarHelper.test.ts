import { describe, it, expect } from 'vitest';
import { SYSTEM_CATEGORIES, getCategoryById, getColorForCategory } from '../shared/constants';

describe('constants - Test hàm xử lý category', () => {
  
  it('getCategoryById trả về đúng category khi id hợp lệ', () => {
    const category = getCategoryById(1);
    expect(category?.name).toBe('Học tập');
    expect(category?.color).toBe('#ff5252');
  });

  it('getCategoryById trả về category mặc định (id=1) khi id không tồn tại', () => {
    const category = getCategoryById(999);
    expect(category?.name).toBe('Học tập');  // Fallback về category đầu tiên
    expect(category?.color).toBe('#ff5252');
  });

  it('getColorForCategory trả về đúng màu khi id hợp lệ', () => {
    const color = getColorForCategory(2);
    expect(color).toBe('#448aff');
  });

  it('getColorForCategory trả về màu mặc định khi id không tồn tại', () => {
    const color = getColorForCategory(999);
    expect(color).toBe('#ff5252');  // Màu của category đầu tiên
  });
});