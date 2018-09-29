import React, { Component } from 'react'
import { web3, ConnectionType } from '../utils/web3'
import ethTx from "ethereumjs-tx";
class Issuance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keystore: null,
            privateKeyBuffer: null,
            decryptedAccount: null,
            contractAddress: '0x19bB2416CF37779068CC1fE70af412Bf01945686',
            ABI: [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "diplomaHashes", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "byteHash", "type": "bytes32" }], "name": "verifyCertificate", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "byteHash", "type": "bytes32[]" }], "name": "issueCertificate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            owner: null,
            privateKey: null,
            gasPrice: 5,
            usd_price: 0,
            batchDivisor: 10,
            hashArray: [],
            numbFiles: 0,
            fNames: [],
            batches: 0,
            totalGas: 0,
            minimumGas: 0,
            transactionCosts: 0,
            costsDollar: 0,
            txCount: 0

        }
        this.getAccount = this.getAccount.bind(this);
        this.setAccounts = this.setAccounts.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.calculateGas = this.calculateGas.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.calculateGas = this.calculateGas.bind(this);
        this.issueCertificate = this.issueCertificate.bind(this);
    }
    componentDidMount() {
        this.getAccount();
        this.getEthPrice();
    }

    getAccount() {
        this.setAccounts();
    }

    issueCertificate() {
        var that = this;
        let UZHBC = new web3.eth.Contract(this.state.ABI, this.state.contractAddress);
        let pw = document.getElementById("accpw").value;
        if (pw == '') {
            document.getElementById("successtxt").innerHTML = 'Enter password first!';
            document.getElementById("successtxt").hidden = false;
        } else {
            document.getElementById("accpw").value = '';
            web3.eth.personal.unlockAccount(this.state.owner, pw, 1000, (error, result) => {
                if (error) {
                    document.getElementById("successtxt").innerHTML = 'Incorrect Password';
                    document.getElementById("successtxt").hidden = false;
                } else {
                    for (let i = 0; i < this.state.batches; i++) {
                        console.log('Test');
                        let tmpArray = this.state.hashArray.slice(i * this.state.batchDivisor, ((i + 1) * this.state.batchDivisor));
                        if (ConnectionType == 'Infura') {
                            let rawTxData = UZHBC.methods.issueCertificate(tmpArray).encodeABI();
                            let txParams = {
                                nonce: this.state.txCount + i,
                                gasLimit: this.state.minimumGas,
                                to: this.state.contractAddress,
                                from: this.state.owner,
                                value: "0x0",
                                data: rawTxData,
                                gas: this.state.minimumGas,
                                gasPrice: web3.utils.toHex(5000000000)
                            }
                            let tx = new ethTx(txParams);
                            tx.sign(this.state.privateKeyBuffer);
                            let serializedTx = tx.serialize();
                            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
                                if (!err) {
                                    console.log("Success! TX: " + hash);
                                    document.getElementById("transaction").href = "https://rinkeby.etherscan.io/tx/" + hash;
                                    document.getElementById("successtxt").innerHTML = 'Success!';
                                    document.getElementById("successtxt").hidden = false;
                                    document.getElementById("transaction").hidden = false;

                                } else
                                    console.log(err);
                            });

                        }
                        else if (ConnectionType == 'Local') {

                            UZHBC.methods.issueCertificate(tmpArray).send({ from: that.state.owner, gas: web3.utils.toHex(that.state.minimumGas) }, (err, hash) => {
                                if (!err) {
                                    console.log("Success! TX: " + hash);
                                    document.getElementById("transaction").href = "https://rinkeby.etherscan.io/tx/" + hash;
                                    document.getElementById("successtxt").innerHTML = 'Success!';
                                    document.getElementById("successtxt").hidden = false;
                                    document.getElementById("transaction").hidden = false;

                                } else
                                    console.log(err);
                            })

                        }
                    }
                    this.setState({ hashArray: [] });
                }
            })

        }
    }
    calculateGas(array) {
        let that = this;
        this.setState({ totalGas: 0 });
        this.setState({ transactionCosts: 0 });
        this.setState({ costsDollar: 0 });
        let tmpCounter = 0;
        let UZHBC = new web3.eth.Contract(that.state.ABI, that.state.contractAddress);
        for (let i = 0; i < that.state.batches; i++) {
            let tmpArray = array.slice(i * that.state.batchDivisor, ((i + 1) * that.state.batchDivisor));
            UZHBC.methods.issueCertificate(tmpArray).estimateGas({ from: that.state.owner }, (error, result) => {
                if (!error) {
                    if (i == 0) {
                        console.log(result);
                        that.setState({ minimumGas: result });
                    }
                    that.setState({ totalGas: that.state.totalGas + result });
                    tmpCounter++
                    if (tmpCounter == that.state.batches) {
                        console.log(that.state.totalGas);
                        that.setState({ transactionCosts: (that.state.gasPrice * that.state.totalGas) / 1000000000 }, () => {
                            that.setState({ costsDollar: Math.round((that.state.usd_price * that.state.transactionCosts) * 100) / 100 }, () => {
                                document.getElementById("transactionCosts").textContent = that.state.transactionCosts;
                                document.getElementById("costsDollar").textContent = that.state.costsDollar;
                            })
                        });

                    }
                }
            })
        }

    }
    getTxCount() {
        var that = this;
        web3.eth.getTransactionCount(that.state.owner, function (err, txc) {
            if (!err) {
                that.setState({ txCount: web3.utils.toHex(txc) })
            }
        });
    }

    handleFileInputChange(diplomaFiles: FileList) {
        let that = this;
        this.setState({ hashArray: [] });
        document.getElementById("successtxt").innerHTML = '';
        document.getElementById("successtxt").hidden = true;
        document.getElementById("transaction").hidden = true;
        let tmpCounter = 0;
        let _hashArray = [];
        this.setState({ batches: Math.ceil(diplomaFiles.length / this.state.batchDivisor) })
        for (let i = 0; i < diplomaFiles.length; i++) {
            let file = diplomaFiles[i];
            if (file) {
                this.calculateHash(file, diplomaFiles.length, function (file_sha3) {
                    let finalHash = '0x' + file_sha3;
                    _hashArray.push(finalHash);
                    tmpCounter++;
                    if (tmpCounter == diplomaFiles.length) {
                        that.calculateGas(that.state.hashArray);
                        that.setState({ hashArray: _hashArray });
                        document.getElementById('accpw').disabled = false;
                        if (ConnectionType == 'Infura') {
                            document.getElementById('issueButton').disabled = false;
                        }

                    }
                })
            }
        }
        this.setState({ hashArray: _hashArray });
    }
    calculateHash(file, len, callback) {
        let sha3_256 = require('js-sha3').sha3_256;
        let file_sha3;
        let reader = new FileReader();
        reader.onload = function (event) {
            file_sha3 = sha3_256(reader.result);
            callback(file_sha3);
        };
        reader.readAsArrayBuffer(file);
    }
    getBalance() {
        let balance = 0;
        web3.eth.getBalance(this.state.owner, function (error, result) {
            if (!error) {
                balance = Math.round(web3.utils.fromWei((result), 'ether') * 100) / 100
                document.getElementById("Balance").textContent = balance;
            } else {
                console.error(error);
            }
        });

    }
    setAccounts() {
        let that = this;
        if (ConnectionType != 'Infura') {
            web3.eth.getAccounts(function (err, accounts) {
                if (err != null) {
                    console.error("An error occurred: " + err);
                }
                else if (accounts.length == 0) {
                    alert("User is not logged in to " + ConnectionType + ". Log in to Metamask first and refresh this site.");
                }
                else {
                    that.setState({ owner: accounts[0] });
                    that.getBalance(that.state.owner);
                    document.getElementById("gasPrice").textContent = that.state.gasPrice;
                }
            });
        } else {
            this.getAccountFromPk();
        }

    }
    getAccountFromPk() {
        this.setState({ privateKey: 'bfb158522f5fc9de8d2724d815434805773641181ca9aa525fb4c0346f1a8d87' }, () => {
            this.setState({
                decryptedAccount: web3.eth.accounts.privateKeyToAccount(
                    this.state.privateKey.indexOf('0x') === 0 ? this.state.privateKey : '0x' + this.state.privateKey)
            }, () => {
                this.setState({ owner: this.state.decryptedAccount.address }, () => {
                    this.setState({ privateKeyBuffer: new Buffer(this.state.privateKey, 'hex') }, () => {
                        this.getBalance();
                        this.getTxCount();
                        document.getElementById("gasPrice").textContent = this.state.gasPrice;
                        document.getElementById('issueButton').disabled = false;
                        document.getElementById('accpw').disabled = true;
                    })
                })
            })

        });
    }
    ChangeDisabled() {
        document.getElementById('issueButton').disabled = false;
    }
    getEthPrice() {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let data = JSON.parse(xhr.responseText)
                that.setState({ usd_price: data[0].price_usd }, () => {
                    document.getElementById("dollarCosts").textContent = that.state.usd_price;
                });
            }
        }
        xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/ethereum/', true);
        xhr.send(null);
        let puffer = 700000;
        let block = web3.eth.getBlock("latest", function (e, r) {
            //Avg cost for a diploma is 27648 gas, 22386 are the initial cost for the Tx
            that.setState({ batchDivisor: Math.floor((r.gasLimit - puffer - 22386) / 27648) })
        });
    }

    render() {
        const listItems = this.state.hashArray.map((item, index) => <li key={index}>{item}</li>);
        return (
            <section id="issue" className="main special">
                <header className="major">
                    <h2>Issue Diploma</h2>
                </header>
                <ul className="features">
                    <li>
                        <h3>Diploma Selection</h3>
                        <p></p>
                        <div className="input">
                            <div id="droppable-zone">
                                <div id="droppable-zone-wrapper">
                                    <div id="droppable-zone-text">Drop Files Here</div>
                                </div>
                                <input title=" " onChange={(e) => this.handleFileInputChange(e.target.files)}
                                    multiple type="file" accept="application/pdf" id="multipleFiles" className="droppable-file" ></input>
                            </div>
                        </div>
                    </li>
                    <li>
                        <h3>Resulting Hashes</h3>
                        <p></p>
                        <ul id='file-list'>{listItems}</ul>
                    </li>
                </ul>
                <footer className="major">
                    <ul className="features">
                        <li>
                            <input disabled id="accpw" type="password" onChange={this.ChangeDisabled} placeholder="Enter password"></input>
                            <button onClick={this.issueCertificate} id="issueButton" className="button">Issue Diploma</button>
                        </li>
                        <li>Enter Password to unlock Account
                            <div id="successtxt" hidden></div><a hidden target="_blank" id="transaction">See transaction details</a>

                        </li>


                    </ul>
                    <ul className="statistics">
                        <li className="style1">
                            <span className="icon fa-usd"></span>
                            <samp>
                                <div id="dollarCosts"></div>
                            </samp> ETH/USD
        </li>
                        <li className="style2">
                            <span className="icon fa-line-chart"></span>
                            <samp>
                                <div id="gasPrice"></div>
                            </samp>Gas Price in Gwei
        </li>
                        <li className="style3">
                            <span className="icon fa-balance-scale"></span>
                            <samp>
                                <div id="Balance"></div>
                            </samp> Your Ethers
        </li>
                        <li className="style4">
                            <span className="icon fa-btc"></span>
                            <samp>
                                <div id="transactionCosts"></div>
                            </samp>Ether
        </li>
                        <li className="style5">
                            <span className="icon fa-money"></span>
                            <samp>
                                <div id="costsDollar"></div>
                            </samp>$
        </li>
                    </ul>
                </footer>
            </section >

        )
    }
}
export default Issuance;