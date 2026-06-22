import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Task } from '../../../../shared/domain/entities';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';

interface Props {
  task: Task;
  dateStr: string;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({
  task,
  dateStr,
  onEdit,
  onDelete
}) => {

  const theme =
    task.color ||
    SYSTEM_CATEGORIES.find(
      c => c.id === task.categoryId
    )?.color ||
    SYSTEM_CATEGORIES[0].color;

  let completedDays: string[] = [];

  try {

    completedDays = JSON.parse(
      task.completedDays || '[]'
    );

  }
  catch {

    completedDays = [];

  }

  const isCompletedToday =
    completedDays.includes(
      dateStr
    );

  return (

    <div
      style={{

        background: `${theme}20`,
        borderLeft: `3px solid ${theme}`,
        padding: '6px 8px',
        borderRadius: '6px',
        fontSize: '0.8rem',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

        opacity:
          isCompletedToday
          ? 0.6
          : 1,

        textDecoration:
          isCompletedToday
          ? 'line-through'
          : 'none'

      }}

      title={
        task.description ||
        task.name
      }
    >

      <div
        style={{
          flex:1,
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap',
          fontWeight:600
        }}
      >

        {task.name}

      </div>

      <div
        style={{
          display:'flex',
          gap:'4px',
          marginLeft:'4px'
        }}
      >

        <button
          onClick={(e)=>{

            e.stopPropagation();

            onEdit(task);

          }}

          style={{
            background:'transparent',
            border:'none',
            cursor:'pointer',
            color:'var(--primary-color)'
          }}
        >

          <Edit size={12}/>

        </button>

        <button
          onClick={(e)=>{

            e.stopPropagation();

            onDelete(task.id);

          }}

          style={{
            background:'transparent',
            border:'none',
            cursor:'pointer',
            color:'#ff5252'
          }}
        >

          <Trash2 size={12}/>

        </button>

      </div>

    </div>

  );

};

export default TaskItem;