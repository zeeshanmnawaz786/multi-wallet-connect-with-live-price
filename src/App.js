import React from "react";
import axios from "axios";

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

function App() {
  const { activate, deactivate } = useWeb3React();
  const { active, account, chainId } = useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  });

  var metamask = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  };

  async function getEtherPrice() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const etherPrice = response.data.ethereum.usd;
      console.log(`The current price of Ether is ${etherPrice} USD`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <button onClick={metamask}>Metamask Wallet</button> <br />
      <br />
      <div>Connection Status: {active}</div>
      <div>Account: {account}</div>
      <div>Network ID: {chainId}</div>
      <button onClick={deactivate}>Disconnect</button>
      <button onClick={getEtherPrice}>LIVE PRICE</button>
    </div>
  );
}

export default App;
