import {ethers, BrowserProvider, Wallet, id, verifyMessage} from "ethers";
import {useForm} from "@inertiajs/vue3";

export const matic= {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers) => new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com'),
}
function web3CheckMetamask() {
    if (!window.ethereum) {
        console.error('It seems that the MetaMask extension is not detected. Please install MetaMask first.');
        alert('It seems that the MetaMask extension is not detected. Please install MetaMask first.');
        return false;
    }else{
        console.log('MetaMask extension has been detected!!');
        return true;
    }
}
export const web3Login = async () => {

if (web3CheckMetamask()) {
    // Get the Ethereum provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Get Ethereum accounts
    await provider;
    console.log("Connected!!", provider);
    // Get the User Ethereum address
    const address = await provider.getSigner();
    console.log(address, 'this thing');
    const signer = new Wallet(id('cats'));
    const message = "This message verifies you are the owner of this wallet.";
    try {
       const sig = await signer.signMessage(message);
       verifyMessage(message, sig);
       if (verifyMessage(message, sig) === signer.address) {

           console.log("Verified!", signer.address);
           let userAddress = signer.address;
           let userPublicAddress = address.address;
           return useForm({message, userAddress, sig, userPublicAddress}).post('login-web3')
       } else {
              console.log("Failed to verify.");
       }
    } catch (e) {
        console.log(e);
    }
}
};
