import React from 'react';
import { Task } from '../../../../shared/domain/entities';
import TaskItem from './taskitem';

interface Props {
  day: number;
  dateStr: string;
  tasks: Task[];
  isToday: boolean;

  onDayClick: (date: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const MonthDayCell: React.FC<Props> = ({
  day,
  dateStr,
  tasks,
  isToday,
  onDayClick,
  onEdit,
  onDelete
}) => {

  return (

    <div
      onClick={() => onDayClick(dateStr)}

      style={{

        background:
          isToday
          ? 'rgba(79,70,229,0.1)'
          : 'var(--surface-bg)',

        border:
          isToday
          ? '2px solid var(--primary-color)'
          : '1px solid var(--surface-border)',

        borderRadius:'12px',

        padding:'8px',

        display:'flex',
        flexDirection:'column',

        minHeight:'120px',

        cursor:'pointer'
      }}
    >

      <div

        style={{

          textAlign:'right',

          fontWeight:
            isToday
            ?800
            :600,

          color:
            isToday
            ?'white'
            :'var(--text-main)',

          background:
            isToday
            ?'var(--primary-color)'
            :'transparent',

          alignSelf:'flex-end',

          padding:
            isToday
            ?'2px 8px'
            :'0',

          borderRadius:
            isToday
            ?'12px'
            :'0',

          marginBottom:'8px'

        }}

      >

        {day}

      </div>

      <div

        style={{
          display:'flex',
          flexDirection:'column',
          gap:'6px'
        }}

      >

        {tasks.map(task=>(

          <TaskItem
            key={task.id}

            task={task}

            dateStr={dateStr}

            onEdit={onEdit}

            onDelete={onDelete}
          />

        ))}

      </div>

    </div>

  );

};

export default MonthDayCell;