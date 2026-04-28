"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorForCategory = exports.getCategoryById = exports.SYSTEM_CATEGORIES = void 0;
exports.SYSTEM_CATEGORIES = [
    { id: 1, name: 'Học tập', color: '#ff5252' },
    { id: 2, name: 'Công việc', color: '#448aff' },
    { id: 3, name: 'Giải trí', color: '#69f0ae' },
    { id: 4, name: 'Cá nhân', color: '#ffd740' },
    { id: 5, name: 'Khác', color: '#b388ff' }
];
const getCategoryById = (id) => {
    return exports.SYSTEM_CATEGORIES.find(c => c.id === id) || exports.SYSTEM_CATEGORIES[0];
};
exports.getCategoryById = getCategoryById;
const getColorForCategory = (id) => {
    return (0, exports.getCategoryById)(id).color;
};
exports.getColorForCategory = getColorForCategory;
