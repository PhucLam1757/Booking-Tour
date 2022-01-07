import React from "react";
import RestaurentPost from '../../../asset/images/restaurant-post.jpeg'

export default function ComponentHomeService(props) {
    return (
        <div id="hotel-facilities" style={{minHeight: '1000px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>Company Service</h2>
                        </div>
                    </div>
                </div>
                <div id="tabs">
                    <nav className="tabs-nav">
                        <a href="#" className="active" data-tab="tab1">
                            <i className="flaticon-restaurant icon" />
                            <span>Restaurant</span>
                        </a>
                        <a href="#" data-tab="tab2">
                            <i className="flaticon-cup icon" />
                            <span>Bar</span>
                        </a>
                        <a href="#" data-tab="tab3">
                            <i className="flaticon-car icon" />
                            <span>Pick-up</span>
                        </a>
                        <a href="#" data-tab="tab4">
                            <i className="flaticon-swimming icon" />
                            <span>Swimming Pool</span>
                        </a>
                        <a href="#" data-tab="tab5">
                            <i className="flaticon-massage icon" />
                            <span>Spa</span>
                        </a>
                        <a href="#" data-tab="tab6">
                            <i className="flaticon-bicycle icon" />
                            <span>Gym</span>
                        </a>
                    </nav>
                    <div className="tab-content-container">
                        <div className="tab-content active show" data-tab-content="tab1">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={RestaurentPost} className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Restaurant</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" data-tab-content="tab2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="images/tab_img_2.jpg" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Bars</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" data-tab-content="tab3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="images/tab_img_3.jpg" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Pick Up</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" data-tab-content="tab4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="images/tab_img_4.jpg" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Swimming Pool</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" data-tab-content="tab5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="images/tab_img_5.jpg" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Spa</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" data-tab-content="tab6">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="images/tab_img_6.jpg" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="super-heading-sm">World Class</span>
                                        <h3 className="heading">Gym</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
                                            officia perferendis modi impedit, rem quasi veritatis. Consectetur
                                            obcaecati incidunt, quae rerum, accusamus sapiente fuga vero at. Quia,
                                            labore, reprehenderit illum dolorem quae facilis reiciendis quas
                                            similique totam sequi ducimus temporibus ex nemo, omnis perferendis
                                            earum fugit impedit molestias animi vitae.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
                                            neque blanditiis eveniet nesciunt, beatae similique doloribus, ex
                                            impedit rem officiis placeat dignissimos molestias temporibus, in!
                                            Minima quod, consequatur neque aliquam.</p>
                                        <p className="service-hour">
                                            <span>Service Hours</span>
                                            <strong>7:30 AM - 8:00 PM</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}