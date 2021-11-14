import { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSocket from "../../../hooks/useSocket.js";
// import { createChart } from 'lightweight-charts';
const Chart = (props) => {
  let [candleSeries, setCadleSeries] = useState(null);
  useEffect(() => {
    const chartProperties = {
      width: 1500,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };
    const domElement = document.getElementById("tvchart");
    const chart = LightweightCharts.createChart(domElement, chartProperties);
    candleSeries = chart.addCandlestickSeries();
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cdata = data.map((d) => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        candleSeries.setData(cdata);
      })
      .catch((err) => log(err));
  }, []);
  useSocket("KLINE", (data) => {
    candleSeries.update(data);
  });
  // const cmkc = useSocket("COINMARKETCAP", (data) => {
  //   candleSeries.update(data);
  // });
  // console.log("Coinmarketcapp:", cmkc);

  return (
    <div>
      <Head>
        <link key="css/chart.css" rel="stylesheet" href="css/chart.css" />
      </Head>
      <h2>BTCUSDT in Real-time</h2>
      <p>
        Stay tuned for more cryptocurrencies to make an informed decision !
        <span> See more </span>
      </p>
      <div id="tvchart"></div>
    </div>
  );
};
// Chart.getInitialProps = async () => {
//   const response = await fetch("http://localhost:3000/getDataChart");
//   const messages = await response.json();

//   return { messages };
// };
export default Chart;
