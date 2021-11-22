import "../styles/globals.css";
import Web3Container from "../lib/Web3Container";
import Layout from "../components/Layout/index.js";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolo-client";
import { GET_HEADER } from "../query/general";
import App from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store.js";
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
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component
            // accounts={accounts}
            // contract={contract}
            // web3={web3}
            socket={socket}
            {...pageProps}
          />
        </Layout>
      </ApolloProvider>
    </Provider>
    //   )}
    // />
  );
}

MyApp.getInitialProps = async (ctx) => {
  const navbarData = await client.query({
    query: GET_HEADER,
  });
  // console.log("data:", navbarData);
  const appData = await App.getInitialProps(ctx);
  return {
    ...appData,
    navbarData: navbarData.data,
  };
};

export default MyApp;
