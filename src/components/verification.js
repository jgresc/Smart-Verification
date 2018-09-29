import React, { Component } from 'react'
import Web3 from 'web3';
class Verification extends Component {
    constructor(props) {
        super(props);
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/eIMIG0823gmrwdKapAfA"))
        this.state = {
            contractAddress: '0x19bB2416CF37779068CC1fE70af412Bf01945686',
            ABI: [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "diplomaHashes", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "byteHash", "type": "bytes32" }], "name": "verifyCertificate", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "byteHash", "type": "bytes32[]" }], "name": "issueCertificate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
        }
    }

    verifyCertificate(verifyHash){
        let UZHBC = new this.web3.eth.Contract(this.state.ABI, this.state.contractAddress);
        UZHBC.methods.verifyCertificate(verifyHash).call((error, result) => {
            if (!error) {
                if (result == true) {
                    document.getElementById("verifiedPicture").src = "/images/verified.png";
                    document.getElementById("verifiedPicture").style.opacity = 1;
                    document.getElementById("verifiedLabel").textContent = "This Diploma is verified!";
                    document.getElementById("verifiedLabel").style.opacity = 1;
                } else {
                    document.getElementById("verifiedPicture").src = "/images/verifiedNot.png";
                    document.getElementById("verifiedPicture").style.opacity = 1;
                    document.getElementById("verifiedLabel").textContent = "This Diploma is not verified!";
                    document.getElementById("verifiedLabel").style.opacity = 1;
                }
            }
        });
    }

    handleFileInputChange(diplomaFiles: FileList) {
        let that = this;
        for (let i = 0; i < diplomaFiles.length; i++) {
            let file = diplomaFiles[i];
            if (file) {
                this.calculateHash(file, diplomaFiles.length, function (file_sha3) {
                    let finalHash = '0x' + file_sha3;
                    that.verifyCertificate(finalHash);
                })
            }
        }
    }


    calculateHash(file, len, callback) {
        let that = this;
        let sha3_256 = require('js-sha3').sha3_256;
        let file_sha3;
        let reader = new FileReader();
        reader.onload = function (event) {
            file_sha3 = sha3_256(reader.result);
            callback(file_sha3);
        };
        reader.readAsArrayBuffer(file);
    }
    render() {
        return (
            <section id="verify" className="main special">
                <header className="major">
                    <h2>Verify Diploma</h2>
                    <p hidden>To check if the diploma is authentic, the hash will be generated again.<br></br>
                        If it exists in the smart contract, the hashes will match.<br></br> In this case, the original diploma has not been altered
    and is therefore authentic.</p>
                </header>
                <a href="/images/Diploma_verified.pdf" download >
                    Verified Diploma
</a>


                <a href="/images/Diploma_tampered.pdf" download>
                    Tampered Diploma
</a>

                <ul className="features">
                    <li>
                        <div className="input">
                            <div id="droppable-zone">
                                <div id="droppable-zone-wrapper">
                                    <div id="droppable-zone-text2">Drop File Here</div>
                                </div>
                                <input id="input2" onChange={(e) => this.handleFileInputChange(e.target.files)} type="file" accept="application/pdf" placeholder="Input2" className="droppable-file"></input>
                            </div>
                        </div>
                    </li>
                </ul>
                <footer className="major">
                    <ul className="actions">
                        <li>
                                    <img id="verifiedPicture" src="/images/verified.png" style={{ opacity: 0 }} height="42" width="42"></img>
                                    <label  style={{ opacity: 0 }} id="verifiedLabel">This Diploma is verified!</label>
                        </li>
                    </ul>
                </footer>
            </section>

        )
    }
}
export default Verification;