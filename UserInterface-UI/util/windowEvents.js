export const registerSwipeEvent = (
  callback = ({ direction }) => {},
  { moveDistance = 30 } = {}
) => {
  // true = "down"
  // false = "up"
  let direction = null;
  let isSwipeable = false;
  let touchedPosition = { x: null, y: null };
  let scrollPosition = { x: window.scrollX, y: window.scrollY };

  const setDirection = (dir) => {
    direction = dir;
    callback({ direction });
  };

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

  const handleScroll = (e) => {
    // console.log("Scroll: ", window.scrollY - scrollPosition.y, direction);
    if (window.scrollY - scrollPosition.y >= moveDistance && !direction) {
      setDirection(true);
    } else if (scrollPosition.y - window.scrollY >= moveDistance && direction) {
      setDirection(false);
    } else {
      scrollPosition = { x: window.scrollX, y: window.scrollY };
    }
  };

  window.addEventListener("wheel", handleWheel, true);
  window.addEventListener("touchstart", handleTouchStart, true);
  window.addEventListener("touchmove", handleTouchMove, true);
  window.addEventListener("touchend", handleTouchEnd, true);
  window.addEventListener("touchcancel", handleTouchCancel, true);
  window.addEventListener("scroll", handleScroll, true);

  return () => {
    window.removeEventListener("wheel", handleWheel, true);
    window.removeEventListener("touchstart", handleTouchStart, true);
    window.removeEventListener("touchmove", handleTouchMove, true);
    window.removeEventListener("touchend", handleTouchEnd, true);
    window.removeEventListener("touchcancel", handleTouchCancel, true);
    window.removeEventListener("scroll", handleScroll, true);
  };
};
