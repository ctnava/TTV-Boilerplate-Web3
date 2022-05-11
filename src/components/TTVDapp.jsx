import React, { useState, useEffect } from 'react';
import oauth from './OAuth/utils';
import ttv from './resources/ttvUtils';
import dapp from './resources/web3Utils';
import './resources/styles.css';


import Config from './Config/Config';
import App from "./App/App";


function TTVDapp(props) {
    var web3Compatible = (dapp.provider() !== false);
    const [client, setClient] = useState(dapp.defaultState);


    useEffect(() => {
        if (window.ethereum) {
            dapp.reloadAsNecessary();
            if (!dapp.connected()) new Promise (() => {
                dapp.getClient()
                .then(newClient => { setClient(newClient) })
                .catch(e => { console.log(e) });
            });
        }
    }, [client]);


    var twitch = window.Twitch ? window.Twitch.ext : null;
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(oauth.defaultState);
    const [theme, setTheme] = useState('light');
    const themeClass = (theme === 'light') ? ('Ext-light') : ('Ext-dark');
    const [visible, setVisible] = useState(true);

    
    useEffect(() => {
        if (twitch) {
            ttv.authorize(twitch, setAuth, loading, setLoading);
            ttv.updateContext(twitch, setTheme);
            if (props.type !== "Config") {
                if (props.type !== "LiveConfig") ttv.updateVisibility(twitch, setVisible);
                ttv.listen(twitch);
                return ttv.unmount(twitch);
            }
        }
    }, [loading]);


    if (twitch) {
        twitch.log(`Returning ${props.type}`);
        twitch.log(`Web3 Compatible: ${web3Compatible}`);
    } else {
        console.log(`Returning ${props.type}`);
        console.log(`Web3 Compatible: ${web3Compatible}`);
    }
    switch (props.type) {
        case "Config":
            return(<Config 
                type="static"
                client={client}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "LiveConfig":
            return(<Config 
                type="live"
                client={client}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "Mobile":
            return(<App 
                client={client}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "Panel":
            return(<App 
                client={client}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoComponent":
            return(<App 
                client={client}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoOverlay":
            return(<App 
                client={client}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        default:
            return(<div>INVALID EXTENSION TYPE</div>);
    }
}


export default TTVDapp;