import React from 'react'

export default function ComponentHomeFeedback(props) {
    return (
        <div id="testimonial">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>Happy Customer Says...</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “If you’re looking for a top quality hotel look no further. We were upgraded
                                free of charge to the Premium Suite, thanks so much”
                            </blockquote>
                            <p className="author"><cite>John Doe</cite></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “Me and my wife had a delightful weekend get away here, the staff were so
                                friendly and attentive. Highly Recommended”
                            </blockquote>
                            <p className="author"><cite>Rob Smith</cite></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “If you’re looking for a top quality hotel look no further. We were upgraded
                                free of charge to the Premium Suite, thanks so much”
                            </blockquote>
                            <p className="author"><cite>Jane Doe</cite></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}