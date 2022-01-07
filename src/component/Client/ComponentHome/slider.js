import React, { useEffect } from 'react'
import Slider1 from '../../../asset/images/slider1.jpeg'
import Slider2 from '../../../asset/images/slider2.jpg'

export default function ComponentHomeSlider(props) {
    return (
        <div>
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${Slider1})` }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center" style={{fontWeight: '800'}}>DU LỊCH CÙNG AATOURIST</h1>
                                <p style={{fontWeight: '600'}}>TOUR PHÚ QUỐC ƯU ĐÃI CỰC KHỦNG<a href="http://freehtml5.co">Xem ngay</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div id="availability">
                            <form action="#">
                                <div className="a-col alternate">
                                    <section style={{height: '100%', marginTop: '4px'}}>
                                        <label style={{color: 'white'}}>Địa điểm đi</label>
                                        <select className="input-field" style={{height: '65%'}}>
                                            <option value disabled selected>Select Tourest</option>
                                            <option value="email">Luxe Hotel</option>
                                            <option value="twitter">Deluxe Hotel</option>
                                            <option value="linkedin">Five Star Hotel</option>
                                        </select>
                                    </section>
                                </div>
                                <div className="a-col alternate">
                                    <section style={{height: '100%', marginTop: '4px'}}>
                                        <label style={{color: 'white'}}>Địa điểm đến</label>
                                        <select className="input-field" style={{height: '65%'}}>
                                            <option value disabled selected>Select Tourest</option>
                                            <option value="email">Luxe Hotel</option>
                                            <option value="twitter">Deluxe Hotel</option>
                                            <option value="linkedin">Five Star Hotel</option>
                                        </select>
                                    </section>
                                </div>
                                <div className="a-col alternate">
                                    <div className="input-field">
                                        <label htmlFor="date-start">Ngày đi</label>
                                        <input type="text" className="form-control" id="date-start" type="date" />
                                    </div>
                                </div>
                                <div className="a-col alternate">
                                    <div className="input-field">
                                        <label htmlFor="date-end">Ngày về</label>
                                        <input type="text" className="form-control" id="date-end" type="date" />
                                    </div>
                                </div>
                                <div className="a-col action">
                                    <a href="#">
                                        <span>Kiểm tra</span>
                                        Tour phù hợp
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