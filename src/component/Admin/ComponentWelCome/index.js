import React, { useState, useEffect } from "react";
import BookingAPI from "../../../API/Booking";
import HotelAPI from "../../../API/HotelAPI";
import './style.scss';

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function AdminWelCome(props) {
    const [tourBookingInfo, setTourBookingInfo] = useState({})
    const [hotelBookingInfo, setHotelBookingInfo] = useState({})


    const getBooking = async () => {
        try {
            const date = new Date();
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const formatFirstDate = formatDate(firstDay)
            const formatLastDate = formatDate(lastDay)

            const getTourBooking = await BookingAPI.getBookingByFilterDate({ fromDate: formatFirstDate, toDate: formatLastDate })
            const getHotelBooking = await HotelAPI.getBookingByFilterDate({ fromDate: formatFirstDate, toDate: formatLastDate })

            if (getTourBooking.data && getTourBooking.data.success && getHotelBooking.data && getHotelBooking.data.success) {

                const tourBooking = getTourBooking.data.payload.length ? getTourBooking.data.payload : []
                const hotelBooking = getHotelBooking.data.payload.length ? getHotelBooking.data.payload : []

                const tourBookingData = {
                    no_payment: 0,
                    comfirm_payment: 0,
                    paymented: 0,
                    complete: 0
                }

                const hotelBookingData = { ...tourBookingData }

                tourBooking.forEach((tourItem) => {
                    tourBookingData[tourItem.status] += 1
                })

                hotelBooking.forEach((tourItem) => {
                    hotelBookingData[tourItem.status] += 1
                })

                tourBookingData.total = tourBooking.length
                hotelBookingData.total = hotelBooking.length

                setTourBookingInfo(tourBookingData)
                setHotelBookingInfo(hotelBookingData)

            }
        } catch (error) {
            console.log('get booking error: ', error)
        }
    }

    useEffect(() => {
        getBooking()
    }, [])

    return (
        <div className="admin-welcome-page">
            <h5 style={{fontSize: '1.8em', fontWeight: 800}}>Chào mừng đến trang quản lí</h5>

            <h6 style={{marginTop: '40px', fontSize: '1.3em'}}>Thông kê đặt tour trong tháng</h6>

            <div className="booking-info">
                <div>
                    <p>Tổng số đơn</p>
                    <p>{tourBookingInfo.total && tourBookingInfo.total}</p>
                </div>
                <div>
                    <p>Chưa thanh toán</p>
                    <p>{tourBookingInfo.no_payment && tourBookingInfo.no_payment}</p>
                </div>
                <div>
                    <p>Đang chờ xác nhận</p>
                    <p>{tourBookingInfo.comfirm_payment && tourBookingInfo.comfirm_payment}</p>
                </div>
                <div>
                    <p>Đã thanh toán</p>
                    <p>{tourBookingInfo.paymented && tourBookingInfo.paymented}</p>
                </div>
                <div>
                    <p>Hoàn thành</p>
                    <p>{tourBookingInfo.complete && tourBookingInfo.complete}</p>
                </div>
            </div>

            <h6 style={{fontSize: '1.3em'}}>Thông kê đặt khách sạn trong tháng</h6>

            <div className="booking-info">
                <div>
                    <p>Tổng số đơn</p>
                    <p>{hotelBookingInfo.total && hotelBookingInfo.total}</p>
                </div>
                <div>
                    <p>Chưa thanh toán</p>
                    <p>{hotelBookingInfo.no_payment && hotelBookingInfo.no_payment}</p>
                </div>
                <div>
                    <p>Đang chờ xác nhận</p>
                    <p>{hotelBookingInfo.comfirm_payment && hotelBookingInfo.comfirm_payment}</p>
                </div>
                <div>
                    <p>Đã thanh toán</p>
                    <p>{hotelBookingInfo.paymented && hotelBookingInfo.paymented}</p>
                </div>
                <div>
                    <p>Hoàn thành</p>
                    <p>{hotelBookingInfo.complete && hotelBookingInfo.complete}</p>
                </div>
            </div>
        </div>
    )
}