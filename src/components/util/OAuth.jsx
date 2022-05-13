import React from 'react';
import oauth from './ttvOauth';
import dapp from './web3';


function OAuth(props) {
    // console.log("displaying", props.auth)
    const web3Extended = window.ethereum !== null && window.ethereum !== undefined;
    return (<div>

        <h3>TTV USER CREDENTIALS</h3>
        <ul>
        <li>Web3 Extended: {(web3Extended).toString()}</li>
            <li>channelId: {props.auth.channelId}</li>
            <li>clientId: {props.auth.clientId}</li>
            <li>opaqueId: {props.auth.opaqueId}</li>
            <li>userId: {oauth.user.isIdentified(props.auth) ? props.auth.userId:"hidden"}</li>
            <li>loginStatus: {oauth.user.isLoggedIn(props.auth).toString()}</li>
            <li>role: {props.auth.role}</li>
        </ul>

        <hr/>

        {dapp.connected() && web3Extended && (<div>
            <h3>WEB3 USER CREDENTIALS</h3>
            <ul>
                <li>chainId: {props.client.chainId}</li>
                <li>address: {props.client.signer.address}</li>
            </ul>
        </div>)}


        {oauth.hasRole.moderator(props.auth) && (<input value='mod verification button' type='button'/>)}

    </div>);
}


export default OAuth;