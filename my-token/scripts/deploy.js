async function main() {
  const Token = await hre.ethers.getContractFactory("MyToken"); // hre: hardhat runtime environment
  const token = await Token.deploy("My Token", "MyToken"); // call constructor: name and symbol
  console.log("Token address:", token.address); // print the address to the console
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); // print the error if there happens to be one
    process.exit(1);
  });
