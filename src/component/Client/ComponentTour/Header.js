import React from "react";
import WebHeader from "../Common/Header";
import TouBanner from '../../../asset/images/TourBanner.jpeg';

export default function ComponentTourHeader(props) {
    return (
        <div id="fh5co-page">
            <div id="fh5co-header">
                <WebHeader />
            </div>
            {/* end:fh5co-header */}
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${TouBanner})`}} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center">TOUR DU LỊCH</h1>
                                <p>Những trải nghiệm đặc biệt đang chờ đợi bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}