import React, { Component } from 'react'
class Navbar extends Component {
    render() {
        return (
            <nav id="nav">
                <ul>
                    <li>
                        <a href="#intro">Introduction</a>
                    </li>
                    <li>
                        <a href="#issue">Issue Diploma</a>
                    </li>
                    <li>
                        <a href="#verify">Verify Diploma</a>
                    </li>
                </ul>
            </nav>
           
        )
    }
}
export default Navbar;