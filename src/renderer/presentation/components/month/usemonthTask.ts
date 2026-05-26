import { useMemo } from 'react';
import { Task } from '../../../../shared/domain/entities';

const useMonthTask = (
  tasks: Task[],
  year: number,
  month: number
) => {

  return useMemo(() => {

    const map = new Map<number, Task[]>();

    const getNextDateStr = (
      dateStr: string,
      daysToAdd: number
    ) => {

      const d = new Date(dateStr);

      d.setDate(
        d.getDate() + daysToAdd
      );

      const y = d.getFullYear();

      const m = String(
        d.getMonth() + 1
      ).padStart(2,'0');

      const day = String(
        d.getDate()
      ).padStart(2,'0');

      return `${y}-${m}-${day}`;

    };

    tasks.forEach(task=>{

      let currentStr =
      task.startDate;

      const endStr =
      task.endDate ||
      task.startDate;

      let loopCount = 0;

      while(
        currentStr<=endStr &&
        loopCount<365
      ){

        const [
          taskYear,
          taskMonth,
          taskDay
        ]=
        currentStr
        .split('-')
        .map(Number);

        if(
          taskYear===year &&
          taskMonth-1===month
        ){

          const arr=
          map.get(taskDay)
          ||[];

          const exists=
          arr.some(
            t=>t.id===task.id
          );

          if(!exists){

            arr.push(task);

            map.set(
              taskDay,
              arr
            );

          }

        }

        currentStr=
        getNextDateStr(
          currentStr,
          1
        );

        loopCount++;

      }

    });

    return map;

  },[
    tasks,
    year,
    month
  ]);

};

export default useMonthTask;