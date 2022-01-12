import React from 'react'
import BookingComponent from '../../component/Client/ComponentBooking/booking'
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';

export default function BookingPage(props){
    return (
        <div>
            <ComponentHomeHeader />

            <div style={{marginTop: '70px'}}>
                <BookingComponent />
            </div>
        </div>
    )
}