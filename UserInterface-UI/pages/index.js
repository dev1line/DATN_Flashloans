import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Dapp from "../components/dapp";
import Account from "../components/accounts";
export default function Home({ web3, accounts, contract }) {
  const router = useRouter();
  console.log("haha:", web3, accounts, contract);
  return (
    <div className={styles.container}>
      {/* <Dapp accounts={accounts} contract={contract} web3={web3} /> */}
      <Account accounts={accounts} contract={contract} web3={web3} />
    </div>
  );
}
