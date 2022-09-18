const { ethers, providers } = require("ethers");
// require("dotenv").config();
const { useUnityContext } = require("react-unity-webgl");
const REC_WALLET_KEY = require("./.env");
const { ethereum } = window;



const amt = "0.01";
const network = "https://api.avax-test.network/ext/bc/C/rpc";
// const provider = new ethers.providers.JsonRpcProvider(network);
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
// const nodeURL = "https://api.avax-test.network/ext/bc/C/rpc"
// const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL)
let accounts;
async function connectWithMetamask() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());
    accounts =  await signer.getAddress()
    // accounts = await provider.send({ method: 'eth_requestAccounts' });
}




async function sendMoni( avax) {
    ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts,
          to: "0x07BeFe2d856E3E6658613583943D5dE394e3682b",
          value: 1e17.toString(16),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
}

async function getBalance() {
    try {
        console.log("inside fn");
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        const balance = await signer.getBalance();
        const converttoeth = 1e18;
        console.log("account balance", balance.toString() / converttoeth);

        let lab = balance.toString() / converttoeth;
        return balance.toString() / converttoeth;
        
    } catch (err) {
        console.log(err);   
        console.log("err");
    }
}

module.exports = {
    connectWithMetamask,
    getBalance,
    sendMoni
}