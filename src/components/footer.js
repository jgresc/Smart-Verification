import React, {Component} from 'react'
class Footer extends Component{
    render(){
        return(
<footer id="footer">
    <div hidden>
        <section>
            <h2>Schlusswort</h2>
            <p>Schlusstext Schlusstext Schlusstext Schlusstext Schlusstext</p>
            <ul className="actions">
                <li>
                    <a href="#" className="button">Learn More</a>
                </li>
            </ul>
        </section>
    </div>

    <section>
        <h2>Contact Information</h2>
        <dl className="alt">
            <dt>Address</dt>
            <dd>Binzmühlestrasse 14 &bull; 8050 Zürich &bull; CH</dd>
            <dt>Email</dt>
            <dd>
                <a href="#">jerinas.gresch@gmail.com</a>
            </dd>
        </dl>
        <ul className="icons">
            <li>
                <a href="#" className="icon fa-twitter alt">
                    <span className="label">Twitter</span>
                </a>
            </li>
            <li>
                <a href="#" className="icon fa-facebook alt">
                    <span className="label">Facebook</span>
                </a>
            </li>
            <li>
                <a href="#" className="icon fa-instagram alt">
                    <span className="label">Instagram</span>
                </a>
            </li>
            <li>
                <a href="#" className="icon fa-github alt">
                    <span className="label">GitHub</span>
                </a>
            </li>
            <li>
                <a href="#" className="icon fa-dribbble alt">
                    <span className="label">Dribbble</span>
                </a>
            </li>
        </ul>
    </section>

</footer>
        )
    }
}
export default Footer;