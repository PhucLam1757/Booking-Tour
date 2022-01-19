import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TouBanner from '../../../asset/images/TourBanner.jpeg';
import { useNavigate } from "react-router-dom";
import TourAPI from "../../../API/TourAPI";
import CustomerReview from './Review';
import { useParams } from "react-router-dom";
import HotelAPI from "../../../API/HotelAPI";

export default function ComponentTourDetail(props) {
    const [hotelDetail, setHotelDetail] = useState({})
    const [relatedHotel, setRelatedHotel] = useState([])
    const [minPrice, setMinPrice] = useState(0)

    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))
    const navigate = useNavigate()
    const params = useParams()
    var nf = new Intl.NumberFormat();

    const getRelatedHotel = async () => {
        try {
            const hotelRes = await HotelAPI.getHotelByFilter({ page: 1, limit: 3, search: '', category: hotelDetail.hotel_cate ? hotelDetail.hotel_cate : 0 })

            if (hotelRes.data && hotelRes.data.success) {
                setRelatedHotel(hotelRes.data.payload.hotel)
            }

        } catch (error) {
            console.log('related tour error: ', error)
        }
    }

    useEffect(() => {
        setHotelDetail({ ...props.hotelDetail })
        getRelatedHotel()
    }, [props.hotelDetail])

    useEffect(() => {
        const roomDetail = props.hotelDetail.room_detail ? [...props.hotelDetail.room_detail]: []

        if ( roomDetail.length ){
            roomDetail.sort(function (a, b) {
                return a.hotel_price - b.hotel_price
            })
            const minPrice = roomDetail[0].hotel_price
            setMinPrice(minPrice)
        }
    }, [props.hotelDetail])

    return (
        <div>
            <div className="row" style={{ paddingLeft: '50px', paddingRight: '30px', boxSizing: 'border-box', marginBottom: '50px', marginLeft: 0, marginRight: 0 }}>
                <div className="col-sm-12 col-md-8">
                    <div style={{ marginTop: '30px' }}>
                        <div className="row" style={{ marginRight: 0, marginLeft: 0, marginBottom: '10px' }}>
                            <div style={{ width: '100%', color: 'black', fontSize: '1.3em' }} className="col-sm-12 col-md-6">Loại: <b>{hotelDetail.cate_name ? hotelDetail.cate_name : ''}</b></div>
                            <div style={{ width: '100%', color: 'black', fontSize: '1.3em' }} className="col-sm-12 col-md-6">Địa điểm: <b>{hotelDetail.place_name ? hotelDetail.place_name : ''}</b></div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <img src={hotelDetail.hotel_image ? hotelDetail.hotel_image : TouBanner} style={{ width: '60%', height: '25vw', marginLeft: '10%' }} />
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <Tabs>
                            <TabList>
                                <Tab>Mô tả</Tab>
                                <Tab>Giá phòng</Tab>
                            </TabList>

                            <TabPanel>
                                <p>
                                    {hotelDetail.hotel_desc ? hotelDetail.hotel_desc : ''}
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <table class="table table-bordered" >
                                    <thead>
                                        <tr>
                                            <th>Loại phòng</th>
                                            <th>Số giường</th>
                                            <th>Số lượng người</th>
                                            <th>Số lượng phòng</th>
                                            <th>Phòng đã sử dụng</th>
                                            <th>Giá tiền(VNĐ/đêm)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hotelDetail.room_detail && hotelDetail.room_detail.length ?
                                            hotelDetail.room_detail.map((roomItem, roomIndex) => {
                                                return (
                                                    <tr key={`room-list-${roomIndex}`}>
                                                        <td>{roomItem.hotel_type && roomItem.hotel_type}</td>
                                                        <td>{roomItem.hotel_bed && roomItem.hotel_bed}</td>
                                                        <td>{roomItem.hotel_limit && roomItem.hotel_limit}</td>
                                                        <td>{roomItem.room_quality && roomItem.room_quality}</td>
                                                        <td>{roomItem.room_available && roomItem.room_available}</td>
                                                        <td>{roomItem.hotel_price && nf.format(roomItem.hotel_price)}</td>
                                                    </tr>
                                                )
                                            }) : <></>
                                        }
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
                                <h4 class="card-title" style={{ color: 'white', fontSize: '1.6em', fontWeight: 700 }}>ĐẶT KHÁCH SẠN NGAY</h4>
                                <h3 style={{ color: 'chartreuse' }}><span style={{ fontWeight: 500 }}>GIÁ CHỈ TỪ: </span><span style={{ fontSize: '1em', fontWeight: 600 }}>{nf.format(minPrice)} VNĐ</span></h3>
                                <button style={{ backgroundColor: 'white', border: '1px solid white' }}
                                    onClick={() => {
                                        if (userData) {
                                            navigate(`/hotel/${params.hotelId}/booking`)
                                        } else {
                                            navigate(`/login`)
                                        }

                                    }}
                                >
                                    ĐẶT KHÁCH SẠN
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <div class="card" style={{ width: '100%', border: '1px solid #FF5721', padding: '20px' }}>
                            <div class="card-body">
                                <h4 class="card-title" style={{ color: '#FF5721', fontSize: '1.6em', fontWeight: 700 }}>Vì sao nên đặt khách sạn online?</h4>
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
                <h5 style={{ textAlign: 'center', color: '#FF5721', fontSize: '3em', fontWeight: 700 }}>Khách sạn liên quan</h5>
                <div id="fh5co-hotel-section" style={{ padding: 0 }}>
                    <div class="container">
                        <div class="row" style={{ marginLeft: 0, marginRight: 0, justifyContent: 'center' }}>
                            {relatedHotel.map((relatedTitem, relatedIndex) => {
                                return (
                                    <div class="col-md-4">
                                        <div class="hotel-content">
                                            <div class="hotel-grid" style={{ backgroundImage: `url(${relatedTitem.hotel_image ? relatedTitem.hotel_image : TouBanner})` }}>
                                                <a class="book-now text-center" href={`/hotel/${relatedTitem.hotel_id}`}><i class="ti-calendar"></i>Xem ngay</a>
                                            </div>
                                            <div class="desc">
                                                <h3><a >{relatedTitem.hotel_name ? relatedTitem.hotel_name : ''}</a></h3>
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