import React, { useState, useEffect } from "react";
import RestaurentPost from '../../../asset/images/restaurant-post.jpeg'
import HandbookAPI from "../../../API/HandhookAPI";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function ComponentHomeHandbook(props) {
    const [allHandbook, setAllHandbook] = useState([])

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
        // <div id="hotel-facilities" className="home-service-list" style={{ marginTop: '100px' }} >
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-md-12">
        //                 <div className="section-title text-center" style={{ marginBottom: '2em' }}>
        //                     <h2 style={{ color: '#FF5721', fontWeight: 900 }}>Cẩm nang du lịch</h2>
        //                 </div>
        //             </div>
        //         </div>
        //         <div id="tabs">
        //             <Tabs>
        //                 <TabList>
        //                     {allHandbook.map((hanbookItem, handbookIndex) => {
        //                         return (
        //                             <Tab key={`list-service-name-${handbookIndex}`}>{hanbookItem.handbook_name}</Tab>
        //                         )
        //                     })}
        //                 </TabList>

        //                 {allHandbook.map((hanbookItem, handbookIndex) => {
        //                     return (
        //                         <TabPanel key={`list-service-name-${handbookIndex}`}>
        //                             <div className="tab-content" data-tab-content="tab6">
        //                                 <div className="container">
        //                                     <div className="row">
        //                                         <div className="col-md-6">
        //                                             <img src={hanbookItem.handbook_img} className="img-responsive" alt="Image" />
        //                                         </div>
        //                                         <div className="col-md-6">
        //                                             <span className="super-heading-sm">Cẩm nang du lịch</span>
        //                                             <h3 className="heading">{hanbookItem.handbook_name}</h3>
        //                                             <p>{hanbookItem.handbook_desc}</p>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </TabPanel>
        //                     )
        //                 })}
        //             </Tabs>
        //         </div>

        //         {/* {allHandbook.length ?
        //             <div className="row">
        //                 <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'space-around', marginTop: '50px' }}>
        //                     <button className="view-all">Xem tất cả</button>
        //                 </div>
        //             </div> : ''
        //         } */}
        //     </div>
        // </div>

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
                                        {/* <span>{new Date(handbookItem.updated_at).getDate()}</span>
                                        <small>{monthNames[new Date(handbookItem.updated_at).getMonth()].substr(0,3)}</small> */}
                                    </div>
                                </div>
                                <div className="desc">
                                    <h3><a
                                        // onClick={() => navigate(`/blog/${handbookItem.handbook_id}`)}
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