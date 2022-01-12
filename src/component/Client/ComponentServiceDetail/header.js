import React from "react";
import WebHeader from "../Common/Header";
import ServiceBanner from '../../../asset/images/service-banner.jpeg'

export default function ComponentServiceDetailHeader(props) {
    return (
        <div id="fh5co-page">
            <div id="fh5co-header">
                <WebHeader />
            </div>
            {/* end:fh5co-header */}
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${ServiceBanner})` }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                {/* <h1 className="text-center">TIN TỨC DU LỊCH</h1>
                                <p>NHỮNG TIN TỨC MỚI NHẤT TRONG NGÀY
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}