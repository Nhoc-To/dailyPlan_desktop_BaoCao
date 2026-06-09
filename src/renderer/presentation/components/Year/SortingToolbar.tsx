import React from 'react';

type SortType =
  | 'date'
  | 'duration'
  | 'name';

interface Props {
  sortBy: SortType;
  setSortBy: (value: SortType) => void;
}

const SORTS: {
  key: SortType;
  icon: string;
  label: string;
  desc: string;
}[] = [
  {
    key: 'date',
    icon: '📅',
    label: 'Ngày gần nhất',
    desc: 'Mới tạo lên trên'
  },
  {
    key: 'duration',
    icon: '⏳',
    label: 'Sắp đến hạn',
    desc: 'Hạn chót gần nhất'
  },
  {
    key: 'name',
    icon: '🔤',
    label: 'Tên A–Z',
    desc: 'Theo bảng chữ cái'
  }
];

const SortingToolbar: React.FC<Props> = ({
  sortBy,
  setSortBy
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '22px',
        padding: '18px 22px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <div
        style={{
          marginBottom: '14px',
          fontWeight: 700,
          color: '#374151',
          fontSize: '15px'
        }}
      >
        🗂 Sắp xếp nhiệm vụ
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        {SORTS.map(({ key, icon, label, desc }) => {
          const active = sortBy === key;
          return (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              style={{
                padding: '12px 20px',
                borderRadius: '16px',
                border: active
                  ? '2px solid #5B5CEB'
                  : '2px solid #ECECF7',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.18s ease',
                background: active ? '#5B5CEB' : '#F5F6FF',
                color: active ? '#FFFFFF' : '#5B5CEB',
                boxShadow: active
                  ? '0 4px 14px rgba(91,92,235,0.28)'
                  : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '2px',
                minWidth: '140px'
              }}
            >
              <span style={{ fontSize: '15px' }}>
                {icon} {label}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  opacity: active ? 0.85 : 0.6
                }}
              >
                {desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortingToolbar;
