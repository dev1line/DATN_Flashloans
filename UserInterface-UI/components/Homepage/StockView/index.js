import Head from "next/head";
import Script from "next/script";
import { useState, useEffect } from "react";
const StockView = (props) => {
  return (
    <div id="stock-view">
      <Head>
        <link
          key="css/stockView.css"
          rel="stylesheet"
          href="css/stockView.css"
        />
      </Head>
      <iframe
        src="/html/stock.html"
        style={{
          border: "none",
          width: "100%",
          height: 683,
        }}
      />

      <div>
        <h2>Market Overview</h2>
        <p>
          The market is very active. Let&apos;s learn and research more deeply
          to make the right investment decisions
        </p>
        <div id="btn-stock-price">Check now !</div>
      </div>
    </div>
  );
};
export default StockView;
