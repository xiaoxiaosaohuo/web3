const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account", deployer.address);

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const gretter = await Greeter.deploy("Hello world!");

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await gretter.deployed();
  await token.deployed();
  console.log("Gretter deployed to :", gretter.address);
  console.log("Token deployed to :", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
