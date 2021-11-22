import { ethers } from "ethers";
import contractDefinition from "../../../contracts/FlashloanMoneyLego.json";
require("dotenv").config();
const kovan = {
  name: "kovan",
  networkID: "42",
  erc20: {
    dai: {
      address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
    },
  },
};
const contractFlashloanMoneyLegoAddress =
  contractDefinition.networks[kovan.networkID].address;
const Flashswap = (props) => {
  const handleFlashloan = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let signer;
    try {
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    } catch (err) {
      console.log(err.message);
    }
    if (signer && (await signer.getAddress())) {
      console.log("Connect successfully");
    } else {
      //handle log fail connect
    }
    let walletPK = `0x${process.env.DEPLOYMENT_ACCOUNT_KEY}`;

    const wallet = new ethers.Wallet(walletPK, provider);

    console.log(
      "logger:",
      contractFlashloanMoneyLegoAddress,
      contractDefinition.abi
    );
    const contractFlashloanMoneyLego = new ethers.Contract(
      contractFlashloanMoneyLegoAddress,
      contractDefinition.abi,
      wallet
    );
    console.log("contractFlashloanMoneyLego:", contractFlashloanMoneyLego);
  };
  return (
    <div>
      <input type="number" />
      <button onClick={handleFlashloan}>Flashloan</button>
    </div>
  );
};

export default Flashswap;
