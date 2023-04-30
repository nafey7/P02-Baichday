import React, { useState, useEffect } from "react";

function CountdownTimer({ duration, type }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return (
    <div>
      {type ? (
        <div>
        <p className="h4">Time</p> 
        <p className="h4"><icon className="far fa-clock"></icon> {hours}:{minutes}:{secondsLeft}</p>
        </div>
      ) : (
        <p className="h1 mt-4"><b><icon className="far fa-clock"></icon> Time Left : </b>{hours}:{minutes}:{secondsLeft}</p>
      )}
    </div>
  );
}

export default CountdownTimer;
