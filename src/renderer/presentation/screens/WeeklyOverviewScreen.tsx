import React from 'react';
import WeeklyOverview from '../components/WeeklyOverview';
import { Task } from '../../../shared/domain/entities';

interface Props {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

const WeeklyOverviewScreen: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <WeeklyOverview tasks={tasks} onTaskUpdated={onTaskUpdated} />
    </div>
  );
};

export default WeeklyOverviewScreen;
