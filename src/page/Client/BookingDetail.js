import React from 'react'
import BookingDetailComponent from '../../component/Client/ComponentBookingDetail';
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';

export default function BookingDetailPage(props){
    return (
        <div>
            <ComponentHomeHeader />

            <div style={{marginTop: '70px'}}>
                <BookingDetailComponent />
            </div>
        </div>
    )
}