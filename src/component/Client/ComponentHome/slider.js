import React, { useEffect } from 'react'
import Slider1 from '../../../asset/images/slider1.jpeg'
import Slider2 from '../../../asset/images/slider2.jpg'

export default function ComponentHomeSlider(props) {
    return (
        <div>
            <aside id="fh5co-hero" className="js-fullheight">
                <div className="flexslider js-fullheight">
                    <ul className="slides">
                        <li style={{ backgroundImage: `url(${Slider1})` }}>
                            <div className="overlay-gradient" />
                            <div className="container">
                                <div className="col-md-12 col-md-offset-0 text-center slider-text">
                                    <div className="slider-text-inner js-fullheight">
                                        <div className="desc">
                                            <p><span>Bora Tour</span></p>
                                            <h2>Reserve Room for Family Vacation</h2>
                                            <p>
                                                <a href="#" className="btn btn-primary btn-lg">Book Now</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li style={{ backgroundImage: `url(${Slider2})` }}>
                            <div className="overlay-gradient" />
                            <div className="container">
                                <div className="col-md-12 col-md-offset-0 text-center slider-text">
                                    <div className="slider-text-inner js-fullheight">
                                        <div className="desc">
                                            <p><span>Deluxe Tour</span></p>
                                            <h2>Make Your Vacation Comfortable</h2>
                                            <p>
                                                <a href="#" className="btn btn-primary btn-lg">Book Now</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li style={{ backgroundImage: 'url(images/slider3.jpg)' }}>
                            <div className="overlay-gradient" />
                            <div className="container">
                                <div className="col-md-12 col-md-offset-0 text-center slider-text">
                                    <div className="slider-text-inner js-fullheight">
                                        <div className="desc">
                                            <p><span>Luxe Tour</span></p>
                                            <h2>A Best Place To Enjoy Your Life</h2>
                                            <p>
                                                <a href="#" className="btn btn-primary btn-lg">Book Now</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div id="availability">
                            <form action="#">
                                <div className="a-col">
                                    <section>
                                        <select className="cs-select cs-skin-border">
                                            <option value disabled selected>Select Hotel</option>
                                            <option value="email">Luxe Hotel</option>
                                            <option value="twitter">Deluxe Hotel</option>
                                            <option value="linkedin">Five Star Hotel</option>
                                        </select>
                                    </section>
                                </div>
                                <div className="a-col alternate">
                                    <div className="input-field">
                                        <label htmlFor="date-start">Check In</label>
                                        <input type="text" className="form-control" id="date-start" />
                                    </div>
                                </div>
                                <div className="a-col alternate">
                                    <div className="input-field">
                                        <label htmlFor="date-end">Check Out</label>
                                        <input type="text" className="form-control" id="date-end" />
                                    </div>
                                </div>
                                <div className="a-col action">
                                    <a href="#">
                                        <span>Check</span>
                                        Availability
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-counter-section" className="fh5co-counters">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <span className="fh5co-counter js-counter" data-from={0} data-to={20356} data-speed={5000} data-refresh-interval={50} />
                            <span className="fh5co-counter-label">User Access</span>
                        </div>
                        <div className="col-md-3 text-center">
                            <span className="fh5co-counter js-counter" data-from={0} data-to={15501} data-speed={5000} data-refresh-interval={50} />
                            <span className="fh5co-counter-label">Hotels</span>
                        </div>
                        <div className="col-md-3 text-center">
                            <span className="fh5co-counter js-counter" data-from={0} data-to={8200} data-speed={5000} data-refresh-interval={50} />
                            <span className="fh5co-counter-label">Transactions</span>
                        </div>
                        <div className="col-md-3 text-center">
                            <span className="fh5co-counter js-counter" data-from={0} data-to={8763} data-speed={5000} data-refresh-interval={50} />
                            <span className="fh5co-counter-label">Rating &amp; Review</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}