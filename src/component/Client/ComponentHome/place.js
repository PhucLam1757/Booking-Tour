import React, { useState, useEffect } from 'react'
import DaNang from '../../../asset/images/danang.jpeg'
import PhuQuoc from '../../../asset/images/phuquoc.jpeg'
import Sapa from '../../../asset/images/sapa.jpeg'
import TourAPI from '../../../API/TourAPI'
import { useNavigate } from 'react-router-dom'

export default function ComponentHomePlace(props) {
    const [allTour, setAllTour] = useState([])
    const navigate = useNavigate()

    const getAllTour = async () => {
        try {
            const tourRes = await TourAPI.getTourByFilter({ search: '', category: 0, dateGo: '', dateReturn: '', page: 1, limit: 3 })
            if (tourRes.data && tourRes.data.success) {
                const tourPayload = tourRes.data.payload.tour
                setAllTour(tourPayload)
            }
            //             adult_price: 1000000
            // category_id: 2
            // category_name: "Trong nước"
            // child_price: 2000000
            // departure_day: "2022-01-05T17:00:00.000Z"
            // go_time: "8 ngày 7 đêm"
            // place_destinate: "Kyoto"
            // place_destination_id: 4
            // place_go: "Kyoto"
            // place_go_id: 4
            // return_day: "2022-01-12T17:00:00.000Z"
            // tour_desc: "kakaakaaaaaaaa"
            // tour_id: 2
            // tour_img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
            // tour_name: "Du lịch hội an ngày hè"
            // tour_policy: "hhshshshshshshshshshshsh"
            // tour_status: "Chưa khởi hành"
            // transport: "Máy bay"
        } catch (error) {
            console.log('get tour error: ', error)
        }
    }

    useEffect(() => {
        getAllTour()
    })
    return (
        <div id="featured-hotel" className="fh5co-bg-color">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>TOUR MỚI NHẤT</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="feature-full-1col">
                        <div className="image" style={{ backgroundImage: `url(${allTour.length && allTour[0].tour_img})` }}>
                            <div className="descrip text-center">
                                <p><small>Chỉ từ</small><span>{allTour.length && allTour[0].child_price}VNĐ/tour</span></p>
                            </div>
                        </div>
                        <div className="desc">
                            <h3>{allTour.length && allTour[0].tour_name}</h3>
                            <p>{allTour.length && allTour[0].tour_desc}</p>

                            {allTour.length &&
                                <p><a className="btn btn-primary btn-luxe-primary" onClick={() => navigate(`/tour/${allTour[0].tour_id}`)}>ĐẶT NGAY<i className="ti-angle-right" /></a></p>
                            }
                        </div>
                    </div>
                    <div className="feature-full-2col">
                        <div className="f-hotel">
                            <div className="image" style={{ backgroundImage: `url(${allTour.length > 1 && allTour[1].tour_img})` }}>
                                <div className="descrip text-center">
                                    <p><small>Giá chỉ từ</small><span>{allTour.length > 1 && allTour[1].child_price}VNĐ/tour</span></p>
                                </div>
                            </div>
                            <div className="desc">
                                <h3>{allTour.length > 1 && allTour[1].tour_name}</h3>
                                <p>{allTour.length > 1 && allTour[1].tour_desc}</p>
                                <p><a className="btn btn-primary btn-luxe-primary" onClick={() => navigate(`/tour/${allTour[1].tour_id}`)}>Đặt ngay<i className="ti-angle-right" /></a></p>
                            </div>
                        </div>
                        <div className="f-hotel">
                            <div className="image" style={{ backgroundImage: `url(${allTour.length > 2 && allTour[2].tour_img})` }}>
                                <div className="descrip text-center">
                                    <p><small>Giá chỉ từ</small><span>{allTour.length > 2 && allTour[2].child_price}VNĐ/tour</span></p>
                                </div>
                            </div>
                            <div className="desc">
                                <h3>{allTour.length > 2 && allTour[2].tour_name}</h3>
                                <p>{allTour.length > 2 && allTour[2].tour_desc}</p>
                                <p><a className="btn btn-primary btn-luxe-primary">Đặt ngay<i className="ti-angle-right" /></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}