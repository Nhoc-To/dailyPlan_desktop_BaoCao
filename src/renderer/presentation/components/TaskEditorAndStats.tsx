import React, { useState } from 'react';
import { Task } from '../../../shared/domain/entities';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Props {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const pieData = [
  { name: 'Học tập', value: 400, color: '#ff5252' },
  { name: 'Khác', value: 300, color: '#f0f2f5' },
];

const barData = [
  { name: 'T2', pt: 80 }, { name: 'T3', pt: 60 }, { name: 'T4', pt: 40 },
  { name: 'T5', pt: 20 }, { name: 'T6', pt: 90 }, { name: 'T7', pt: 50 }, { name: 'CN', pt: 100 }
];

const TaskEditorAndStats: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const [taskName, setTaskName] = useState('');

  const handleCreate = async () => {
    if (!taskName) return;
    if (window.api && window.api.tasks) {
      await window.api.tasks.create({
        categoryId: 1,
        name: taskName,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        status: false
      });
      setTaskName('');
      onTaskUpdated();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%', alignItems: 'stretch' }}>
      
      {/* Cột 1: Form Thêm/Sửa */}
      <div className="card" style={{ flex: '0 0 250px' }}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>Tên tác vụ</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Nhập tên..." 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc' }} 
          />
          <input type="text" placeholder="Mô tả" style={{ padding: '8px', border: '1px solid #ccc' }} />
          <input type="date" style={{ padding: '8px', border: '1px solid #ccc' }} />
          <input type="date" style={{ padding: '8px', border: '1px solid #ccc' }} />
          <button className="btn-primary" onClick={handleCreate}>Lưu Tác Vụ</button>
        </div>
      </div>

      {/* Cột 2: Preview Xanh Blue */}
      <div className="card" style={{ flex: '0 0 250px', backgroundColor: '#0052cc', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3>Xem trước tác vụ</h3>
      </div>

      {/* Cột 3: Stats */}
      <div className="stats-container">
        <div className="chart-card">
          <h4 style={{ textAlign: 'center' }}>Khối lượng công việc</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4 style={{ textAlign: 'center' }}>Tiến độ hoàn thành</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <BarTooltip />
              <Bar dataKey="pt" fill="#448aff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskEditorAndStats;
