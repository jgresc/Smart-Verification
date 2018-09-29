import React, { Component } from 'react'
class Introduction extends Component {
    render() {
        return (
            <section id="intro" className="main">
                <div className="spotlight">
                    <div className="content">
                        <header className="major">
                            <h2>Introduction</h2>
                        </header>
                        <p>The falisification of diplomas is an known issue. About 41% of professional certificates are falsified. Therefore,
                            the documents need to be verified by the issuer. This takes a lot of effort for issuers and requesters. Blockchain
                            allows an enhancement of this process, by storing the unique hash of a diploma into the blockchain. Once a document
                            needs to be verified, the hash of it has to be found in the blockchain.
    </p>
                        <ul className="actions">
                            <li>
                                <a href="javascript:alert('In progress.');" className="button">More details</a>
                            </li>
                        </ul>
                    </div>
                    <span className="image">
                        <img src="/images/cert.png" alt=""></img>
                    </span>
                </div>
            </section>
        )
    }
}
export default Introduction;