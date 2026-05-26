import React from 'react';

interface Props{
    month:number;
    year:number;
    goToday:()=>void;
}

const MonthHeader:React.FC<Props>=({
    month,
    year,
    goToday
})=>{

return(

<div

style={{

display:'flex',

justifyContent:
'space-between',

alignItems:'center',

marginBottom:'24px'

}}

>

<h2

style={{

margin:0,

color:
'var(--primary-color)'

}}

>

Lịch Tháng {month+1}, {year}

</h2>

<button

onClick={goToday}

style={{

padding:'8px 16px',

borderRadius:'8px',

border:
'1px solid var(--primary-color)',

background:'transparent',

color:
'var(--primary-color)',

fontWeight:600,

cursor:'pointer'

}}

>

Hôm nay

</button>

</div>

)

}

export default MonthHeader;