import React from "react";
import { BookOpen, Users, Award, Code2, Tag, CalendarRange } from 'lucide-react';


const members = [
    { name: 'Đào Khánh Duy', mssv: '20231583', role: 'Nhóm trưởng', work: 'Quản lý dự án, Thiết kế giao diện, Lập trình chức năng form tác vụ' },

    { name: 'Trần Thị B', mssv: '20210002', role: 'Thành viên' },
    { name: 'Lê Hoàng C', mssv: '20210003', role: 'Thành viên' },
    { name: 'Phạm Minh D', mssv: '20210004', role: 'Thành viên' },
    { name: 'Đỗ Tuấn E', mssv: '20210005', role: 'Thành viên' },
  ];

export default function AboutScreen() {
    return (
         <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
      {/* Tiêu đề chính */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>
          Thông Tin Dự Án & Nhóm Phát Triển
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Thông tin chi tiết về bài tập lớn môn Phát triển ứng dụng (AC3030).
        </p>
      </div>

      {/* Grid thông tin chung */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

        {/* Card 1: Thông tin học phần */}
        <div className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--surface-border)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
            <BookOpen size={24} style={{ color: 'var(--primary-color)' }} />
            <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Thông Tin Học Phần</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Môn học:</span>
              <strong style={{ color: 'var(--text-main)' }}>AC3030 – Phát triển ứng dụng</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Học kỳ:</span>
              <strong style={{ color: 'var(--text-main)' }}>Học kỳ 2025.2</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tên đề tài:</span>
              <strong style={{ color: 'var(--text-main)' }}>DailyPlan</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Nhóm:</span>
              <strong style={{ color: 'var(--text-main)' }}>Nhóm 5</strong>
            </div>
          </div>
        </div>

        {/* Card 2: Công nghệ sử dụng */}
        <div className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--surface-border)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
            <Code2 size={24} style={{ color: '#10B981' }} />
            <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Công Nghệ & Kiến Trúc</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Kiến trúc dự án:</span>
              <strong style={{ color: 'var(--text-main)' }}>Clean Architecture</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Công nghệ sử dụng:</span>
              <strong style={{ color: 'var(--text-main)' }}>Electron + React + Vite</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ngôn ngữ chính:</span>
              <strong style={{ color: 'var(--text-main)' }}>TypeScript</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Cơ sở dữ liệu:</span>
              <strong style={{ color: 'var(--text-main)' }}>SQLite (better-sqlite3)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Design pattern:</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Singleton, Strategy, Factory</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Danh sách thành viên nhóm */}
      <div className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--surface-border)', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
          <Users size={24} style={{ color: '#F59E0B' }} />
          <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Thành Viên Nhóm</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>STT</th>
                <th>Họ và Tên</th>
                <th style={{ width: '150px' }}>MSSV</th>
                <th>Vai trò</th>
                <th>Nhiệm vụ cụ thể</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{member.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{member.mssv}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      background: index === 0 ? 'rgba(79, 70, 229, 0.1)' : 'rgba(0,0,0,0.04)',
                      color: index === 0 ? 'var(--primary-color)' : 'var(--text-main)'
                    }}>
                      {member.role}
                    </span>
                  </td>
                    <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{member.work}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    );
  };