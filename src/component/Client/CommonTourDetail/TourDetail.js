import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TouBanner from '../../../asset/images/TourBanner.jpeg';
import { useNavigate } from "react-router-dom";
import TourAPI from "../../../API/TourAPI";
import CustomerReview from './Review';
import { useParams } from "react-router-dom";

export default function ComponentTourDetail(props) {
    const [tourDetail, setTourDetail] = useState({})
    const [relatedTour, setRelatedTour] = useState([])
    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))
    const navigate = useNavigate()

    const params = useParams()

    const getRelatedTour = async () => {
        try {
            const TourRes = await TourAPI.getTourByFilter({ search: '', category: tourDetail.category_id ? tourDetail.category_id : 0, dateGo: '', dateReturn: '', page: 1, limit: 3 })
            if (TourRes.data && TourRes.data.success) {
                setRelatedTour(TourRes.data.payload.tour)
            }

        } catch (error) {
            console.log('related tour error: ', error)
        }
    }

    useEffect(() => {
        setTourDetail({ ...props.tourDetail })
        getRelatedTour()
    }, [props.tourDetail])

    return (
        <div>
            <div className="row" style={{ paddingLeft: '50px', paddingRight: '30px', boxSizing: 'border-box', marginBottom: '50px', marginLeft: 0, marginRight: 0 }}>
                <div className="col-sm-12 col-md-8">
                    <div style={{ marginTop: '30px' }}>
                        <div className="row" style={{ marginRight: 0, marginLeft: 0, marginBottom: '10px' }}>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Thời gian đi: <b>{`${new Date(tourDetail.departure_day).getDate()} - ${new Date(tourDetail.departure_day).getMonth() + 1} - ${new Date(tourDetail.departure_day).getFullYear()} `}</b></div>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Thời gian về: <b>{`${new Date(tourDetail.return_day).getDate()} - ${new Date(tourDetail.return_day).getMonth() + 1} - ${new Date(tourDetail.return_day).getFullYear()} `}</b></div>
                        </div>
                        <div className="row" style={{ marginRight: 0, marginLeft: 0, marginBottom: '10px' }}>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Tổng thời gian: <b>{tourDetail.go_time ? tourDetail.go_time : ''}</b></div>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Phương tiện di chuyển: <b>{tourDetail.transport ? tourDetail.transport : ''}</b></div>
                        </div>
                        <div className="row" style={{ marginRight: 0, marginLeft: 0, marginBottom: '10px' }}>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Địa điểm đi: <b>{tourDetail.place_destinate ? tourDetail.place_destinate : ''}</b></div>
                            <div style={{ width: '100%', color: 'black', fontSize: '0.9em' }} className="col-sm-12 col-md-6">Địa điểm về: <b>{tourDetail.place_go ? tourDetail.place_go : ''}</b></div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <img src={tourDetail.tour_img ? tourDetail.tour_img : TouBanner} style={{ width: '60%', height: '25vw', marginLeft: '10%' }} />
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <Tabs>
                            <TabList>
                                <Tab>Mô tả</Tab>
                                <Tab>Chính sách</Tab>
                                <Tab>Giá vé</Tab>
                            </TabList>

                            <TabPanel>
                                <p>
                                    {tourDetail.tour_desc ? tourDetail.tour_desc : ''}
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <p>
                                    {tourDetail.tour_policy ? tourDetail.tour_policy : ''}
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <table class="table table-bordered" >
                                    <thead>
                                        <tr>
                                            <th>Đối tượng</th>
                                            <th>Giá vé (1 người/tour)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Người lớn</td>
                                            <td>{tourDetail.adult_price ? tourDetail.adult_price : ''} VNĐ</td>
                                        </tr>
                                        <tr>
                                            <td>Trẻ em</td>
                                            <td>{tourDetail.child_price ? tourDetail.child_price : ''} VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <p><b>Lưu ý: </b>Không áp dụng dịp Lễ - Tết</p>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>



                <div className="col-sm-12 col-md-4">
                    <div style={{ marginTop: '30px' }}>
                        <div class="card" style={{ width: '100%', background: '#FF5721', padding: '20px', boxSizing: 'border-box' }}>
                            <div class="card-body">
                                <h4 class="card-title" style={{ color: 'white', fontSize: '1.6em', fontWeight: 700 }}>ĐẶT TOUR NGAY</h4>
                                <h3 style={{ color: 'chartreuse' }}><span style={{ fontWeight: 500 }}>GIÁ CHỈ TỪ: </span><span style={{ fontSize: '1.3em', fontWeight: 600 }}>{tourDetail.child_price} VNĐ</span></h3>
                                <button style={{ backgroundColor: 'white', border: '1px solid white' }}
                                    onClick={() => {
                                        if (userData){
                                            navigate(`/tour/${params.tourId}/booking`)
                                        }else{
                                            navigate(`/login`)
                                        }
                                        
                                    }}
                                >
                                    ĐẶT TOUR NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <div class="card" style={{ width: '100%', border: '1px solid #FF5721', padding: '20px' }}>
                            <div class="card-body">
                                <h4 class="card-title" style={{ color: '#FF5721', fontSize: '1.6em', fontWeight: 700 }}>Vì sao nên mua tour online?</h4>
                                <ul>
                                    <li>An toàn - Bảo mật</li>
                                    <li>Tiện lợi, tiết kiệm thời gian</li>
                                    <li>Không tính phí giao dịch</li>
                                    <li>Giao dịch bảo đảm</li>
                                    <li>Nhận thêm ưu đãi</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <div class="card" style={{ width: '100%', border: '1px solid #FF5721', padding: '20px' }}>
                            <div class="card-body">
                                <h4 class="card-title" style={{ color: '#FF5721', fontSize: '1.6em', fontWeight: 700 }}>Thương hiệu uy tín</h4>
                                <ul>
                                    <li>Thành lập từ năm 1975</li>
                                    <li>Thương hiệu lữ hành hàng đầu</li>
                                    <li>Thương hiệu quốc gia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 style={{ textAlign: 'center', color: '#FF5721', fontSize: '3em', fontWeight: 700 }}>Tour liên quan</h5>
                <div id="fh5co-hotel-section" style={{ padding: 0 }}>
                    <div class="container">
                        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
                            {relatedTour.map((relatedTitem, relatedIndex) => {
                                return (
                                    <div class="col-md-4">
                                        <div class="hotel-content">
                                            <div class="hotel-grid" style={{ backgroundImage: `url(${relatedTitem.tour_img ? relatedTitem.tour_img : TouBanner})` }}>
                                                <div class="price"><small>Chỉ từ</small><span>{relatedTitem.child_price ? relatedTitem.child_price : ''}</span><small>/tour</small></div>
                                                <a class="book-now text-center" href="#"><i class="ti-calendar"></i>Xem ngay</a>
                                            </div>
                                            <div class="desc">
                                                <h3><a href="#">{relatedTitem.tour_name ? relatedTitem.tour_name : ''}</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </div>
    )
}