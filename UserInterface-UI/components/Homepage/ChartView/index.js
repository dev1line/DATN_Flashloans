import Head from "next/head";
import { useState, useEffect } from "react";
const ChartView = (props) => {
  useEffect(() => {
    document.body.style.position = "relative";

    // var domElement = document.createElement("div");
    const domElement = document.getElementById("chart-view");

    // document.body.appendChild(domElement);

    var width = 1500;
    var height = 600;

    var chart = LightweightCharts.createChart(domElement, {
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      layout: {
        backgroundColor: "#ffffff",
        textColor: "#333",
      },
      grid: {
        horzLines: {
          color: "#eee",
        },
        vertLines: {
          color: "#ffffff",
        },
      },
      crosshair: {
        vertLine: {
          labelVisible: false,
        },
      },
    });

    chart.resize(width, height);

    var series = chart.addAreaSeries({
      topColor: "rgba(0, 150, 136, 0.56)",
      bottomColor: "rgba(0, 150, 136, 0.04)",
      lineColor: "rgba(0, 150, 136, 1)",
      lineWidth: 2,
    });

    fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=1000`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cdata = data.map((d) => {
          return {
            time: d[0] / 1000,
            value: parseFloat(d[4]),
          };
        });
        series.setData(cdata);
      })
      .catch((err) => console.log(err));
    function businessDayToString(businessDay) {
      return businessDay.year + "-" + businessDay.month + "-" + businessDay.day;
    }

    var toolTipWidth = 80;
    var toolTipHeight = 80;
    var toolTipMargin = 15;
    function converter(time) {
      const date_not_formatted = new Date(time);

      let formatted_string = date_not_formatted.getFullYear() + "-";

      if (date_not_formatted.getMonth() < 9) {
        formatted_string += "0";
      }
      formatted_string += date_not_formatted.getMonth() + 1;
      formatted_string += "-";

      if (date_not_formatted.getDate() < 10) {
        formatted_string += "0";
      }
      formatted_string += date_not_formatted.getDate();
      return formatted_string;
    }
    var toolTip = document.createElement("div");
    toolTip.className = "floating-tooltip-2";
    domElement.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(function (param) {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > domElement.clientWidth ||
        param.point.y < 0 ||
        param.point.y > domElement.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        const dateStr = converter(param.time);
        toolTip.style.display = "block";
        var price = param.seriesPrices.get(series);
        toolTip.innerHTML =
          '<div style="color: #009688">BTC</div><div style="font-size: 24px; margin: 4px 0px; color: #21384d">' +
          Math.round(100 * price) / 100 +
          '</div><div style="color: #21384d">' +
          dateStr +
          "</div>";
        var coordinate = series.priceToCoordinate(price);
        var shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(domElement.clientWidth - toolTipWidth, shiftedCoordinate)
        );
        var coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  domElement.clientHeight - toolTipHeight - toolTipMargin,
                  coordinate + toolTipMargin
                )
              );
        toolTip.style.left = shiftedCoordinate + "px";
        toolTip.style.top = coordinateY + "px";
      }
    });
  }, []);
  return (
    <div>
      <Head>
        <link
          key="css/chartView.css"
          rel="stylesheet"
          href="css/chartView.css"
        />
      </Head>
      <div id="chart-view"></div>
    </div>
  );
};
export default ChartView;
