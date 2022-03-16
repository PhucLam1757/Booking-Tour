import React, { useState, useEffect } from 'react'
import DaNang from '../../../asset/images/danang.jpeg'
import PhuQuoc from '../../../asset/images/phuquoc.jpeg'
import Sapa from '../../../asset/images/sapa.jpeg'
import TourAPI from '../../../API/TourAPI'
import { useNavigate } from 'react-router-dom'

export default function ComponentHomePlace(props) {
    const [allTour, setAllTour] = useState([])
    const navigate = useNavigate()
    var nf = new Intl.NumberFormat();

    const getAllTour = async () => {
        try {
            const tourRes = await TourAPI.getTourByFilter({ search: '', category: 0, dateGo: '', dateReturn: '', page: 1, limit: 3 })
            if (tourRes.data && tourRes.data.success) {
                const tourPayload = tourRes.data.payload.tour
                setAllTour(tourPayload)
            }
        } catch (error) {
            console.log('get tour error: ', error)
        }
    }
    useEffect(() => {
        getAllTour()
    },[])

    return (
        <div id="featured-hotel" className="fh5co-bg-color">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2><b>TOUR MỚI NHẤT</b></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="feature-full-1col">
                        <div className="image" style={{ backgroundImage: `url(${allTour.length && allTour[0].tour_img})` }}>
                            <div className="descrip text-center">
                                <p><small>Chỉ từ</small><span>{allTour.length && nf.format(allTour[0].child_price)}VNĐ/tour</span></p>
                            </div>
                        </div>
                        <div className="desc">
                            <h3>{allTour.length && allTour[0].tour_name}</h3>
                            <p style={{maxHeight: '100px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{allTour.length && allTour[0].about}</p>

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
                                <p style={{maxHeight: '100px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{allTour.length > 1 && allTour[1].about}</p>
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
                                <p style={{maxHeight: '100px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{allTour.length > 2 && allTour[2].about}</p>
                                <p><a className="btn btn-primary btn-luxe-primary" onClick={() => navigate(`/tour/${allTour[2].tour_id}`)} >Đặt ngay<i className="ti-angle-right" /></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}