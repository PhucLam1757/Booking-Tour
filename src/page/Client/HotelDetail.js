import React, { useState, useEffect } from "react";
import ComponentHotelDetailHeader from "../../component/Client/ComponentHotelDetail/Header";
import ComponentHotelDetail from "../../component/Client/ComponentHotelDetail/HotelDetail";
import { useParams } from "react-router-dom";
import HotelAPI from "../../API/HotelAPI";
import '../../asset/sass/tour-detail-page.scss';

export default function HotelDetail(props){
    const [hotelDetail, setHotelDetail] = useState([])
    const params = useParams()

    const getHotelDetail = async () => {
        try{
            const hotelRes = await HotelAPI.getHotelById(Number(params.hotelId))
    
            if ( hotelRes.data && hotelRes.data.success ){
                setHotelDetail(hotelRes.data.payload)
            }
        }catch(error){
            console.log('get tour detail error: ', error)
        }
    }

    useEffect(() => {
        getHotelDetail()
    }, [params.hotelId])

    return (
        <div className="tour-detail-page">
            <ComponentHotelDetailHeader hotelDetail={hotelDetail}/>
            <ComponentHotelDetail hotelDetail={hotelDetail}/>
        </div>
    )
}