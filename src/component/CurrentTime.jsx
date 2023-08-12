import React, { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState("");

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때와 매 초마다 현재 시간을 업데이트
    const interval = setInterval(() => {
      const date = new Date();
      const formattedTime = formatTime(date);
      setCurrentTime(formattedTime);
    }, 1000);

    // 컴포넌트가 언마운트되면 인터벌을 클리어
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const date = new Date();
    const dayOfWeek = getDayOfWeek(date);
    setCurrentDayOfWeek(dayOfWeek);
  }, []);

  // 시간을 포맷팅하는 함수
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPM = hours < 12 ? "AM" : "PM";

    // 12시간 형식으로 표기 ("hh:mm AM/PM")
    hours = hours % 12 || 12;
    const formattedTime = `${padZero(hours)}:${padZero(minutes)} ${amPM}`;
    return formattedTime;
  };

  // 요일을 가져오는 함수
  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  };

  // 숫자를 두 자리로 만들기 위한 함수
  const padZero = (number) => {
    return number.toString().padStart(2, "0");
  };

  return (
    <div className="dayTime">
      <p>{currentDayOfWeek}</p>
      <p>{currentTime}</p>
    </div>
  );
}
