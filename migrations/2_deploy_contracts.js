const Defi = artifacts.require("./Defi.sol");
const Demo = artifacts.require("./Demo.sol");

module.exports = function (deployer) {
  deployer
    .deploy(Defi, {
      from: "0x1696A1E6129f8aB8FF14b0395054d9BAE8Cbadb4",
      gas: "1000000",
      gasPrice: "470000000000",
    })
    .then(function (contractDefi) {
      deployer.deploy(Demo, contractDefi.address);
    });
};
