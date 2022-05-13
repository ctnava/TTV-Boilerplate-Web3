import { ethers } from "ethers";


const defaultState = {
    signer: undefined,
    chainId: undefined
}


async function getClient() {
    const signer = await provider().getSigner();
    const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }), 16);
    return { signer, chainId };
}


const provider = () => { 
    if (!window.ethereum) return false;
    else return new ethers.providers.Web3Provider(window.ethereum);
}


const connected = (client) => {return (client !== defaultState)};


export default { defaultState, getClient, provider, connected };