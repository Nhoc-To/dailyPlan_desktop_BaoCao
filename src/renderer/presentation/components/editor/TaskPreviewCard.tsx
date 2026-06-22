import React from 'react';
import { Bell, Calendar, Repeat } from 'lucide-react';

interface Props {
  isInvalid: boolean;
  customColor: string;
  activeCategoryName: string;
  taskName: string;
  reminderOn: boolean;
  description: string;
  date: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repeatOn: boolean;
  repeatFreq: string;
}

export const TaskPreviewCard: React.FC<Props> = ({
  isInvalid,
  customColor,
  activeCategoryName,
  taskName,
  reminderOn,
  description,
  date,
  startTime,
  endDate,
  endTime,
  repeatOn,
  repeatFreq,
}) => {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '24px',
      background: isInvalid ? 'rgba(255, 82, 82, 0.1)' : `${customColor}1A`, 
      border: `2px dashed ${isInvalid ? '#ff5252' : customColor}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '350px',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    }}>
       {isInvalid ? (
         <>
           <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ff5252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>!</span>
           </div>
           <h3 style={{ color: '#ff5252', marginBottom: '8px' }}>Chưa có gì cả!</h3>
           <p style={{ color: 'var(--text-muted)', maxWidth: '250px' }}>Hãy nhập tên tác vụ bên trái để xem trước thẻ công việc của bạn.</p>
         </>
       ) : (
         <div style={{ width: '100%', background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'left', borderLeft: `6px solid ${customColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '12px', background: `${customColor}20`, color: customColor, fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>
                  {activeCategoryName}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>{taskName}</h3>
              </div>
              {reminderOn && <Bell size={18} color={customColor} />}
            </div>
            
            {description && <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{description}</p>}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                 <Calendar size={14} /> {date} {startTime && <span> {startTime}</span>}
                 {(endDate !== date || endTime) && (
                   <span> - {endDate !== date ? endDate : ''} {endTime || '23:59'}</span>
                 )}
               </div>
               {repeatOn && (
                 <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Repeat size={14} /> {repeatFreq}
                 </div>
               )}
            </div>
         </div>
       )}
    </div>
  );
};
