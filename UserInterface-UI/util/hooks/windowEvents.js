import React, { useEffect, useState } from "react";

export const useSwipeDirection = ({ moveDistance = 30 }) => {
  // true = "down"
  // false = "up"
  const [direction, setDirection] = useState(null);

  let isSwipeable = false;
  let touchedPosition = { x: null, y: null };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) < moveDistance) return;

    const newDirection = e.deltaY > 0 ? true : false;
    if (newDirection !== direction) setDirection(newDirection);
  };

  const handleTouchStart = (e) => {
    const touch = e.changedTouches[0];
    isSwipeable = true;
    touchedPosition = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    const touch = e.changedTouches[0];
    // console.log(
    //   `Touch move: { clientX: ${touch.clientX},clientY: ${touch.clientY}`,
    //   direction //,pageX: ${touch.pageX},pageY: ${touch.pageY},screenX: ${touch.screenX},screenY: ${touch.screenY} }`
    // );
    if (isSwipeable) {
      if (touchedPosition.y - touch.clientY >= moveDistance && !direction) {
        //move down and direction = up
        setDirection(true);
        isSwipeable = false;
      } else if (
        touch.clientY - touchedPosition.y >= moveDistance &&
        direction
      ) {
        //move up and direction = down
        setDirection(false);
        isSwipeable = false;
      }
    }
  };
  const handleTouchEnd = (e) => {
    touchedPosition = { x: null, y: null };
  };
  const handleTouchCancel = (e) => {
    touchedPosition = { x: null, y: null };
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, true);
    window.addEventListener("touchstart", handleTouchStart, true);
    window.addEventListener("touchmove", handleTouchMove, true);
    window.addEventListener("touchend", handleTouchEnd, true);
    window.addEventListener("touchcancel", handleTouchCancel, true);

    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
      window.removeEventListener("touchcancel", handleTouchCancel, true);
    };
  });

  return { direction };
};
