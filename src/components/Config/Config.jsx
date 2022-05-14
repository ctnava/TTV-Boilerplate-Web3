import diag from './diag';
import oauth from '../OAuth.jsx/ttvOauth';

import React from 'react';
import RequestPanel from './RequestPanel';
import OAuth from '../OAuth.jsx/OAuth';
import Web3 from '../Web3/Web3';


function Config(props) { diag(props.twitch, props.type, props.loading, props.auth);
    
    return(<div className={`Ext ${props.themeClass}`}>
        <h1>Config - {props.type}</h1>
        <hr/>
        { !props.loading ? (

            props.type === "Live" ? (

                oauth.hasRole.moderator(props.auth) ? (
                    
                    <RequestPanel auth={props.auth} />
                
                ) : (<p>User not Moderator</p>)

            ) : (<div>
                <p>Configuration Not Required</p>
                <OAuth auth={props.auth} />
                <hr/>
                <Web3 auth={props.auth }/>
            </div>)

        ) : (<p>Loading...</p>) }
    </div>);
}


export default Config;