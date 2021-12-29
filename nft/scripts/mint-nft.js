require("dotenv").config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x1f923a0bd09cd048f7d7c21028802b00a426d9a5";

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);

// create contract instance
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  //   Sign the transaction
  signPromise
    .then((signedTx) => {
      console.log("signedTx", JSON.stringify(signedTx));
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          console.log("sendSignedTransaction--HASH", JSON.stringify(hash));
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

// Call mintNFT and run node contract-interact.js​

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmXVEz5cJV7uYzXNdMucA2g2YQr1MgvfTGKxr9LMkYQbd7"
);

// NOTE

// How to Expose the Metadata for our NFT,
//  Since your app is hosted locally, other app can't access it,you can use ngrok to expose our local host to a public
// accessible URL
//
