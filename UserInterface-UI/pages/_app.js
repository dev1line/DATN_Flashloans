import "../styles/globals.css";
import Web3Container from "../lib/Web3Container";
function MyApp({ Component, pageProps }) {
  return (
    <Web3Container
      renderLoading={() => <div>Loading Dapp Page...</div>}
      render={({ web3, accounts, contract }) => (
        <Component
          accounts={accounts}
          contract={contract}
          web3={web3}
          {...pageProps}
        />
      )}
    />
  );
}

export default MyApp;
