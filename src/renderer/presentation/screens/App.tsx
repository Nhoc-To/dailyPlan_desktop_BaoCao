import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
// import WeeklyOverviewScreen from './WeeklyOverviewScreen';
// import CalendarScreen from './CalendarScreen';
// import YearlyTasksScreen from './YearlyTasksScreen';
// import StatsScreen from './StatsScreen';
import TaskEditorScreen from './TaskEditorScreen';
import { Task } from '../../../shared/domain/entities';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      if (window.api && window.api.tasks) {
        const data = await window.api.tasks.fetchAll();
        setTasks(data);
      }
    } catch (e) {
      console.error('Lỗi khi fetch tasks:', e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            {/* <Route path="/" element={<WeeklyOverviewScreen tasks={tasks} onTaskUpdated={fetchTasks} />} />
            <Route path="/calendar" element={<CalendarScreen tasks={tasks} onTaskUpdated={fetchTasks} />} />
            <Route path="/yearly" element={<YearlyTasksScreen tasks={tasks} onTaskUpdated={fetchTasks} />} />
            <Route path="/stats" element={<StatsScreen tasks={tasks} />} /> */}
            <Route path="/editor" element={<TaskEditorScreen onTaskUpdated={fetchTasks} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
