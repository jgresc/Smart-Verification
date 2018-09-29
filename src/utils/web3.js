import Web3 from 'web3';

let web3;

const connectionTypes = ['Metamask', 'Local', 'Infura'];
const ConnectionType = connectionTypes[1];

if (ConnectionType == 'Metamask') {
    web3 = new Web3(web3.currentProvider);
}
else if (ConnectionType == 'Local') {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

}
else if (ConnectionType == 'Infura') {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/eIMIG0823gmrwdKapAfA"))
} else {
    console.error('No valid connection type')
}


export {web3, ConnectionType};