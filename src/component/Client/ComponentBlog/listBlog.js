import React from "react";
import TravelBlog from '../../../asset/images/Travel-blog.jpeg'

export default function ConponentListBlog(props) {
    return (
        <div id="fh5co-blog-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">Most Expensive Hotel</a></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">1st Anniversary of Luxe Hotel</a></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">Discover New Adventure</a></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">Most Expensive Hotel</a></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">1st Anniversary of Luxe Hotel</a></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blog-grid" style={{ backgroundImage: `url(${TravelBlog})` }}>
                            <div className="date text-center">
                                <span>09</span>
                                <small>Aug</small>
                            </div>
                        </div>
                        <div className="desc">
                            <h3><a href="#">Discover New Adventure</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}