import React, { useState, useEffect } from "react";
import RestaurentPost from '../../../asset/images/restaurant-post.jpeg'
import HandbookAPI from "../../../API/HandhookAPI";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {useNavigate} from 'react-router-dom';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export default function ComponentHomeHandbook(props) {
    const [allHandbook, setAllHandbook] = useState([])
    const navigate = useNavigate()

    const getHandbook = async () => {
        try {
            const getServiceRes = await HandbookAPI.getAll()
            if (getServiceRes.data && getServiceRes.data.success) {
                setAllHandbook(getServiceRes.data.payload)
            }
        } catch (error) {
            console.log('get all post data error: ', error)
        }
    }

    useEffect(() => {
        getHandbook()
    }, [])

    return (
        <div id="fh5co-blog-section" style={{marginTop: '200px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2 style={{ color: 'black', fontWeight: 900, fontSize: '2em' }}>CẨM NANG DU LỊCH</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {allHandbook.map((handbookItem, handbookIndex) => {
                        return (
                            <div className="col-md-4" key={`home-blog-${handbookIndex}`}>
                                <div className="blog-grid" style={{ backgroundImage: `url(${handbookItem.handbook_img})` }}>
                                    <div className="date text-center">
                                        <span>{new Date(handbookItem.create_date).getDate()}</span>
                                        <small>{monthNames[new Date(handbookItem.create_date).getMonth()].substr(0,3)}</small>
                                    </div>
                                </div>
                                <div className="desc">
                                    <h3><a 
                                        onClick={() => navigate(`/handbook/${handbookItem.handbook_id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >{handbookItem.handbook_name}</a></h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}