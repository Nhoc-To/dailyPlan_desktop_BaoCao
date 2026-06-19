import React from 'react';

type SortType = 'date' | 'duration' | 'name';

interface Props {
  sortBy: SortType;
  setSortBy: (value: SortType) => void;
}

const SortingToolbar: React.FC<Props> = ({ sortBy, setSortBy }) => {
  const options: { key: SortType; label: string; icon: React.ReactNode }[] = [
    {
      key: 'date',
      label: 'Bắt đầu gần nhất',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      key: 'duration',
      label: 'Sắp đến hạn',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      key: 'name',
      label: 'Tên A–Z',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
        </svg>
        Sắp xếp:
      </span>
      {options.map(opt => {
        const active = sortBy === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => setSortBy(opt.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: active ? '1.5px solid #5B5CEB' : '1.5px solid #E5E7EB',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '13px',
              background: active ? '#EEF2FF' : '#FFFFFF',
              color: active ? '#5B5CEB' : '#374151',
              transition: 'all 0.15s',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SortingToolbar;
