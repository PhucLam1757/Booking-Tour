import React, { useState, useEffect } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ReviewAPI from "../../../API/ReviewAPI";
import { useParams, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import BookingAPI from "../../../API/Booking";

export default function ComponentTourDetailReview(props) {
    const [addReviewData, setAddReviewData] = useState('')
    const [reviewData, setReviewData] = useState([])
    const [createReviewNoti, setCreateReviewNoti] = useState({ status: false, noti: '', type: '' })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [userCanReview, setUserCanReview] = useState(false)
    const navigate = useNavigate()

    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const params = useParams()

    const createNewReview = async () => {
        try {
            if(userData){
                if (userCanReview) {
                    const createReviewRes = await ReviewAPI.createCustomerReview({ user_id: Number(userData.ctm_id), review: addReviewData, tour_id: params.tourId })
    
                    if (createReviewRes.data && createReviewRes.data.success) {
                        setCreateReviewNoti({ status: true, noti: 'Gửi review thành công', type: 'success' })
                        getAllReview(currentPage)
                    } else {
                        setCreateReviewNoti({ status: true, noti: 'Gửi review thất bại', type: 'error' })
                    }
    
                    setTimeout(() => {
                        setAddReviewData('')
                        setCreateReviewNoti({ status: false, noti: '', type: '' })
                    }, 2000)
    
                } else {
                    setCreateReviewNoti({ status: true, noti: 'Bạn chỉ có thể review khi đã đặt tour', type: 'error' })
                }
            }else{
                navigate('/login')
            }
        } catch (error) {
            console.log('create review error: ', error)
        }
    }

    const checkUserCanReview = async () => {
        try {
            if (userData) {
                const checkRes = await BookingAPI.checkUserCanReview({ user_id: userData.ctm_id, tour_id: params.tourId })
                if (checkRes.data && checkRes.data.success) {
                    setUserCanReview(true)
                }
            }

        } catch (error) {
            console.log('check user review error: ', error)
        }
    }

    const getAllReview = async (page) => {
        try {
            const reviewRes = await ReviewAPI.getReviewByTourId({ tourId: params.tourId, limit: 2, page: page })

            if (reviewRes.data && reviewRes.data.success) {
                setReviewData(reviewRes.data.payload.review)

                const allItem = reviewRes.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 2)
                setTotalPage(total_page)
                setCurrentPage(page)
            }

        } catch (error) {
            console.log('get review Error: ', error)
        }
    }

    useEffect(() => {
        getAllReview(1)
        checkUserCanReview()
    }, [])

    return (
        <div style={{ marginBottom: '30px' }}>
            <h6 style={{ textAlign: 'center', fontSize: '1.5em', color: '#FF5721', fontWeight: 600 }}>Đánh giá khách hàng</h6>
            <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px', boxSizing: 'border-box', marginLeft: 0, marginRight: 0 }}>
                <div className="col-sm-2 col-md-3" ></div>
                <div className="col-sm-8 col-md-6">
                    <FormControl fullWidth>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={4}
                            placeholder="Nhập đánh giá"
                            value={addReviewData}
                            onChange={(event) => setAddReviewData(event.target.value)}
                        />

                        {createReviewNoti.status &&
                            <Stack sx={{ marginTop: '10px' }} spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Alert severity={createReviewNoti.type} sx={{ marginTop: '10px' }}>{createReviewNoti.noti}</Alert>
                            </Stack>
                        }

                        <Stack sx={{ marginTop: '10px' }} justifyContent={'end'} flexDirection={'row'}>
                            <Box>
                                <Button variant="contained" onClick={() => createNewReview()} sx={{ color: 'white !important' }}>Gửi đánh giá</Button>
                            </Box>
                        </Stack>
                    </FormControl>
                </div>
                <div className="col-sm-2 col-md-3" ></div>
            </div>

            {/*  */}

            {reviewData.map((reviewItem, reviewIndex) => {
                return (
                    <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px', boxSizing: 'border-box', marginTop: '50px', marginLeft: 0, marginRight: 0 }}>
                        <div className="col-sm-2 col-md-1" ></div>
                        <div className="col-sm-8 col-md-6">
                            <Stack justifyContent={'start'} flexDirection={'row'} alignItems={'center'} sx={{ marginBottom: '10px' }}>
                                <div>
                                    <h6 style={{ padding: '10px', margin: 0, background: 'gray', color: 'white', fontWeight: '800' }}>{reviewItem.name.charAt(0).toUpperCase()}</h6>
                                </div>
                                <div>
                                    <h6 style={{ marginLeft: '10px', fontSize: '1.2em', fontWeight: '800', marginBottom: 0 }}>{reviewItem.name}</h6>
                                </div>
                            </Stack>
                            <p style={{ marginBottom: 0, fontSize: '0.8em' }}>Ngày review: {reviewItem.review_date && new Date(reviewItem.review_date).toISOString().split('T')[0]}</p>
                            <FormControl fullWidth>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    value={reviewItem.review && reviewItem.review}
                                />
                            </FormControl>
                        </div>
                        <div className="col-sm-2 col-md-3" ></div>
                    </div>
                )
            })}

            <div className="row" style={{ marginTop: '50px', marginLeft: 0, marginRight: 0 }}>
                <div className="col-sm-2 col-md-1"></div>
                <div className="col-sm-8 col-md-6">
                    <div className="row" style={{ justifyContent: 'center', marginLeft: 0, marginRight: 0 }}>
                        <Stack spacing={2} flexDirection={'row'} justifyContent={'center'}>
                            <Pagination count={totalPage} color="secondary" defaultPage={1}
                                page={currentPage}
                                onChange={(event, value) => {
                                    getAllReview(value)
                                }}
                            />
                        </Stack>
                    </div>
                </div>
                <div className="col-sm-2 col-md-3"></div>
            </div>
        </div>
    )
}