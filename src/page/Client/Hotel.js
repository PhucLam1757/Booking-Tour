import React from "react";
import ComponentHotelHeader from "../../component/Client/ComponentHotel/Header";
import ComponentHotel from "../../component/Client/ComponentHotel/Hotel";

export default function HotelPage(props){
    return (
        <div>
            <ComponentHotelHeader {...props}/>
            <ComponentHotel {...props}/>
        </div>
    )
}