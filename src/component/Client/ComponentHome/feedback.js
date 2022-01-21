import React from 'react'

export default function ComponentHomeFeedback(props) {
    return (
        <div id="testimonial">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>KHÁCH HÀNG ĐÃ NÓI GÌ VỀ CHÚNG TÔI...</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “Nếu bạn đang tìm kiếm một khách sạn chất lượng hàng đầu thì không cần tìm đâu xa. Tại đây sẽ cung cấp cho bạn những căn phòng khách sạn trên cả tuyệt vời”
                            </blockquote>
                            <p className="author"><cite>John Doe</cite></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “Tôi và vợ tôi đã có một kỳ nghỉ cuối tuần thú vị ở đây, nhân viên rất thân thiện và chu đáo. Cảm ơn đội ngũ nhân viên khách sạn rất nhiều, nhất định sẽ quay trở lại”
                            </blockquote>
                            <p className="author"><cite>Rob Smith</cite></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="testimony">
                            <blockquote>
                                “Nếu bạn đang tìm kiếm một tour nghỉ dưỡng thú vị thì không cần tìm đâu xa. Tại đây sẽ cung cấp cho bạn những căn phòng khách sạn trên cả tuyệt vời”
                            </blockquote>
                            <p className="author"><cite>Jane Doe</cite></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}