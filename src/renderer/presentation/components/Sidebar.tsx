import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CalendarDays, Calendar, ListTodo, BarChart2, PlusCircle, Info } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar glass">
            <h2>DailyPlan</h2>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <CalendarDays size={20} />
                <span>Lịch tuần</span>
            </NavLink>

            <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''}>
                <Calendar size={20} />
                <span>Lịch tháng</span>
            </NavLink>

            <NavLink to="/yearly" className={({ isActive }) => isActive ? 'active' : ''}>
                <ListTodo size={20} />
                <span>Nhiệm vụ năm</span>
            </NavLink>

            <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
                <BarChart2 size={20} />
                <span>Thống kê</span>
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                <Info size={20} />
                <span>Thông tin</span>
            </NavLink>

            <div className="create-btn-wrapper">
                <button className="btn-floating-primary" onClick={() => navigate('/editor')}>
                    <PlusCircle size={20} />
                    Tạo tác vụ
                </button>
            </div>

            
        </div>


    );
};

export default Sidebar;