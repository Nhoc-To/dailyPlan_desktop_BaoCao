import React from 'react';

interface Props {
  count: number;
  onDelete: () => void;
  onCancel: () => void;
}

const BulkDeleteBar: React.FC<Props> = ({
  count,
  onDelete,
  onCancel
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow:
          '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: '#374151'
        }}
      >
        Đã chọn {count} nhiệm vụ
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px'
        }}
      >
        <button
          onClick={onCancel}
          style={{
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            cursor: 'pointer',
            background: '#E5E7EB',
            color: '#374151',
            fontWeight: 600
          }}
        >
          Huỷ
        </button>

        <button
          onClick={onDelete}
          disabled={count === 0}
          style={{
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            cursor:
              count === 0
                ? 'not-allowed'
                : 'pointer',
            background:
              count === 0
                ? '#FCA5A5'
                : '#EF4444',
            color: '#FFFFFF',
            fontWeight: 600
          }}
        >
          🗑 Xoá ({count})
        </button>
      </div>
    </div>
  );
};

export default BulkDeleteBar;