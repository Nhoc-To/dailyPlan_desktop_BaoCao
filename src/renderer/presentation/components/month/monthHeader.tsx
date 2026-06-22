// src/renderer/presentation/components/month/monthHeader.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  month: number;
  year: number;
  goToday: () => void;
  onPrevMonth: (e: React.MouseEvent) => void;  // Thêm event parameter
  onNextMonth: (e: React.MouseEvent) => void;  // Thêm event parameter
}

const MonthHeader: React.FC<Props> = ({ 
  month, 
  year, 
  goToday, 
  onPrevMonth, 
  onNextMonth 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '24px' 
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onPrevMonth}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-bg)',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNextMonth}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-bg)',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>
        Tháng {month + 1}, {year}
      </h2>
      
      <button
        onClick={goToday}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid var(--primary-color)',
          background: 'transparent',
          color: 'var(--primary-color)',
          cursor: 'pointer'
        }}
      >
        Hôm nay
      </button>
    </div>
  );
};

export default MonthHeader;