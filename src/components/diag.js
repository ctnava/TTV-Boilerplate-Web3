const diag = (twitch, type, web3Compatible) => {
    var twitch = window.Twitch ? window.Twitch.ext : null;
    if (twitch) {
        twitch.rig.log("TTV Detected");
        twitch.rig.log(`Attempting to display ${type}`);
        twitch.rig.log(`Web3 Compatible: ${web3Compatible}`);
    } else console.log("TTV not Detected");
    console.log(`Attempting to display ${type}`);
    console.log(`Web3 Compatible: ${web3Compatible}`);
};


module.exports = diag;