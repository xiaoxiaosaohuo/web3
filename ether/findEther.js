const { providers, utils } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexidecimal address for the sender
 * @async
 * @returns {Array} all the addresses that receieved ether
 */
async function findEther(address) {
  const balance = await provider.getBalance(address);
  const count = await provider.getTransactionCount(address);
  const number = await provider.getBlockNumber();
  const blockNums = new Array(number);
  const block = await provider.getBlock(number);

  //   console.log(utils.formatEther(balance), count, number);
  let num = 0;
  let transactions = [];
  for (let i of blockNums) {
    num++;
    const block = await provider.getBlock(num);
    transactions = transactions.concat(block.transactions);
  }
  let res = [];
  for (let i of transactions) {
    let data = await provider.getTransaction(i);
    if (data.from === address) {
      res.push(data.to);
    }
  }
  console.log(res);
  return res;
}

module.exports = findEther;
