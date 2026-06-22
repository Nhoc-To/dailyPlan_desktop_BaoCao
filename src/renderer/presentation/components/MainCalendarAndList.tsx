import React from 'react';
import { Task } from '../../../shared/domain/entities';

interface Props {
  tasks: Task[];
}

const MainCalendarAndList: React.FC<Props> = ({ tasks }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      {/* Sidebar Lịch nhỏ & Ghi chú */}
      <div className="card" style={{ width: '200px', flexShrink: 0 }}>
        <button className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>+ Tạo</button>
        <div style={{ border: '1px solid #ddd', height: '150px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Mini Calendar Area
        </div>
        <div>
          <h4>Lịch</h4>
          <div style={{color: '#ff5252', fontWeight: 'bold'}}>• học tập</div>
          <div style={{color: '#448aff', fontWeight: 'bold'}}>• công việc</div>
          <div style={{color: '#69f0ae', fontWeight: 'bold'}}>• giải trí</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card" style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Hôm nay {'<>'} Tháng 4, 2026</h2>
          <table style={{ height: '200px' }}>
            <thead>
              <tr>
                <th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>CN</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <table>
            <thead>
              <tr>
                <th>Hoàn thành</th>
                <th>Tác vụ</th>
                <th>Loại</th>
                <th>Mô tả</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td><input type="checkbox" checked={task.status} readOnly /></td>
                  <td>{task.name}</td>
                  <td>{task.categoryId === 1 ? 'Học tập' : 'Công việc'}</td>
                  <td>-</td>
                  <td>{task.startDate}</td>
                  <td>{task.endDate}</td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '10px' }}>Chưa có tác vụ. Thử tạo mới!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainCalendarAndList;
