
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div style={{with:"90px",fontSize:"19px",color:"black",height:"60px"}}>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;