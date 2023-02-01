import React, { useState, useEffect } from "react";

function CountdownTimer({ duration }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);
  const hours = Math.floor(seconds/3600);
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return(
    <div>
        {hours}:{minutes}:{secondsLeft} remaining
    </div>
  );
}

export default CountdownTimer;