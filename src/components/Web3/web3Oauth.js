import { ethers } from "ethers";
const defaultProvider = new ethers.providers.JsonRpcProvider(process.env.WEB3_RPC);


const states = {
    initial: {
        provider: defaultProvider,
        signer: undefined,
        address: undefined,
        chainId: undefined
    }
};


async function setup() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const address = (await provider.request({ method: 'eth_requestAccounts' }))[0];
    const chainId = parseInt(await provider.request({ method: 'eth_chainId' }), 16);
    return { provider, signer, address, chainId };
}


const failure = (err) => {console.log("ERROR: @Web3 Setup: ", err)};
const userIsConnected = (client) => {return (client !== states.initial)};
const isEnabled = (window.ethereum !== undefined);


export default { 
    states, 
    setup,
    failure,
    isEnabled,
    userIsConnected
};