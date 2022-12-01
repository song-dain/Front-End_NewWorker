import {useState, useEffect } from 'react';
import ClockCSS from './Clock.module.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(id))
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + "년 " + month + "월 " + day + "일";

  return (
    <div className={ClockCSS.clock}>
      <p className={ ClockCSS.DateP }>
        {dateString}
      </p>
      <p className={ ClockCSS.ClockP }>{time.toLocaleTimeString('ko-KR', {
        hour12 : false,
        hour : '2-digit',
        minute : '2-digit',
        second : '2-digit'
      })}</p>
    </div>
  )
}

export default Clock;