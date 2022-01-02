import React from 'react'

export default function WebHeader(props) {
    return (
        <header id="fh5co-header-section">
            <div className="container">
                <div className="nav-header">
                    <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle"><i /></a>
                    <h1 id="fh5co-logo"><a href="index.html">Luxe</a></h1>
                    <nav id="fh5co-menu-wrap" role="navigation">
                        <ul className="sf-menu" id="fh5co-primary-menu">
                            <li><a href="/">Home</a></li>
                            <li>
                                <a href="hotel.html" className="fh5co-sub-ddown">Tour</a>
                                <ul className="fh5co-sub-menu">
                                    <li><a href="#">Trong nước</a></li>
                                    <li><a href="#">Ngoài nước</a></li>
                                    {/* <li>
                                        <a href="#" className="fh5co-sub-ddown">King Hotel</a>
                                        <ul className="fh5co-sub-menu">
                                            <li><a href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template" target="_blank">Build</a></li>
                                            <li><a href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap" target="_blank">Work</a></li>
                                            <li><a href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap" target="_blank">Light</a></li>
                                            <li><a href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap" target="_blank">Relic</a></li>
                                            <li><a href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap" target="_blank">Display</a></li>
                                            <li><a href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap" target="_blank">Sprint</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Five Star Hotel</a></li> */}
                                </ul>
                            </li>
                            <li><a href="/service">Services</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}