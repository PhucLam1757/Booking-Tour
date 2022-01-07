import React, {useEffect, useState} from "react";
import WebHeader from "../Common/Header";
import TouBanner from '../../../asset/images/TourBanner.jpeg';

export default function ComponentTourDetailHeader(props) {
    const [tourDetail, setTourDetail] = useState({})

    useEffect(() => {
        setTourDetail({...props.tourDetail})
    }, [props.tourDetail])

    return (
        <div id="fh5co-page">
            <div id="fh5co-header">
                <WebHeader />
            </div>
            {/* end:fh5co-header */}
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${tourDetail.tour_img ? tourDetail.tour_img : TouBanner})`}} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center" style={{fontWeight: 700}}>{tourDetail.tour_name ? tourDetail.tour_name : ''}</h1>
                                <p>Cùng đón xem những điều thú vị tại tour du lịch này nhé</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}