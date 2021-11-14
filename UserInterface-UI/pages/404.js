import Head from "next/head";
import Link from "next/link";
export default function Custom404() {
  return (
    <div className="big-cover">
      <Head>
        <link
          key="css/404.module.css"
          rel="stylesheet"
          href="css/404.module.css"
        />
      </Head>
      <h1 contenteditable>
        4<div className="shine-3"></div>
        <div className="shine-4"></div>
      </h1>
      <h1 style={{ left: "71.2%" }} contenteditable>
        4<div className="shine-3"></div>
        <div className="shine-4"></div>
      </h1>
      <div className="stars-container">
        <div className="stars">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stars-2"></div>
        <div className="stars-2"></div>
        <div className="stars-2"></div>
        <div className="stars-2"></div>
        <div className="stars-2"></div>
        <div className="stars-2"></div>
      </div>

      <div className="moon"></div>

      <div className="planet-container">
        <div className="planet-ring2"></div>
        <div className="planet"></div>
        <div className="shine"></div>
        <div className="shine-2"></div>
        <div className="planet-ring"></div>
        <div className="planet-crater"></div>
      </div>

      <div className="meteor-container">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="meteor-container-2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="meteor-container-3">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="meteor-container-4">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <p className="p1">Page missing.</p>
      <p className="p2">
        We searched the entire universe, but could not find it.
      </p>
      <div className="form">
        <Link href="/">
          <button>Go back to home screen</button>
        </Link>
      </div>
    </div>
  );
}
