import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BookingAPI from "../../../API/Booking";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FavouriteAPI from "../../../API/FavouriteAPI";
import HotelAPI from "../../../API/HotelAPI";
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TouBanner from '../../../asset/images/TourBanner.jpeg';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '20px',
    paddingLeft: '20px'
}));

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function ListAccoutTour(props) {
    const [userBooking, setUserBooking] = useState([])
    const [listFavourite, setListFavourite] = useState([])
    const [userListHotelBooking, setUserListHotelBooking] = useState([])
    const navigate = useNavigate()

    const customerDataSession = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getFavouriteTour = async () => {
        try {
            const favouriteRes = await FavouriteAPI.getAllData(customerDataSession.ctm_id)
            if (favouriteRes.data && favouriteRes.data.success) {
                setListFavourite(favouriteRes.data.payload)
            }
        } catch (error) {
            console.log('get user favourite tour error: ', error)
        }
    }

    const getUserAllBooking = async () => {
        try {
            const bookingRes = await BookingAPI.getUserBooking(customerDataSession.ctm_id)

            if (bookingRes.data && bookingRes.data.success) {
                setUserBooking(bookingRes.data.payload)
            }

        } catch (error) {
            console.log('get user favourite tour error: ', error)
        }
    }

    const getUserListHotelBooking = async () => {
        try {
            const hotelRes = await HotelAPI.getUserBooking(customerDataSession.ctm_id)

            if (hotelRes.data && hotelRes.data.success) {
                setUserListHotelBooking(hotelRes.data.payload)

            }

        } catch (error) {
            console.log('get user list hotel booking error: ', error)
        }
    }

    const removeFavourite = async (tour_id) => {
        try {
            if (customerDataSession) {
                const removeRes = await FavouriteAPI.deleteFavourite({ user_id: customerDataSession.ctm_id, tour_id: tour_id })
                
                if (removeRes.data && removeRes.data.success) {
                    setListFavourite(removeRes.data.payload)
                }
            }
        } catch (error) {
            console.log('remove favourite error: ', error)
        }
    }

    useEffect(() => {
        getUserAllBooking()
        getFavouriteTour()
        getUserListHotelBooking()
    }, [])

    const displayStatus = (status) => {
        if (status === 'no_payment') {
            return (
                <Alert badgeContent={4} color="warning" icon={false}>Chưa thanh toán</Alert>
            )
        } else if (status === 'comfirm_payment') {
            return (
                <Alert badgeContent={4} color="primary" icon={false}>Đang chờ xác nhận</Alert>
            )
        } else if (status === 'paymented') {
            return (
                <Alert badgeContent={4} color="success" icon={false}>Đã thanh toán</Alert>
            )

        } else if (status === 'complete') {
            return (
                <Alert badgeContent={4} color="error" icon={false}>Đã hoàn thành</Alert>
            )
        }
    }

    return (
        <Tabs>
            <TabList>
                <Tab>TOUR ĐÃ ĐẶT</Tab>
                <Tab>TOUR YÊU THÍCH</Tab>
                {/* <Tab>KHÁCH SẠN ĐÃ ĐẶT</Tab> */}
            </TabList>

            <TabPanel>
                {userBooking.map((tourItem, tourIndex) => {
                    return (
                        <div className='col-12' style={{ marginTop: '20px' }} key={`list-tour-${tourIndex}`}>
                            <div style={{ width: '100%', minheight: '100px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)', padding: '20px' }}>
                                <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                                    <div className='col-sm-12 col-md-4'>
                                        <img src={tourItem.tour_img ? tourItem.tour_img : TouBanner} style={{ width: '100%', height: '100%' }} />
                                    </div>

                                    <div className='col-sm-10 col-md-5'>
                                        <h2 style={{ color: '#06558A', fontWeight: 700 }}>{tourItem.tour_name}</h2>
                                        <h3 style={{ fontWeight: 600, color: 'black' }}>{tourItem.place_destinate}-{tourItem.place_go}</h3>
                                        <h5>Thời gian: {tourItem.go_time}</h5>
                                        <h5>Phương tiện: {tourItem.transport}</h5>
                                        <div>{displayStatus(tourItem.status)}</div>
                                    </div>

                                    <div className='col-3'>
                                        <button class="view-tour-detail-button"
                                            onClick={() => navigate(`/booking-detail/${tourItem.booking_id}`)}
                                            role="button"
                                            style={{ whiteSpace: 'nowrap', backgroundColor: 'transparent' }}
                                        >
                                            Chi tiết đặt tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </TabPanel>

            <TabPanel>
                <div>
                    {listFavourite.map((tourItem, tourIndex) => {
                        return (
                            <div className='col-12' style={{ marginTop: '20px' }} key={`list-tour-${tourIndex}`}>
                                <div style={{ width: '100%', minheight: '100px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)', padding: '20px' }}>
                                    <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                                        <div className='col-sm-12 col-md-4'>
                                            <img src={tourItem.tour_img ? tourItem.tour_img : TouBanner} style={{ width: '100%', height: '100%' }} />
                                        </div>

                                        <div className='col-sm-10 col-md-5'>
                                            <h2 style={{ color: '#06558A', fontWeight: 700 }}>{tourItem.tour_name}</h2>
                                            <h3 style={{ fontWeight: 600, color: 'black' }}>{tourItem.place_destinate}-{tourItem.place_go}</h3>
                                            <h5>Thời gian: {tourItem.go_time}</h5>
                                            <h5>Phương tiện: {tourItem.transport}</h5>
                                            <h5 style={{ color: 'red', fontSize: '1.2em' }}>Giá vé: Chỉ từ {tourItem.child_price} vnđ</h5>
                                        </div>

                                        <div className='col-3'>
                                            <button class="view-tour-detail-button"
                                                onClick={() => navigate(`/tour/${tourItem.tour_id}`)}
                                                role="button"
                                                style={{ whiteSpace: 'nowrap', backgroundColor: 'transparent' }}
                                            >Xem chi tiết</button>

                                            <IconButton onClick={() => removeFavourite(tourItem.tour_id)} color="error">
                                                <FavoriteIcon color="error" />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </TabPanel>

            {/* <TabPanel>
                {userListHotelBooking.map((bookingItem) => {
                    return (
                        <Box sx={{ marginTop: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <img src={bookingItem.hotel_image && bookingItem.hotel_image} style={{ width: '100%', height: '100%', maxHeight: '392px' }} />
                                </Grid>
                                <Grid item xs={12} sm={8} >
                                    <Item>
                                        <Typography variant="h1" component="h2" >
                                            <b style={{ color: 'cadetblue' }}>{bookingItem.hotel_name && bookingItem.hotel_name}</b>
                                        </Typography>
                                        <hr style={{ borderTop: '2px solid gray' }} />
                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6} >
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày nhận phòng:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.checkin_date && formatDate(bookingItem.checkin_date)}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày trả phòng:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.checkout_date && formatDate(bookingItem.checkout_date)}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày đặt phòng</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.created_date && formatDate(bookingItem.created_date)}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Tổng số tiền: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b style={{ color: 'red' }}>{bookingItem.total_price} VNĐ</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Phương thức thanh toán: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b >{bookingItem.payment_method}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Tổng số người: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b >{bookingItem.person}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Trạng thái: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b >{displayStatus(bookingItem.status)}</b></Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })}
            </TabPanel> */}
        </Tabs>
    )
}