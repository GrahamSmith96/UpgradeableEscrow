require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();


module.exports = {
  solidity: "0.7.5",
  networks: {
    hardhat: {
      forking: {
        url: process.env.FORKING_URL,
        blockNumber: 11395144
      }
    }
  },
  paths: {
    artifacts: "./app/artifacts",
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }

};
