"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const constants_1 = require("../shared/constants");
(0, vitest_1.describe)('constants - Test hàm xử lý category', () => {
    (0, vitest_1.it)('getCategoryById trả về đúng category khi id hợp lệ', () => {
        const category = (0, constants_1.getCategoryById)(1);
        (0, vitest_1.expect)(category?.name).toBe('Học tập');
        (0, vitest_1.expect)(category?.color).toBe('#ff5252');
    });
    (0, vitest_1.it)('getCategoryById trả về category mặc định (id=1) khi id không tồn tại', () => {
        const category = (0, constants_1.getCategoryById)(999);
        (0, vitest_1.expect)(category?.name).toBe('Học tập'); // Fallback về category đầu tiên
        (0, vitest_1.expect)(category?.color).toBe('#ff5252');
    });
    (0, vitest_1.it)('getColorForCategory trả về đúng màu khi id hợp lệ', () => {
        const color = (0, constants_1.getColorForCategory)(2);
        (0, vitest_1.expect)(color).toBe('#448aff');
    });
    (0, vitest_1.it)('getColorForCategory trả về màu mặc định khi id không tồn tại', () => {
        const color = (0, constants_1.getColorForCategory)(999);
        (0, vitest_1.expect)(color).toBe('#ff5252'); // Màu của category đầu tiên
    });
});
