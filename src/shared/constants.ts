export const SYSTEM_CATEGORIES = [
  { id: 1, name: 'Học tập', color: '#ff5252' },
  { id: 2, name: 'Công việc', color: '#448aff' },
  { id: 3, name: 'Giải trí', color: '#69f0ae' },
  { id: 4, name: 'Cá nhân', color: '#ffd740' },
  { id: 5, name: 'Khác', color: '#b388ff' }
];

export const getCategoryById = (id: number) => {
  return SYSTEM_CATEGORIES.find(c => c.id === id) || SYSTEM_CATEGORIES[0];
};

export const getColorForCategory = (id: number) => {
  return getCategoryById(id).color;
};
