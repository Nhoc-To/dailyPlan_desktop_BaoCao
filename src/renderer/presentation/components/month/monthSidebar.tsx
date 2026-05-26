import React from 'react';
import {
ChevronLeft,
ChevronRight
} from 'lucide-react';

import { Task } from '../../../../shared/domain/entities';
import { SYSTEM_CATEGORIES } from '../../../../shared/constants';

interface Props{

year:number;
month:number;

tasksByDate:
Map<number,Task[]>;

prevMonth:()=>void;
nextMonth:()=>void;

onDayClick:(
date:string
)=>void;

}

const WEEK_DAYS=[
'T2',
'T3',
'T4',
'T5',
'T6',
'T7',
'CN'
];

const MonthSidebar:
React.FC<Props>=({

year,
month,

tasksByDate,

prevMonth,
nextMonth,

onDayClick

})=>{

const getDaysInMonth=(
y:number,
m:number
)=>{

return new Date(
y,
m+1,
0
).getDate();

};

const getFirstDayOfMonth=(
y:number,
m:number
)=>{

let day=
new Date(
y,
m,
1
).getDay();

return day===0
?6
:day-1;

};

const daysInMonth=
getDaysInMonth(
year,
month
);

const firstDay=
getFirstDayOfMonth(
year,
month
);

const prevMonthDays=
getDaysInMonth(
year,
month-1
);

const totalCells=
Math.ceil(
(daysInMonth+firstDay)/7
)*7;

const nextMonthEmptyDays=
totalCells-
(daysInMonth+firstDay);

return(

<div

className="glass card"

style={{

width:'280px',

flexShrink:0,

display:'flex',

flexDirection:'column',

gap:'24px'

}}

>

<div>

<div

style={{

display:'flex',

justifyContent:
'space-between',

alignItems:'center',

marginBottom:'16px'

}}

>

<button
onClick={
prevMonth
}

style={{

background:'none',

border:'none',

cursor:'pointer',

color:
'var(--primary-color)'

}}
>

<ChevronLeft
size={20}
/>

</button>

<h4
style={{
margin:0
}}
>

{month+1}/{year}

</h4>

<button
onClick={
nextMonth
}

style={{

background:'none',

border:'none',

cursor:'pointer',

color:
'var(--primary-color)'

}}
>

<ChevronRight
size={20}
/>

</button>

</div>

<div

style={{

display:'grid',

gridTemplateColumns:
'repeat(7,1fr)',

gap:'4px',

textAlign:'center'

}}

>

{WEEK_DAYS.map(day=>(

<div
key={day}
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

gap:'4px'

}}

>

{Array.from({
length:firstDay
}).map((_,i)=>(

<div
key={i}
>

{prevMonthDays-
firstDay+
i+
1}

</div>

))}

{Array.from({
length:daysInMonth
}).map((_,i)=>{

const day=
i+1;

const dateStr=

`${year}-${String(
month+1
).padStart(2,'0')}-${String(
day
).padStart(2,'0')}`;

const hasTask=
tasksByDate.has(
day
);

const today=
new Date();

const isToday=

today.getDate()===day &&
today.getMonth()===month &&
today.getFullYear()===year;

return(

<div

key={day}

onClick={()=>{

onDayClick(
dateStr
)

}}

style={{

display:'flex',

justifyContent:
'center',

alignItems:
'center',

aspectRatio:'1',

borderRadius:'50%',

cursor:'pointer',

background:
isToday
?'var(--primary-color)'
:'transparent',

color:
isToday
?'white'
:'var(--text-main)',

position:'relative'

}}

>

{day}

{hasTask &&
!isToday &&(

<div

style={{

position:'absolute',

bottom:'2px',

width:'4px',

height:'4px',

borderRadius:'50%',

background:
'var(--primary-color)'

}}

/>

)}

</div>

)

})}

{Array.from({
length:
nextMonthEmptyDays
}).map((_,i)=>(

<div
key={i}
>

{i+1}

</div>

))}

</div>

</div>

<div>

<h4>

Phân loại lịch

</h4>

{SYSTEM_CATEGORIES.map(
c=>(

<div

key={c.id}

style={{

display:'flex',

alignItems:'center',

gap:'8px',

marginBottom:'12px'

}}

>

<div

style={{

width:12,
height:12,

borderRadius:'50%',

backgroundColor:
c.color

}}

/>

{c.name}

</div>

)

)}

</div>

</div>

)

}

export default MonthSidebar;