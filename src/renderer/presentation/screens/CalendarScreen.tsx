import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Task} from '../../../shared/domain/entities';

import MonthSidebar
from '../components/month/monthSidebar';

import MonthHeader
from '../components/month/monthHeader';

import MonthGrid
from '../components/month/monthGrid';

import useMonthTask
from '../components/month/usemonthTask';

interface Props{

tasks:Task[];

onTaskUpdated?:()=>void;

}

const CalendarScreen:
React.FC<Props>=({

tasks,
onTaskUpdated

})=>{

const navigate=
useNavigate();

const[
currentDate,
setCurrentDate
]=useState(
new Date()
);

const year=
currentDate.getFullYear();

const month=
currentDate.getMonth();

const tasksByDate=
useMonthTask(
tasks,
year,
month
);

const prevMonth=()=>{

setCurrentDate(

new Date(
year,
month-1,
1
)

)

};

const nextMonth=()=>{

setCurrentDate(

new Date(
year,
month+1,
1
)

)

};

const goToday=()=>{

setCurrentDate(
new Date()
)

};

const handleDayClick=(

date:string

)=>{

navigate(

'/editor',

{

state:{

task:{

startDate:date,

endDate:date

}

}

}

)

};

const handleEdit=(

task:Task

)=>{

navigate(

'/editor',

{

state:{
task
}

}

)

};

const handleDelete=
async(
id:number
)=>{

if(

confirm(
'Bạn có chắc chắn muốn xóa tác vụ này?'
)

){

if(
window.api?.tasks
){

await window
.api
.tasks
.delete(id);

onTaskUpdated?.();

}

}

};

return(

<div

style={{

display:'flex',

gap:'24px',

height:'100%',

width:'100%'

}}

>

<MonthSidebar

year={year}
month={month}

tasksByDate={
tasksByDate
}

prevMonth={
prevMonth
}

nextMonth={
nextMonth
}

onDayClick={
handleDayClick
}

/>

<div

className=
"glass card"

style={{

flex:1,

padding:'24px'

}}

>

<MonthHeader

month={month}

year={year}

goToday={
goToday
}

/>

<MonthGrid

year={year}

month={month}

tasksByDate={
tasksByDate
}

onDayClick={
handleDayClick
}

onEdit={
handleEdit
}

onDelete={
handleDelete
}

/>

</div>

</div>

)

}

export default CalendarScreen;