require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/kj7YRy6YmbNuTI1EzCKLNE25MMWii8O4",
        blockNumber: 13234050
      }
    }
  },
  
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },
  paths: {
    artifacts: "./app/artifacts",
  }
};