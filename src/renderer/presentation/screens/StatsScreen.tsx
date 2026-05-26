import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { Task } from '../../../shared/domain/entities';

interface StatsScreenProps {
  tasks: Task[];
}

const COLORS = ['#22c55e', '#ef4444'];

const StatsScreen: React.FC<StatsScreenProps> = ({ tasks = [] }) => {
  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.status === true).length;
  }, [tasks]);

  const pendingTasks = tasks.length - completedTasks;

  const pieData = [
    { name: 'Đã hoàn thành', value: completedTasks },
    { name: 'Chưa hoàn thành', value: pendingTasks }
  ];

  const categoryData = useMemo(() => {
    const categoryMap: Record<string, number> = {};

    tasks.forEach(task => {
      const category = task.categoryId
        ? `Loại ${task.categoryId}`
        : 'Chưa phân loại';

      categoryMap[category] =
        (categoryMap[category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([key, value]) => ({
      category: key,
      tasks: value
    }));
  }, [tasks]);

  return (
    <div style={{ padding: '28px' }}>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '24px'
        }}
      >
        📊 Thống kê tác vụ
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '36px',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            background: '#e0f2fe',
            padding: '20px',
            borderRadius: '16px',
            minWidth: '180px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
          }}
        >
          <h3>Tổng tác vụ</h3>
          <p style={{ fontSize: '28px', fontWeight: 700 }}>
            {tasks.length}
          </p>
        </div>

        <div
          style={{
            background: '#dcfce7',
            padding: '20px',
            borderRadius: '16px',
            minWidth: '180px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
          }}
        >
          <h3>Đã hoàn thành</h3>
          <p style={{ fontSize: '28px', fontWeight: 700 }}>
            {completedTasks}
          </p>
        </div>

        <div
          style={{
            background: '#fee2e2',
            padding: '20px',
            borderRadius: '16px',
            minWidth: '180px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
          }}
        >
          <h3>Chưa hoàn thành</h3>
          <p style={{ fontSize: '28px', fontWeight: 700 }}>
            {pendingTasks}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: 420,
            height: 360,
            background: 'white',
            padding: '20px',
            borderRadius: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <h3>Tỷ lệ hoàn thành công việc</h3>

          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: 540,
            height: 360,
            background: 'white',
            padding: '20px',
            borderRadius: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <h3>Thống kê theo loại tác vụ</h3>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="tasks"
                name="Số tác vụ"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsScreen;