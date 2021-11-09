import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Loader from "../components/Layout/Loader.js";
// import Dapp from "../components/dapp";
import Account from "../components/accounts";
import Banner from "../components/Homepage/Banner/index.js";
import Guide from "../components/Homepage/Guide/index.js";
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
      </div>
    </div>
  );
}
