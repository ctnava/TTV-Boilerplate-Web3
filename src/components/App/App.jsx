import diag from './diag';
import React from 'react';
import OAuth from '../OAuth.jsx/OAuth';
import Web3 from '../Web3/Web3';


function App(props) { diag(props.twitch, props.type, props.loading, props.visible);

    return(<div className={`Ext ${props.themeClass}`}>
        <h1>App - {props.type}</h1>
        <hr/>
        {(!props.loading && props.visible) ? (<div>
        
            <OAuth auth={props.auth} />
            <hr/>
            <Web3 auth={props.auth} />
        
        </div>) : "Loading..."}
    </div>);
}


export default App;