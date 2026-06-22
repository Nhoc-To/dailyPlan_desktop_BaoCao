import React from 'react';
import { Task } from '../../../shared/domain/entities';

interface Props {
  tasks: Task[];
}

const StatsScreen: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="glass card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2>Thống kê</h2>
      <p>Tổng số tác vụ: {tasks.length}</p>
      {/* TODO: Implement Stats */}
    </div>
  );
};

export default StatsScreen;
