#  Academic certificate verification through Blockchain
In this repo, a prototype to issue and verify academic certificates is presented. This project was tailored to the requirements of the University of Zurich (UZH), which is why the name UZHBC (Blockchain) was chosen.

<img src="https://github.com/jgresc/UZHBC/blob/master/public/images/Issuance.PNG?raw=true" width="750">

## Documentation
The client of UZHBC is a web application implemented with React. The root file App.js, which contains the different React components, is located in the `\src` folder. The respective components footer, index, navbar, introduction, issuance and verification are located in `\src\components`. Issuance.js implements the issuance process and verification.js implements the verification process. The connection to the blockchain is implemented in the web3.js file, and is located in the `\src\utils` directory. Changes to the code can be recompiled by opening a console in the root folder and run `webpack --w`, which creates a bundle.js that can be found in `\public\build`. All versions of the smart contract are located in the `\contracts` directory. However, these do not run on the client, but on the Rinkeby blockchain. All representation specific implementations can be found in the `\public\assets`.

## Installation
To install the the system, follow the listed steps:

* Clone this repo.
* The system is connected with the rinkeby testnet. Thus, [geth](https://github.com/ethereum/go-ethereum/wiki/geth) needs to be installed.
* Open the console an run ` geth --rinkeby --fast --rpc --rpccorsdomain "*" --rpcapi "admin,eth,web3,personal,net" console`.
* Next, open another console and run `geth attach http://localhost:8545` to connect the system with the geth node.
* In case another Ethereum Network or Account wants to be used, adjust `src/utils/web3.js`

## Deployment

Once geth is synchronized, `cd` into the repo and run
```
  nodemon
```
Open a browser on [http://localhost:3000/](http://localhost:3000/).<br />
In the issuing section, PDF files can be handled as an input, that generates a unique hash for each file.<br />
The SHA3-256 was used. An online checksum calculator based on the same algorithm can be found [here](https://emn178.github.io/online-tools/sha3_256_checksum.html). <br/>
To send the hashes to the smart contract, the account needs to be unlocked with a password (123456789).

## Miscellaneous

The deployed smart contract on the Rinkeby Testnet can be found at the address [0x19bB2416CF37779068CC1fE70af412Bf01945686](https://rinkeby.etherscan.io/address/0x19bb2416cf37779068cc1fe70af412bf01945686).
