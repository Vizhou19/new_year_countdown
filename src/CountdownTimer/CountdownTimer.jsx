import { useState, useEffect } from "react";

function CountdownTimer() {
  const [eventName, setEventName] = useState("New Years Countdown");
  const [eventDate, setEventDate] = useState(new Date(2026, 0, 1, 0, 0, 0));
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("HAPPY NEW YEAR!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventDate, timeRemaining]);

  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName;
    }
  }, [countdownStarted, eventName]);

  useEffect(() => {
    if (
      timeRemaining.days === 0 &&
      timeRemaining.hours === 0 &&
      timeRemaining.minutes === 0 &&
      timeRemaining.seconds === 0
    ) {
      incrementYear(); // * This updates eventDate to next year
    }
  }, [timeRemaining]);

  /*
   * This function below will update the year automatically
   * without doing it manually
   */

  const incrementYear = () => {
    setEventDate((prevDate) => {
      const nextYear = prevDate.getFullYear() + 1;
      return new Date(
        nextYear,
        prevDate.getMonth(),
        prevDate.getDate(),
        prevDate.getHours(),
        prevDate.getMinutes(),
        prevDate.getSeconds()
      );
    });
  };

  /* 
    ! This Function below will be deprecated soon
  */

  const handleSetCountdown = () => {
    setCountdownStarted(true);
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("eventName", eventName);
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const secs = Math.floor((time / 1000) % 60);
    const mins = Math.floor((time / (1000 * 60)) % 60);
    const hrs = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hrs.toString().padStart(2, "0")} <span>hours</span>
        </div>
        <div className="countdown-value">
          {mins.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {secs.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-container">
      <div className="countdown-timer-container">
        <h2 className="countdown-name">{eventName}</h2>

        <p className="countdown-date">{formatDate(eventDate)}</p>
        {formatTime(timeRemaining)}
        <button onClick={handleSetCountdown}>Start Countdown</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
