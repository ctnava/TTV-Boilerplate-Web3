import diag from './diag';
import oauth from './util/ttvOauth';
import dapp from './util/web3';

import './styles.css';
import React, { useState, useEffect } from 'react';
import Config from './Config/Config';
import App from "./App/App";


function TTV(props) { 
    // Basic States
    const [loading, setLoading] = useState(true);

    // Web3
    var web3Compatible = (dapp.provider() !== false); diag(twitch, props.type, web3Compatible);
    const [client, setClient] = useState(dapp.defaultState);
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {window.location.reload()});
            window.ethereum.on('accountsChanged', () => {window.location.reload()});

            if (!dapp.connected() && auth.role === "broadcaster") new Promise (() => {
                dapp.getClient()
                .then(newClient => { setClient(newClient) })
                .catch(e => { console.log(e) });
            });
        }
    }, [client]);

    // TTV Extension, States, & Setup Effects
    var twitch = window.Twitch ? window.Twitch.ext : false;
    const [auth, setAuth] = useState(oauth.states.initial);
    const [theme, setTheme] = useState('light');
    const themeClass = (theme === 'light') ? ('Ext-light') : ('Ext-dark');
    const [visible, setVisible] = useState(true);
    useEffect(() => { 
        if (twitch) {
            twitch.onAuthorized((credentials)=>{
                oauth.set(credentials, setAuth);
                if (loading) {
                    // additionalSetup();
                    setLoading(false);
                } 
            });
        
            twitch.onContext((context, delta) => { if(delta.includes('theme')) setTheme(context.theme)});

            if (props.type !== "Config") {
                if (props.type !== "LiveConfig") twitch.onVisibilityChanged((visibility, _c) => {setVisible(visibility)});

                twitch.listen('broadcast', (target, contentType, body)=>{
                    twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`);
                    // otherActions(target, contentType, body);
                });

                return twitch.unlisten('broadcast', () => {twitch.rig.log('successfully unlistened')});
            }
        }
    }, [loading]);


    switch (props.type) {
        case "Config":
            return(<Config 
                client={client}
                type="Static"
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "LiveConfig":
            return(<Config 
                client={client}
                type="Live"
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                auth={auth}
            />);

        case "Mobile":
            return(<App 
                client={client}
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "Panel":
            return(<App 
                client={client}
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoComponent":
            return(<App 
                client={client}
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        case "VideoOverlay":
            return(<App 
                client={client}
                type={props.type}
                twitch={twitch}
                themeClass={themeClass}
                loading={loading}
                visible={visible}
                auth={auth}
            />);

        default:
            return(<div>INVALID EXTENSION TYPE</div>);
    }
}


export default TTV;