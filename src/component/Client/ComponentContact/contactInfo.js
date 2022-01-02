import React from "react";

export default function ComponentContactInfo(props) {
    return (
        <div id="fh5co-contact-section">
            <div className="row">
                <div className="col-md-6">
                    <div id="map" className="fh5co-map" />
                </div>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h3>Our Address</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <ul className="contact-info">
                            <li><i className="ti-map" />198 West 21th Street, Suite 721 New York NY 10016</li>
                            <li><i className="ti-mobile" />+ 1235 2355 98</li>
                            <li><i className="ti-envelope" /><a href="#">info@yoursite.com</a></li>
                            <li><i className="ti-home" /><a href="#">www.yoursite.com</a></li>
                        </ul>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea name className="form-control" id cols={30} rows={7} placeholder="Message" defaultValue={""} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="submit" defaultValue="Send Message" className="btn btn-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}