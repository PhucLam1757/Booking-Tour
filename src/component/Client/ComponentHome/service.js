import React, { useState, useEffect } from "react";
import RestaurentPost from '../../../asset/images/restaurant-post.jpeg'
import ServiceAPI from "../../../API/ServiceAPI";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../../asset/sass/home.scss';
import { useNavigate } from "react-router-dom";

export default function ComponentHomeService(props) {
    const [allService, setAllService] = useState([])
    const navigate = useNavigate()

    const getService = async () => {
        try {
            const getServiceRes = await ServiceAPI.getAll()
            if (getServiceRes.data && getServiceRes.data.success) {
                setAllService(getServiceRes.data.payload)
            }
        } catch (error) {
            console.log('get all post data error: ', error)
        }
    }

    useEffect(() => {
        getService()
    }, [])

    return (
        <div id="hotel-facilities" className="home-service-list" >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center" style={{ marginBottom: '2em' }}>
                            <h2 style={{ color: '#FF5721',fontWeight: 900  }}>Dịch Vụ công ty</h2>
                        </div>
                    </div>
                </div>
                <div id="tabs">
                    <Tabs>
                        <TabList>
                            {allService.map((serviceItem, serviceIndex) => {
                                return (
                                    <Tab key={`list-service-name-${serviceIndex}`}>{serviceItem.service_name}</Tab>
                                )
                            })}
                        </TabList>

                        {allService.map((serviceItem, serviceIndex) => {
                            return (
                                <TabPanel key={`list-service-name-${serviceIndex}`}>
                                    <div className="tab-content" data-tab-content="tab6">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={serviceItem.service_img} className="img-responsive" alt="Image" />
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="super-heading-sm">Dịch vụ công ty</span>
                                                    <h3 className="heading">{serviceItem.service_name}</h3>
                                                    <p>{serviceItem.service_desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            )
                        })}
                    </Tabs>
                </div>

                {allService.length ?
                    <div className="row">
                        <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'space-around', marginTop: '50px' }}>
                            <button className="view-all" onClick={() => navigate('/service')}>Xem tất cả</button>
                        </div>
                    </div> : ''
                }
            </div>
        </div>
    )
}