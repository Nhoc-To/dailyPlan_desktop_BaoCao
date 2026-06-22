import React from 'react';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';

interface Props {
  categoryId: number;
  setCategoryId: (id: number) => void;
  customCategory: string;
  setCustomCategory: (val: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  currentTheme: string;
}

export const CategorySelector: React.FC<Props> = ({
  categoryId,
  setCategoryId,
  customCategory,
  setCustomCategory,
  customColor,
  setCustomColor,
  currentTheme,
}) => {
  return (
    <>
      <div>
        <label style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }}>Phân loại tác vụ</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {SYSTEM_CATEGORIES.map(c => (
             <button 
              key={c.id}
              onClick={() => { setCategoryId(c.id); setCustomColor(c.color); }}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid transparent',
                background: categoryId === c.id ? `${c.color}40` : 'var(--bg-gradient-start)',
                color: categoryId === c.id ? c.color : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {c.name}
            </button>
          ))}
          <input 
            type="text" 
            placeholder="+ Tùy chỉnh..." 
            value={customCategory}
            onChange={e => setCustomCategory(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px dashed var(--text-muted)',
              background: customCategory.trim() ? `${currentTheme}20` : 'transparent',
              color: customCategory.trim() ? currentTheme : 'var(--text-main)',
              fontWeight: 600,
              outline: 'none',
              minWidth: '150px'
            }}
          />
        </div>
        {customCategory.trim() && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>* Tên phân loại mặc định sẽ dán nhãn là "{customCategory}".</div>}
      </div>

      <div>
         <label style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }}>Bảng màu cá nhân hóa</label>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <input 
              type="color" 
              value={customColor} 
              onChange={e => setCustomColor(e.target.value)}
              style={{ 
                width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '50%', cursor: 'pointer', 
                WebkitAppearance: 'none'
              }}
           />
           <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bạn có thể chọn màu bất kỳ!</span>
         </div>
      </div>
    </>
  );
};
