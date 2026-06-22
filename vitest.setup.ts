import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';

afterEach(() => {
  cleanup();
});

// Mock các dependencies
vi.mock('lucide-react', () => ({
  ChevronLeft: () => React.createElement('span', null, '←'),
  ChevronRight: () => React.createElement('span', null, '→'),
  Edit: () => React.createElement('span', null, '✏️'),
  Trash2: () => React.createElement('span', null, '🗑️'),
}));

vi.mock('../../shared/constants', () => ({
  SYSTEM_CATEGORIES: [
    { id: 1, name: 'Work', color: '#ff4444' },
    { id: 2, name: 'Personal', color: '#44ff44' },
  ],
}));