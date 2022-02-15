import React, { useState, useEffect } from "react";
import '../../../asset/sass/travel-post-detail.scss'
import { useParams, useNavigate } from "react-router-dom";
import HandbookAPI from "../../../API/HandhookAPI";
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


export default function ComponentHandbookDetail(props) {
    const [handbookDetail, setHandbookDetail] = useState({})
    const params = useParams()

    const getHandbookDetail = async () => {
        try {
            const postRes = await HandbookAPI.getHandbookById(params.handbookId)

            if (postRes.data && postRes.data.success) {
                if (postRes.data.payload.length) {
                    setHandbookDetail(postRes.data.payload[0])
                }
            }
        } catch (error) {
            console.log('get post detail error: ', error)
        }
    }

    useEffect(() => {
        getHandbookDetail()
    }, [params])

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div className="blog-detail-page" style={{marginBottom: '100px'}}>
            <div class="header">
                <h1 style={{ fontWeight: 900, fontSize: '1.2em', color: 'black' }}>{handbookDetail.handbook_name ? handbookDetail.handbook_name : 'Loading...'}</h1>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-8 col-lg-9">
                    <div >
                        <div class="fakeimg" style={{ height: '500px' }}>
                            <img style={{ width: '100%', height: '100%' }} src={handbookDetail.handbook_img ? handbookDetail.handbook_img : ''} />
                        </div>
                        <p style={{ padding: '20px' }}>
                            {handbookDetail.handbook_desc ? handbookDetail.handbook_desc : 'Loading...'}
                        </p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-3">
                    <div style={{ paddingRight: '20px', boxSizing: 'border-box' }}>
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div style={{ marginTop: '30px' }}>
                                    <div class="card" style={{ width: '100%' }}>
                                        <div class="card-body">
                                            <h4 class="card-title" style={{ color: '#FF5721', fontSize: '1.6em', fontWeight: 700 }}>Vì sao nên mua tour online?</h4>
                                            <ul>
                                                <li>An toàn - Bảo mật</li>
                                                <li>Tiện lợi, tiết kiệm thời gian</li>
                                                <li>Không tính phí giao dịch</li>
                                                <li>Giao dịch bảo đảm</li>
                                                <li>Nhận thêm ưu đãi</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <div class="card" style={{ width: '100%' }}>
                                        <div class="card-body">
                                            <h4 class="card-title" style={{ color: '#FF5721', fontSize: '1.6em', fontWeight: 700 }}>Thương hiệu uy tín</h4>
                                            <ul>
                                                <li>Thành lập từ năm 1975</li>
                                                <li>Thương hiệu lữ hành hàng đầu</li>
                                                <li>Thương hiệu quốc gia</li>
                                            </ul>
                                        </div>
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