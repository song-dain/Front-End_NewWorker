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

  return (
    <div>
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