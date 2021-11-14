const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const api = require("binance");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const bRest = new api.BinanceRest({
  key: "", // Get this from your account on binance.com
  secret: "", // Same for this
  timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
  recvWindow: 20000, // Optional, defaults to 5000, increase if you're getting timestamp errors
  disableBeautification: false,
  handleDrift: true,
});
const binanceWS = new api.BinanceWS(true);

// fake DB
// const messages = {
//   chat1: [],
//   chat2: [],
// };
io.on("connection", (socket) => {
  const bws = binanceWS.onKline("BTCUSDT", "1m", (data) => {
    // console.log("data server:", data);

    // socket.on("KLINE", (value) => {
    socket.broadcast.emit("KLINE", {
      time: Math.round(data.kline.startTime / 1000),
      open: parseFloat(data.kline.open),
      high: parseFloat(data.kline.high),
      low: parseFloat(data.kline.low),
      close: parseFloat(data.kline.close),
    });
    // });
  });
});
// socket.io server

nextApp.prepare().then(() => {
  //   app.get("/dataChart", (req, res) => {
  //     res.json({ data: "hello" });
  //   });

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
