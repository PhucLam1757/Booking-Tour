import React from 'react'
import HotelBookingComponent from '../../component/Client/ComponentHotelBooking/booking'
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';

export default function HotelBookingPage(props){
    return (
        <div>
            <ComponentHomeHeader />

            <div style={{marginTop: '70px'}}>
                <HotelBookingComponent />
            </div>
        </div>
    )
}