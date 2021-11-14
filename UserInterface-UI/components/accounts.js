import React from "react";

const Accounts = ({ accounts, contract }) => {
  const [fee, setFee] = React.useState(0);
  const handleAddFee = async () => {
    console.log("contract:", contract);
    const value = await contract.method.flashloanBnb(1000000000000000000);
    console.log("value:", value, contract);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFee(e.target.value);
  };
  return (
    <div>
      <h1>Fee: {fee} </h1>
      <pre>{JSON.stringify(accounts[0], null, 4)}</pre>
      <input type="text" value={fee} onChange={(e) => handleChange(e)} />
      <button onClick={handleAddFee}>Flashloans</button>
    </div>
  );
};

export default Accounts;
