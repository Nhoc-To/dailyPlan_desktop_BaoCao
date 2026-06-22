import React from 'react';
import { Bell, Repeat } from 'lucide-react';
import { REMINDER_OPTS, REPEAT_OPTS } from '../../hooks/useTaskForm';

interface Props {
  currentTheme: string;
  reminderOn: boolean;
  setReminderOn: (val: boolean) => void;
  reminderAt: string;
  setReminderAt: (val: string) => void;
  repeatOn: boolean;
  setRepeatOn: (val: boolean) => void;
  repeatFreq: string;
  setRepeatFreq: (val: string) => void;
}

export const ReminderRepeatSettings: React.FC<Props> = ({
  currentTheme,
  reminderOn,
  setReminderOn,
  reminderAt,
  setReminderAt,
  repeatOn,
  setRepeatOn,
  repeatFreq,
  setRepeatFreq,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '16px' }}>
       <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}><Bell size={18} color={currentTheme} /> Nhắc nhở</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={reminderOn} onChange={e => setReminderOn(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          {reminderOn && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              {REMINDER_OPTS.map(opt => (
                <span 
                  key={opt}
                  onClick={() => setReminderAt(opt)}
                  style={{
                    padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                    background: reminderAt === opt ? currentTheme : 'var(--surface-bg)',
                    color: reminderAt === opt ? 'white' : 'var(--text-muted)'
                  }}
                >
                  {opt}
                </span>
              ))}
            </div>
          )}
       </div>

       <div style={{ width: '100%', height: '1px', background: 'var(--surface-border)' }}></div>

       <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}><Repeat size={18} color={currentTheme} /> Lặp lại</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={repeatOn} onChange={e => setRepeatOn(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          {repeatOn && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {REPEAT_OPTS.map(opt => (
                <span 
                  key={opt}
                  onClick={() => setRepeatFreq(opt)}
                  style={{
                    padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                    background: repeatFreq === opt ? currentTheme : 'var(--surface-bg)',
                    color: repeatFreq === opt ? 'white' : 'var(--text-muted)'
                  }}
                >
                  {opt}
                </span>
              ))}
            </div>
          )}
       </div>
    </div>
  );
};
