const { assert } = require("chai");
const listen = require("../index");

const mineBlock = () => ethers.provider.send("evm_mine");

describe("Contract", function () {
  let contract;
  let a1;
  let a2;
  before(async () => {
    await network.provider.send("evm_setAutomine", [false]);
    await network.provider.send("evm_setIntervalMining", [10]);
    const accounts = await ethers.provider.listAccounts();
    a1 = accounts[0];
    a2 = accounts[1];

    const Contract = await ethers.getContractFactory("Contract");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  describe("after adding the listener", () => {
    let beforeBalance;
    before(async () => {
      listen(contract);
      beforeBalance = await ethers.provider.getBalance(a1);
      const tx = await contract
        .connect(ethers.provider.getSigner(a2))
        .deposit({ value: ethers.utils.parseEther("1") });
      await tx.wait();
    });

    it("should withdraw on a deposit", async () => {
      await mineBlock();
      const afterBalance = await ethers.provider.getBalance(a1);
      const contractBalance = await ethers.provider.getBalance(
        contract.address
      );
      assert(
        contractBalance.eq(0),
        "Expected the contract balance to be withdrawn!"
      );
      assert(
        afterBalance.gt(beforeBalance),
        "Expected the signer's account balance to increase!"
      );
    });
  });
});
