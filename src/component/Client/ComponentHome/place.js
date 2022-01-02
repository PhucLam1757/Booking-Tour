import React from 'react'
import DaNang from '../../../asset/images/danang.jpeg'
import PhuQuoc from '../../../asset/images/phuquoc.jpeg'
import Sapa from '../../../asset/images/sapa.jpeg'

export default function ComponentHomePlace(props) {
    return (
        <div id="featured-hotel" className="fh5co-bg-color">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>Featured Tour</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="feature-full-1col">
                        <div className="image" style={{ backgroundImage: `url(${DaNang})` }}>
                            <div className="descrip text-center">
                                <p><small>For as low as</small><span>$100/tour</span></p>
                            </div>
                        </div>
                        <div className="desc">
                            <h3>Đà Nẵng</h3>
                            <p>Pellentesque habitant morbi tristique senectus et netus ett mauada fames ac turpis
                                egestas. Etiam euismod tempor leo, in suscipit urna condimentum sed. Vivamus augue
                                enim, consectetur ac interdum a, pulvinar ac massa. Nullam malesuada congue </p>
                            <p><a href="#" className="btn btn-primary btn-luxe-primary">Book Now <i className="ti-angle-right" /></a></p>
                        </div>
                    </div>
                    <div className="feature-full-2col">
                        <div className="f-hotel">
                            <div className="image" style={{ backgroundImage: `url(${PhuQuoc})` }}>
                                <div className="descrip text-center">
                                    <p><small>For as low as</small><span>$99/night</span></p>
                                </div>
                            </div>
                            <div className="desc">
                                <h3>Phú Quốc</h3>
                                <p>Pellentesque habitant morbi tristique senectus et netus ett mauada fames ac
                                    turpis egestas. Etiam euismod tempor leo,
                                    in suscipit urna condimentum sed. </p>
                                <p><a href="#" className="btn btn-primary btn-luxe-primary">Book Now <i className="ti-angle-right" /></a></p>
                            </div>
                        </div>
                        <div className="f-hotel">
                            <div className="image" style={{ backgroundImage: `url(${Sapa})` }}>
                                <div className="descrip text-center">
                                    <p><small>For as low as</small><span>$99/night</span></p>
                                </div>
                            </div>
                            <div className="desc">
                                <h3>Sa Pa</h3>
                                <p>Pellentesque habitant morbi tristique senectus et netus ett mauada fames ac
                                    turpis egestas. Etiam euismod tempor leo, in suscipit urna condimentum sed. </p>
                                <p><a href="#" className="btn btn-primary btn-luxe-primary">Book Now <i className="ti-angle-right" /></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}