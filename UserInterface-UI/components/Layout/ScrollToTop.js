import React, { useEffect, useState } from "react";
import Head from "next/head";
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    scrollTo(0, 2468);

    // Element to move, time in ms to animate
    function scrollTo(element, duration) {
      var e = document.documentElement;
      if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
      }
      scrollToC(e, e.scrollTop, element, duration);
    }

    // Element to move, element or px from, element or px to, time in ms to animate
    function scrollToC(element, from, to, duration) {
      if (duration <= 0) return;
      if (typeof from === "object") from = from.offsetTop;
      if (typeof to === "object") to = to.offsetTop;

      scrollToX(element, from, to, 0.55, 1 / duration, 30, easeOutCuaic);
    }

    function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
      if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
      }
      element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
      t01 += speed * step;

      setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
      }, step);
    }

    function easeOutCuaic(t) {
      t--;
      return t * t * t + 1;
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      $("#scrollToTopNormal").css("display", "none");
    }
    // Button is displayed after scrolling for 10 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // useEffect(() => {
  //   $("head").append(`<style>
  //   .scroll_to_top {
  //       position: fixed;
  //       background-color: #000a35;
  //       bottom: 10px;
  //       height: 60px;
  //       right: 0px;
  //       z-index: 20;
  //       width: 120px;
  //       padding: 12px;
  //       border-top-left-radius: 15px;
  //       border-bottom-left-radius: 15px;
  //       cursor: pointer;
  //       display: flex;
  //       alignItems: center;
  //       transform: translateX(64px);
  //       opacity:0.7;
  //   }
  //   .scroll_to_top:hover {
  //       transform: translateX(0px);
  //       transition:all 0.3s;
  //       opacity:1;
  //   }
  //   .scroll_to_top:not(:hover) {
  //     transform: translateX(64px);
  //     transition:all 0.3s;
  //     opacity:0.7;
  // }
  //   </style>`);
  //   // $(".scroll_to_topp").hover(() => {
  //   //   $(this).css("transform", "translateX(0px) !important");
  //   // });
  // });
  //scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <>
      <Head>
        <link
          key="css/header.module.css"
          rel="stylesheet"
          href="css/header.module.css"
        />
      </Head>
      {isVisible && (
        <div
          className="scroll_to_top"
          id="scrollToTopNormal"
          onClick={scrollToTop}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-up"
            className="scroll-top-img svg-inline--fa fa-arrow-up fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
            ></path>
          </svg>
        </div>
      )}
    </>
  );
}
