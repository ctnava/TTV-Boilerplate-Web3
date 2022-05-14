function diag(web3) {
    window.Twitch.ext.rig.log(`Web3 Compatible: ${web3.isEnabled}`);
    console.log(`Web3 Compatible: ${web3.isEnabled}`);
}
    

module.exports = diag;