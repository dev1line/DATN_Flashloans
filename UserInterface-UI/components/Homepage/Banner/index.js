import Head from "next/head";
import { useEffect, useState } from "react";
const Banner = (props) => {
  useEffect(() => {}, []);
  return (
    <div style={{ width: "100%" }}>
      <Head>
        <link key="/css/banner.css" rel="stylesheet" href="/css/banner.css" />
      </Head>

      <div className="main-cover">
        <div className="bg-cover">
          <div className="btn-flashloan">
            <p>Flashloans Now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
