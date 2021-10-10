const Migrations = artifacts.require("./Migrations.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations, {
    from: "0x1696A1E6129f8aB8FF14b0395054d9BAE8Cbadb4",
    gas: "1000000",
    gasPrice: "470000000000",
  });
};
