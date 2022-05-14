import diag from './diag';
import web3 from './web3Oauth';

import React, { useState, useEffect } from 'react';


function Web3(props) { diag(web3);
    // Web3
    const [client, setClient] = useState(web3.states.initial);
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {window.location.reload()});
            window.ethereum.on('accountsChanged', () => {window.location.reload()});
        }
    }, [client]);

    function connectWeb3(event) {
        event.preventDefault();
        web3.setup()
            .then(newClient => {setClient(newClient)})
            .catch(err => {web3.failure(err)});
    }

    return(<div>

        <h3>WEB3 USER CREDENTIALS</h3>
        <ul>
            <li>Web3 Extended: {(web3.isEnabled).toString()}</li>
            {web3.userIsConnected(client) && (<li>address: {props.client.address}</li>)}
            {web3.userIsConnected(client) && (<li>chainId: {props.client.chainId}</li>)}
        </ul>

        {web3.isEnabled === true && 
        !web3.userIsConnected(props.client) && 
        props.auth.role === "broadcaster" && 
        (<input onClick={connectWeb3} type='button' value='Connect Web3 Wallet' />)}

    </div>);   
}


export default Web3;