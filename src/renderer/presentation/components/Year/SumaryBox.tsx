import React from 'react';
import { Task } from '../../../../shared/domain/entities';

interface Props {
  tasks: Task[];
}

const SummaryBox: React.FC<Props> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status).length;
  const overdue = tasks.filter(t => {
    if (t.status) return false;
    return new Date(t.endDate).getTime() < Date.now();
  }).length;
  const active = total - completed - overdue;

  const cards = [
    {
      label: 'Tổng nhiệm vụ',
      value: total,
      color: '#5B5CEB',
      bg: '#EEF2FF',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B5CEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'Đang thực hiện',
      value: active,
      color: '#2563EB',
      bg: '#DBEAFE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      label: 'Hoàn thành',
      value: completed,
      color: '#16A34A',
      bg: '#DCFCE7',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      label: 'Quá hạn',
      value: overdue,
      color: '#DC2626',
      bg: '#FEE2E2',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '10px',
            background: c.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            {c.icon}
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px', fontWeight: 500 }}>{c.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryBox;
