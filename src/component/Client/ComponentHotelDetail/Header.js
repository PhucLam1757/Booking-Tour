import React, {useEffect, useState} from "react";
import WebHeader from "../Common/Header";
import TouBanner from '../../../asset/images/TourBanner.jpeg';

export default function ComponentTourDetailHeader(props) {
    const [hotelDetail, setHotelDetail] = useState({})

    useEffect(() => {
        setHotelDetail({...props.hotelDetail})
    }, [props.hotelDetail])

    return (
        <div id="fh5co-page">
            <div id="fh5co-header">
                <WebHeader />
            </div>
            {/* end:fh5co-header */}
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${hotelDetail.hotel_image ? hotelDetail.hotel_image : TouBanner})`}} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row" style={{marginLeft: 0, marginRight: 0}}>
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center" style={{fontWeight: 700}}>{hotelDetail.hotel_name ? hotelDetail.hotel_name : ''}</h1>
                                <p>Cùng đón xem những điều thú vị tại khách sạn này nhé</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}