import "../styles/globals.css";
import Web3Container from "../lib/Web3Container";
import Layout from "../components/Layout/index.js";
import io from "socket.io-client";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketValue = io();
    setSocket(socketValue);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  return (
    // <Web3Container
    // renderLoading={() => <div>Loading Dapp Page...</div>}
    // render={({ web3, accounts, contract }) => (
    <Layout>
      <Component
        // accounts={accounts}
        // contract={contract}
        // web3={web3}
        socket={socket}
        {...pageProps}
      />
    </Layout>
    //   )}
    // />
  );
}

export default MyApp;
