import clsx from "clsx";
import styles from "./style.module.css";
import { useRef } from "react";
// import Head from "next/head";
const Video = (props) => {
  const { data } = props;
  const video = useRef();
  const layer = useRef();
  console.log(data);
  function playVideo() {
    setTimeout(() => {
      video.current.parentNode.style.opacity = 1;
      video.current.play();
      layer.current.style.display = "none";
    }, 100);
  }

  return (
    <>
      <div className={clsx(styles.cover)}>
        <div className={clsx(styles.covervideo)}>
          <video
            controls="controls"
            id="video"
            className={clsx(styles.video)}
            width="1500"
            height="700"
            // poster={}
            ref={video}
          >
            <source
              src={data["Video_AAVE"].video}
              type="video/mp4"
              autostart="false"
            />
          </video>
        </div>
        <div className={styles["cover-layer"]} ref={layer}>
          <img src={data["Video_AAVE"].poster?.original}></img>
          <div className={styles["layer-background"]}>
            <img src="/img/Video-video-1.svg" className={styles["img1"]}></img>
            <div className={styles["center"]}>
              <div className={styles["button"]} onClick={playVideo}>
                <img src="/img/Video-video-2.svg"></img>
              </div>
              <div className={styles["name"]}>{data["Video_AAVE"].title}</div>
              <div className={styles["position"]}>
                {data["Video_AAVE"].subTitle}
              </div>
            </div>
            <img src="/img/Video-video-3.svg" className={styles["img3"]}></img>
          </div>
        </div>
      </div>
    </>
  );
};
export default Video;
