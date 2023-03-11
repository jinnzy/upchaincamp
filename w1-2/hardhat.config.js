require("@nomicfoundation/hardhat-toolbox");
let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })
/** @type import('hardhat/config').HardhatUserConfig */

const mnemonic = process.env.MNEMONIC
const scanKey = process.env.API_KEY

module.exports = {
  solidity: "0.8.18",
  networks: {
    development: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      chainId: 80001,
      accounts: {
        mnemonic: mnemonic,
      }
    },
  },
  etherscan: {
      apiKey: scanKey
  }
};
