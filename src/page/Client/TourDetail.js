import React, { useState, useEffect } from "react";
import ComponentTourDetailHeader from "../../component/Client/CommonTourDetail/Header";
import ComponentTourDetail from "../../component/Client/CommonTourDetail/TourDetail";
import { useParams } from "react-router-dom";
import TourAPI from "../../API/TourAPI";
import '../../asset/sass/tour-detail-page.scss';

export default function TourDetail(props){
    const [tourDetail, setTourDetail] = useState([])
    const params = useParams()

    const getTourDetail = async () => {
        try{
            const tourRes = await TourAPI.getTourById(Number(params.tourId))
            
            if ( tourRes.data && tourRes.data.success ){
                setTourDetail(tourRes.data.payload[0])
            }
        }catch(error){
            console.log('get tour detail error: ', error)
        }
    }

    useEffect(() => {
        getTourDetail()
    }, [])

    return (
        <div className="tour-detail-page">
            <ComponentTourDetailHeader tourDetail={tourDetail}/>
            <ComponentTourDetail tourDetail={tourDetail}/>
        </div>
    )
}