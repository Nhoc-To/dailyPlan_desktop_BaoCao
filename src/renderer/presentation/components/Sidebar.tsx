import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CalendarDays, Calendar, ListTodo, BarChart2, PlusCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar glass">
      <h2>DailyPlan</h2>
      
      <NavLink to="/" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
        <CalendarDays size={20} />
        <span>Lịch Tuần</span>
      </NavLink>
      
      <NavLink to="/calendar" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
        <Calendar size={20} />
        <span>Lịch Tháng</span>
      </NavLink>
      
      <NavLink to="/yearly" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
        <ListTodo size={20} />
        <span>Lịch Năm (Danh Sách)</span>
      </NavLink>
      
      <NavLink to="/stats" className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}>
        <BarChart2 size={20} />
        <span>Thống Kê</span>
      </NavLink>

      <div className="create-btn-wrapper">
        <button 
          className="btn-floating-primary"
          onClick={() => navigate('/editor')}
        >
          <PlusCircle size={20} />
          Tạo Tác Vụ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
