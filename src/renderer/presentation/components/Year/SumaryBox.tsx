import React from 'react';
import { Task } from '../../../../shared/domain/entities';

interface Props {
  tasks: Task[];
}

const SummaryBox: React.FC<Props> = ({ tasks }) => {
  const total = tasks.length;

  const completed = tasks.filter(
    task => task.status
  ).length;

  const overdue = tasks.filter(task => {
    if (task.status) return false;

    return (
      new Date(task.endDate).getTime() <
      Date.now()
    );
  }).length;

  const active =
    total -
    completed -
    overdue;
    

  return (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '20px',
      marginBottom: '30px'
    }}
  >
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px',
        boxShadow:
          '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <p
        style={{
          color: '#6B7280',
          margin: 0,
          fontSize: '14px'
        }}
      >
        Tổng nhiệm vụ
      </p>

      <h2
        style={{
          color: '#5B5CEB',
          marginTop: '10px',
          marginBottom: 0,
          fontSize: '32px',
          fontWeight: 700
        }}
      >
        {total}
      </h2>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px',
        boxShadow:
          '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <p
        style={{
          color: '#6B7280',
          margin: 0,
          fontSize: '14px'
        }}
      >
        Đang thực hiện
      </p>

      <h2
        style={{
          color: '#5B5CEB',
          marginTop: '10px',
          marginBottom: 0,
          fontSize: '32px',
          fontWeight: 700
        }}
      >
        {active}
      </h2>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px',
        boxShadow:
          '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <p
        style={{
          color: '#6B7280',
          margin: 0,
          fontSize: '14px'
        }}
      >
        Hoàn thành
      </p>

      <h2
        style={{
          color: '#22C55E',
          marginTop: '10px',
          marginBottom: 0,
          fontSize: '32px',
          fontWeight: 700
        }}
      >
        {completed}
      </h2>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px',
        boxShadow:
          '0 8px 24px rgba(91,92,235,0.08)',
        border: '1px solid #ECECF7'
      }}
    >
      <p
        style={{
          color: '#6B7280',
          margin: 0,
          fontSize: '14px'
        }}
      >
        Quá hạn
      </p>

      <h2
        style={{
          color: '#EF4444',
          marginTop: '10px',
          marginBottom: 0,
          fontSize: '32px',
          fontWeight: 700
        }}
      >
        {overdue}
      </h2>
    </div>
  </div>
);
};

export default SummaryBox;