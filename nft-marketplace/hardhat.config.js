require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey =
  fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/tz9ODV2-iJIm3PC5lGlIBH59uj_ZjqHi",
      accounts: [privateKey],
    },
    mainnet: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/tz9ODV2-iJIm3PC5lGlIBH59uj_ZjqHi",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
