import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Particles from 'react-particles-js';

import { Footer, Navbar, Introduction, Issuance, Verification } from './Components'
class App extends Component {
    constructor(props) {
        super(props)
        this.state={
             contractAddress : '0x19bB2416CF37779068CC1fE70af412Bf01945686',
             connectionTypes : ['Metamask', 'Local', 'Infura']
        }
    }
    render() {
        return (
            <div id="wrapper">
                <header id="header" className="alt">
                    <span className="logo">
                        <img src="" alt=""></img>
                    </span>
                    <h1>UZHBC</h1>
                    <p>Issuing and verifying diplomas through blockchain<br></br> A prototype created by<a href="">Jerinas Gresch</a></p>
                </header>
            <Particles
                params={{
                    particles: {
                        number: {
                            value: 50
                        },
                        line_linked: {
                            shadow: {
                                enable: false,
                                color: "#000000",
                                blur: 5
                            }
                        }
                    
                    },
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                />
                <Navbar />
                <div id="main">
                    <Introduction />
                    <Issuance />
                    <Verification />
                </div>
                <Footer />
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))