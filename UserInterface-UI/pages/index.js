import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Layout/Loader.js";
// import Dapp from "../components/dapp";
import Account from "../components/accounts";
import Banner from "../components/Homepage/Banner/index.js";
import Guide from "../components/Homepage/Guide/index.js";
import Chart from "../components/Flashloans/Chart";
import StockView from "../components/Homepage/StockView/index.js";

const SwitchButton = (props) => {
  const [isLive, setIsLive] = useState(false);
  return (
    <div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setIsLive(false)}
        >
          Static
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setIsLive(true)}
        >
          Live
        </button>
      </div>
      <div>{isLive ? <Chart /> : <StockView />}</div>
    </div>
  );
};
export default function Home({ web3, accounts, contract }) {
  const router = useRouter();
  console.log("haha:", web3, accounts, contract);
  return (
    <div className="root-container">
      {/* {/* <Dapp accounts={accounts} contract={contract} web3={web3} /> */}
      {/* <Account accounts={accounts} contract={contract} web3={web3} /> */}
      {/* <Loader /> */}
      <Banner />
      <div className="container">
        <Guide />
        <SwitchButton />
      </div>
    </div>
  );
}
