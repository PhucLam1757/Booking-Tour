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

export default function ListAccoutTour(props) {
    const [userBooking, setUserBooking] = useState([])
    const [listFavourite, setListFavourite] = useState([])
    const [userListHotelBooking, setUserListHotelBooking] = useState([])

    const userDataSession = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getFavouriteTour = async () => {
        try {
            const favouriteRes = await FavouriteAPI.getAllData(userDataSession.ctm_id)
            if (favouriteRes.data && favouriteRes.data.success) {
                setListFavourite(favouriteRes.data.payload)
            }
        } catch (error) {
            console.log('get user favourite tour error: ', error)
        }
    }

    const getUserAllBooking = async () => {
        try {
            const bookingRes = await BookingAPI.getUserBooking(userDataSession.ctm_id)

            if (bookingRes.data && bookingRes.data.success) {
                setUserBooking(bookingRes.data.payload)
            }

        } catch (error) {
            console.log('get user favourite tour error: ', error)
        }
    }

    const getUserListHotelBooking = async () => {
        try {
            const hotelRes = await HotelAPI.getUserBooking(userDataSession.ctm_id)

            if (hotelRes.data && hotelRes.data.success) {
                setUserListHotelBooking(hotelRes.data.payload)

            }

        } catch (error) {
            console.log('get user list hotel booking error: ', error)
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
                <Tab>KHÁCH SẠN ĐÃ ĐẶT</Tab>
            </TabList>

            <TabPanel>
                {userBooking.map((bookingItem) => {
                    return (
                        <Box sx={{ marginTop: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <img src={bookingItem.tour_img && bookingItem.tour_img} style={{ width: '100%', height: '100%' }} />
                                </Grid>
                                <Grid item xs={12} sm={8} >
                                    <Item>
                                        <Typography variant="h1" component="h2" >
                                            <b style={{ color: 'cadetblue' }}>{bookingItem.tour_name && bookingItem.tour_name}</b>
                                        </Typography>
                                        <hr style={{ borderTop: '2px solid gray' }} />
                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5} >
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày đi:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.departure_day && new Date(bookingItem.departure_day).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày về:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.return_day && new Date(bookingItem.return_day).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Tổng thời gian</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.go_time && bookingItem.go_time}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Số lượng trẻ em: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.total_child && bookingItem.total_child}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Số lượng người lớn: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.total_adult && bookingItem.total_adult}</b></Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Số giá tiền: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b style={{ color: 'red' }}>{bookingItem.total_price && bookingItem.total_price} VNĐ</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Tình trạng: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{displayStatus(bookingItem.status)}</b></Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })}
            </TabPanel>
            <TabPanel>
                {listFavourite.map((bookingItem) => {
                    return (
                        <Box sx={{ marginTop: '80px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <img src={bookingItem.tour_img && bookingItem.tour_img} style={{ width: '100%', height: '100%' }} />
                                </Grid>
                                <Grid item xs={12} sm={8} >
                                    <Item>
                                        <Typography variant="h1" component="h2" >
                                            <b style={{ color: 'cadetblue' }}>{bookingItem.tour_name && bookingItem.tour_name}</b>
                                        </Typography>
                                        <hr style={{ borderTop: '2px solid gray' }} />
                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5} >
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày đi:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.departure_day && new Date(bookingItem.departure_day).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày về:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.return_day && new Date(bookingItem.return_day).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Tổng thời gian</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.go_time && bookingItem.go_time}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={5}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Giá chỉ từ: </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={7}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b style={{ color: 'red' }}>{bookingItem.child_price} VNĐ</b></Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })}
            </TabPanel>

            <TabPanel>
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
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.checkin_date && new Date(bookingItem.checkin_date).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày trả phòng:</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.checkout_date && new Date(bookingItem.checkout_date).toISOString().split('T')[0]}</b></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}>Ngày đặt phòng</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="p" component="p" sx={{ textAlign: 'left', marginBottom: '0.5em !important' }}><b>{bookingItem.created_date && new Date(bookingItem.created_date).toISOString().split('T')[0]}</b></Typography>
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
            </TabPanel>
        </Tabs>
    )
}