import React from 'react';
import { Task } from '../../../../shared/domain/entities';
import MonthDayCell from './monthDayCell';

interface Props {
  year: number;
  month: number;

  tasksByDate: Map<number, Task[]>;

  onDayClick: (date: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const WEEK_DAYS=['T2','T3','T4','T5','T6','T7','CN'
];

const MonthGrid:React.FC<Props>=({year,month,tasksByDate,
onDayClick,onEdit,onDelete})=>{

const getDaysInMonth=(y:number,m:number)=>{

return new Date(y,m+1,0).getDate();
};

const getFirstDayOfMonth=(y:number,m:number)=>{

let day=
new Date(y,m,1).getDay();

return day===0
?6
:day-1;
};

const daysInMonth=getDaysInMonth(year,month);

const firstDay=getFirstDayOfMonth(year,month);

const prevMonthDays=getDaysInMonth(year,month-1);

const totalCells=Math.ceil((daysInMonth+firstDay)/7)*7;

const nextMonthEmptyDays=totalCells-(daysInMonth+firstDay);

return(

<>

<div
style={{

display:'grid',
gridTemplateColumns:'repeat(7,1fr)',

borderBottom:
'1px solid var(--surface-border)',

paddingBottom:'8px',

marginBottom:'8px'

}}
>

{WEEK_DAYS.map(day=>(

<div
key={day}

style={{
textAlign:'center',
fontWeight:600,
color:'var(--text-muted)'
}}
>

{day}

</div>

))}

</div>

<div

style={{

display:'grid',

gridTemplateColumns:
'repeat(7,1fr)',

gridAutoRows:
'minmax(100px,auto)',

gap:'8px'

}}

>

{/* tháng trước */}

{Array.from({
length:firstDay
}).map((_,i)=>(

<div
key={`pre-${i}`}

style={{

background:
'var(--surface-bg)',

opacity:0.5,

borderRadius:'12px',

padding:'8px'

}}
>

<div
style={{

textAlign:'right',
color:'var(--text-muted)'

}}
>

{prevMonthDays-firstDay+i+1}

</div>

</div>

))}

{/* tháng hiện tại */}

{Array.from({
length:daysInMonth
}).map((_,i)=>{

const day=i+1;

const dateStr=`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

const dayTasks=tasksByDate.get(day)||[];

const now=new Date();

const isToday=

now.getDate()===day &&
now.getMonth()===month &&
now.getFullYear()===year;

return(

<MonthDayCell

key={day}

day={day}

dateStr={dateStr}

tasks={dayTasks}

isToday={isToday}

onDayClick={
onDayClick
}

onEdit={
onEdit
}

onDelete={
onDelete
}

/>

)

})}

{/* tháng sau */}

{Array.from({
length:
nextMonthEmptyDays
}).map((_,i)=>(

<div
key={`next-${i}`}

style={{

background:
'var(--surface-bg)',

opacity:0.5,

borderRadius:'12px',

padding:'8px'

}}
>

<div
style={{

textAlign:'right',
color:'var(--text-muted)'

}}
>

{i+1}

</div>

</div>

))}

</div>

</>

)

}

export default MonthGrid;