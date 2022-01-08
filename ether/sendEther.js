const ethers = require("ethers");
async function main() {
  // Ganache RPC server URL
  const url = "HTTP://127.0.0.1:7545";

  // connect to our local Ganache blockchain
  const provider = new ethers.providers.JsonRpcProvider(url);

  // copy-paste a private key from a Ganache account!
  const privateKey =
    "56b3c9bcc3e62221cd1677dc1ce753caa78cacd40a1da9171815ff2b188e5c39";

  // let's create a Wallet instance so that our sender can... send!
  const wallet = new ethers.Wallet(privateKey, provider);

  // getting the accounts + balances
  const signer1 = provider.getSigner(1); // account we will send eth to
  const addr1 = await signer1.getAddress();
  console.log("addr1", addr1);
  const walletBalance = await wallet.getBalance();

  console.log(
    "Balance of sender address before tx: " +
      ethers.utils.formatEther(walletBalance)
  );

  console.log("Sending ether from " + wallet.address + " to " + addr1);

  const tx = await wallet.sendTransaction({
    to: addr1,
    value: ethers.utils.parseEther("22.0"),
  });

  // waits for the tx to be mined so that any subsequent queries are accurate
  const receipt = await tx.wait();
  const balanceAfter = await wallet.getBalance();
  console.log(
    "Balance of sender address after tx: " +
      ethers.utils.formatEther(balanceAfter)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
