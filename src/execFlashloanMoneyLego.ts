import { legos } from "@studydefi/money-legos";
import { ethers, Wallet, Contract } from "ethers";
import kovan from './kovanConfig';
require("dotenv").config()

const FlashloanMoneyLego = require("../UserInterface-UI/contracts/FlashloanMoneyLego.json");

const contractFlashloanMoneyLegoAddress = FlashloanMoneyLego.networks[kovan.networkID].address;

let provider = ethers.getDefaultProvider('kovan');

let walletPK = `0x${process.env.DEPLOYMENT_ACCOUNT_KEY}`

const wallet = new Wallet(walletPK, provider);

const contractFlashloanMoneyLego = new Contract(
  contractFlashloanMoneyLegoAddress,
  FlashloanMoneyLego.abi,
  wallet,
);

// Override the legos DAI mainnet address to the one on kovan
legos.erc20.dai.address = kovan.erc20.dai.address;

const main = async () => {
//   const amountOut = await contractFlashloanMoneyLego.getAmountOutMin(
//     "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",  
//     // "0x54Ac34e5cE84C501165674782582ADce2FDdc8F4",
//     ethers.utils.parseEther("1000"), 
//     // ["0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", "0xe22da380ee6b445bb8273c81944adeb6e8450422"]
//     ["0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738","0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"]
//  )
// //  let rs =  await amountOut.wait();
//  console.log(ethers.utils.formatEther(amountOut[1]));
  //   const input_data = [
  //     {
  //       tokenIn: legos.erc20.dai.address,
  //       tokenOut: "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
  //       amountIn: ethers.utils.parseEther("1000"),
  //       factory: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  //     },
  //     {
  //       tokenIn: "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
  //       tokenOut: legos.erc20.dai.address,
  //       amountIn: ethers.utils.parseEther("1"),//amountOut[1],
  //       factory: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
  //     }
  //   ]
  const tx = await contractFlashloanMoneyLego.initateFlashLoan(
    [ 0,
      "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
      ethers.utils.parseEther("1000"),
       [
          [
            // input_data[0].tokenIn, 
           
            "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
            // input_data[0].tokenOut, 
            "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
            // "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
            // input_data[0].amountIn, 
            ethers.utils.parseEther("1000"),
            // input_data[0].factory
            "0x54Ac34e5cE84C501165674782582ADce2FDdc8F4",
            // "0x4045DE595907be2D4DF088d8aE956d498d1f6deA"
          ],
          // ["0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738","0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"]
          [
            // input_data[1].tokenIn, 
            "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
            // input_data[1].tokenOut, 
            "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
            // input_data[1].amountIn, 
            ethers.utils.parseEther("1000"),
            // amountOut[1],
            // input_data[1].factory
            "0xECc6C0542710a0EF07966D7d1B10fA38bbb86523"
            // "0x1ff0ecef613Bff4871a0d07b3a22b2BE9125CF37"
          ],
       ]
    ],
    { gasLimit: 12500000, },
  );
  // Inspect the issued transaction
  console.log(tx);
  let receipt = await tx.wait();
  // Inspect the transaction receipt
  console.log(receipt);
  // Inspect the transaction hash
  console.log("Tx Hash: ", receipt.transactionHash);

};

// Run the arbitrage and output the result or error
main().then(console.log).catch(console.error);