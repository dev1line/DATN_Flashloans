import React from "react";
// import getWeb3 from "./getWeb3";

// import contractDefinition from "../contracts/Demo.json";

export default class Web3Container extends React.Component {
  state = { web3: null, accounts: null, contract: null };

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await contractDefinition.networks[networkId];
      // deployedNetwork.address = "0xf474c5736E1B3d6DBd95c3f20F1A561A71c28B0B";
      console.log(
        "deployedNetwork",
        deployedNetwork,
        networkId,
        accounts,
        web3
      );
      if (contractDefinition) {
        const contract = new web3.eth.Contract(
          contractDefinition.abi,
          deployedNetwork && deployedNetwork.address
          // "0xffD6E9Ec54680Ce6CB286a9C77D1051438B4291E"
        );
        // contract.options.address = [
        //   "0xf474c5736E1B3d6DBd95c3f20F1A561A71c28B0B",
        // ];
        this.setState({ web3, accounts, contract });
      } else {
        window.alert("oops");
      }
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  render() {
    const { web3, accounts, contract } = this.state;
    return web3 && accounts ? (
      <div>{this.props.render({ web3, accounts, contract })}</div>
    ) : (
      <div>{this.props.renderLoading()}</div>
    );
  }
}
