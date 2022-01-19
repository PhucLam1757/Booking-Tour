import React, { useEffect, useState } from 'react'
import TourAPI from '../../../API/TourAPI'
import { useParams } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import UserAPI from '../../../API/UserAPI';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BookingAPI from '../../../API/Booking';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HotelAPI from '../../../API/HotelAPI';
import BankAPI from '../../../API/BankAPI';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';


const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} sx={{ width: '100%' }} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },

        '.MuiFilledInput-input': {
            minWidth: '300px !important',
        }
    },

}));



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

const Item2 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '20px',
    paddingLeft: '20px',
    height: '200px'
}));

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '40px',
        paddingLeft: '30px',
        paddingRight: '30px'

    }
}))

export default function HotelBooking(props) {
    const [hotelDetail, setHotelDetail] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [bookingNoti, setBookingNoti] = useState({ status: false, noti: '', type: '' })
    const [bankCardInfo, setBankCardInfo] = useState([])
    const [bookingInfo, setBookingInfo] = useState({ room_type: '', person: '', checkinDate: '', checkoutDate: '' })

    const params = useParams()
    const styles = useStyles()
    var nf = new Intl.NumberFormat();
    const navigate = useNavigate()
    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getHotelDetail = async () => {
        try {
            const hotelRes = await HotelAPI.getHotelById(Number(params.hotelId))

            if (hotelRes.data && hotelRes.data.success) {
                setHotelDetail(hotelRes.data.payload)
            }
        } catch (error) {
            console.log('get tour detail error: ', error)
        }
    }

    const getUserData = async () => {
        try {
            const userRes = await UserAPI.getUserInfo(userData.ctm_id)

            if (userRes.data && userRes.data.success) {
                setUserInfo(userRes.data.payload)
            }
        } catch (error) {
            console.log('get user data error: ', error)
        }
    }

    const getBankInfo = async () => {
        try {
            const bankRes = await BankAPI.getAll()
            if (bankRes.data && bankRes.data.success) {
                setBankCardInfo(bankRes.data.payload)
            }
        } catch (error) {
            console.log('get bank card info: ', error)
        }
    }

    useEffect(() => {
        getHotelDetail()
        getUserData()
        getBankInfo()
    }, [])


    const bookingHotel = async () => {
        try {
            setBookingNoti({ status: false, noti: '', type: '' })
            const { room_type, person, checkinDate, checkoutDate } = bookingInfo
            if (!room_type.length || !person.toString().length || !checkinDate.toString().length || !checkoutDate.toString().length) {
                setBookingNoti({ status: true, noti: 'Không được bỏ trống các trường', type: 'error' })
            } else {
                const currentDateGetTime = new Date().getTime();
                const checkInDateGetTime = new Date(checkinDate).getTime();
                const checkOutDateGetTime = new Date(checkoutDate).getTime();
                const subCurrentDateAndCheckInDate = checkInDateGetTime - currentDateGetTime
                const subCheckInDateAndCheckOutDate = checkOutDateGetTime - checkInDateGetTime

                if (subCurrentDateAndCheckInDate <= 0) {
                    setBookingNoti({ status: true, noti: 'Ngày nhận phòng cần lớn hơn ngày hiện tại', type: 'error' })
                } else if (subCheckInDateAndCheckOutDate <= 0) {
                    setBookingNoti({ status: true, noti: 'Ngày trả phòng cần lớn hơn ngày nhận phòng', type: 'error' })
                } else {
                    const roomTypeInfo = hotelDetail.room_detail.find((item) => item.hotel_type === room_type)

                    if (roomTypeInfo) {
                        if (person > roomTypeInfo.hotel_limit) {
                            setBookingNoti({ status: true, noti: 'Số người không thể lớn hơn số người giới hạn của phòng', type: 'error' })
                        } else if (roomTypeInfo.room_available >= roomTypeInfo.room_quality) {
                            setBookingNoti({ status: true, noti: 'Không còn phòng trống', type: 'error' })
                        } else {
                            const date1 = new Date(checkinDate);
                            const date2 = new Date(checkoutDate);
                            const diffTime = Math.abs(date2 - date1);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            const price = roomTypeInfo.hotel_price * diffDays

                            setTotalPrice(price)

                            const booking = {
                                hotel_id: params.hotelId,
                                hotel_type: room_type,
                                checkin_date: checkinDate,
                                checkout_date: checkoutDate,
                                person: person,
                                total_price: price,
                                user_id: userData.ctm_id,
                                payment_method: paymentMethod,
                            }

                            const bookingRes = await HotelAPI.createUserBooking(booking)
                            
                            if ( bookingRes.data && bookingRes.data.success ){
                                setBookingNoti({ status: true, noti: 'Chúc mừng bạn đã đặt phòng thành công', type: 'success' })

                                setTimeout(() => {
                                    navigate('/hotel')
                                }, 2000)
                            }else{
                                setBookingNoti({ status: true, noti: 'Bạn đã đặt phòng thất bại', type: 'error' })
                            }
                        }
                    }
                }
            }

            setTimeout(() => {
                setBookingNoti({ status: false, noti: '', type: '' })
            }, 2000)
        } catch (error) {
            setBookingNoti({ status: true, noti: 'Bạn đã thanh toán thất bại', type: 'error' })
        }
    }

    return (
        <div className={styles.root}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img src={hotelDetail.hotel_image && hotelDetail.hotel_image} style={{ width: '100%', height: '100%', maxHeight: '210px' }} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Item>
                            <Typography variant="h1" component="h2">
                                <b style={{ color: 'blue' }}>{hotelDetail.hotel_name && hotelDetail.hotel_name}</b>
                            </Typography>
                            <hr style={{ borderTop: '2px solid gray' }} />
                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3} >
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Loại khách sạn:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{hotelDetail.cate_name && hotelDetail.cate_name}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Địa chỉ:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{hotelDetail.place_name && hotelDetail.place_name}</b></Typography>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: '40px', marginBottom: '40px' }}>
                    <Item>
                        <Typography variant="h1" component="h2" >
                            <b style={{ color: 'yellowgreen' }}>THÔNG TIN PHÒNG</b>
                        </Typography>
                        <table class="table table-bordered" >
                            <thead>
                                <tr>
                                    <th>Loại phòng</th>
                                    <th>Số giường</th>
                                    <th>Số lượng người</th>
                                    <th>Số lượng phòng</th>
                                    <th>Phòng đã sử dụng</th>
                                    <th>Giá tiền(VNĐ/đêm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelDetail.room_detail && hotelDetail.room_detail.length ?
                                    hotelDetail.room_detail.map((roomItem, roomIndex) => {
                                        return (
                                            <tr key={`room-list-${roomIndex}`}>
                                                <td>{roomItem.hotel_type && roomItem.hotel_type}</td>
                                                <td>{roomItem.hotel_bed && roomItem.hotel_bed}</td>
                                                <td>{roomItem.hotel_limit && roomItem.hotel_limit}</td>
                                                <td>{roomItem.room_quality && roomItem.room_quality}</td>
                                                <td>{roomItem.room_available && roomItem.room_available}</td>
                                                <td>{roomItem.hotel_price && nf.format(roomItem.hotel_price)}</td>
                                            </tr>
                                        )
                                    }) : <></>
                                }
                            </tbody>
                        </table>
                    </Item>
                </Grid>

                <Grid container spacing={2}>
                    <Item>
                        <Typography variant="h1" component="h2">
                            <b style={{ color: 'yellowgreen' }}>THÔNG TIN KHÁCH HÀNG</b>
                        </Typography>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Tên"
                                        defaultValue=""
                                        id="contact-address"
                                        variant="filled"
                                        style={{ marginTop: 11, width: '100%' }}
                                        value={userInfo.name}
                                        onChange={(event) => {
                                            setUserInfo({ ...userInfo, name: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        defaultValue=""
                                        id="contact-address"
                                        variant="filled"
                                        style={{ marginTop: 11, width: '100%' }}
                                        value={userInfo.email}
                                        onChange={(event) => {
                                            setUserInfo({ ...userInfo, email: event.target.value })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Địa chỉ"
                                        defaultValue=""
                                        id="contact-address"
                                        variant="filled"
                                        style={{ marginTop: 11, width: '100%' }}
                                        value={userInfo.address}
                                        onChange={(event) => {
                                            setUserInfo({ ...userInfo, address: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Số điện thoại"
                                        defaultValue=""
                                        id="contact-address"
                                        variant="filled"
                                        style={{ marginTop: 11, width: '100%' }}
                                        value={userInfo.phone_number}
                                        onChange={(event) => {
                                            setUserInfo({ ...userInfo, phone_number: event.target.value })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Typography variant="h4" component="h4"><b>THÔNG TIN ĐẶT PHÒNG</b></Typography>
                        </Box>
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={4} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Loại phòng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Loại phòng"
                                        value={bookingInfo.room_type}
                                        style={{ border: '1px solid #E2E2E1', height: '85px' }}
                                        onChange={(event) => {
                                            setBookingInfo({ ...bookingInfo, room_type: event.target.value })
                                        }}
                                    >
                                        {hotelDetail.room_detail ? hotelDetail.room_detail.map((roomItem, roomIndex) => {
                                            return (
                                                <MenuItem value={roomItem.hotel_type} key={`room-select-${roomIndex}`}>{roomItem.hotel_type}</MenuItem>
                                            )
                                        }) : <></>}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4} sm={3}>
                                <RedditTextField
                                    label="Số lượng người"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={bookingInfo.person}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            setBookingInfo({ ...bookingInfo, person: event.target.value })
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} sm={3}>
                                <RedditTextField
                                    label="Ngày nhận phòng"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={bookingInfo.checkinDate}
                                    type="date"
                                    sx={{ height: '85px', 'input': { height: '85px' } }}
                                    onChange={(event) => {
                                        setBookingInfo({ ...bookingInfo, checkinDate: event.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} sm={3}>
                                <RedditTextField
                                    label="Ngày trả phòng"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={bookingInfo.checkoutDate}
                                    type="date"
                                    sx={{ height: '85px', 'input': { height: '85px' } }}
                                    onChange={(event) => {
                                        setBookingInfo({ ...bookingInfo, checkoutDate: event.target.value })
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ justifyContent: 'end' }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h5" style={{ textAlign: 'end', fontSize: '1.5em', marginTop: '20px', fontWeight: 700 }}>Tổng giá trị: <span style={{ color: 'red' }}>{nf.format(totalPrice)} VNĐ</span></Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Typography variant="h5" component="h5"><b>PHƯƠNG THỨC THANH TOÁN</b></Typography>
                        </Box>

                        <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                                sx={{ flexDirection: 'row' }}
                            >
                                <FormControlLabel value="Tiền mặt"
                                    control={<Radio />}
                                    label="Thanh toán trực tiếp"
                                    onChange={(event) => {
                                        setPaymentMethod(event.target.value)
                                    }}
                                />
                                <FormControlLabel value="Chuyển khoản"
                                    control={<Radio />}
                                    label="Thanh toán chuyển khoản"
                                    onChange={(event) => {
                                        setPaymentMethod(event.target.value)
                                    }}
                                />
                                <FormControlLabel value="Banking"
                                    control={<Radio />}
                                    label="Thanh toán banking"
                                    onChange={(event) => {
                                        setPaymentMethod(event.target.value)
                                    }}
                                />
                            </RadioGroup>
                        </FormControl>
                        {paymentMethod === 'Chuyển khoản' ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ width: '60%' }}>
                                    <p style={{ marginBottom: '0 !important', fontSize: '1.5em', color: '#008FEA' }}>Quý khách hàng chuyển khoản vui lòng chuyển qua ngân hàng sau:</p>
                                    {bankCardInfo.map((bankItem, bankIndex) => {
                                        return (
                                            <Stack justifyContent="space-around" key={`list-bank-info-${bankIndex}`}>
                                                <p style={{ marginBottom: 0, color: '#008FEA' }}>Tên ngân hàng: <b style={{ letterSpacing: '1.8px', color: '#FF5721' }}>{bankItem.card_name}</b></p>
                                                <p style={{ marginBottom: 0, color: '#008FEA' }}>Số tài khoản: <b style={{ letterSpacing: '1.8px', color: '#FF5721' }}>{bankItem.card_number}</b></p>
                                                <p style={{ marginBottom: 0, color: '#008FEA' }}>Chủ tài khoản: <b style={{ letterSpacing: '1.8px', color: '#FF5721' }}>{bankItem.card_author}</b></p>
                                            </Stack>
                                        )
                                    })}
                                    <p style={{ color: '#008FEA' }}>Quý khách vui lòng ghi rõ mã tour, họ tên, địa chỉ, số điện thoại và tên chuyến du lịch, ngày khởi hành cụ thể đã được quý khách chọn đăng ký.</p>
                                </Box>
                            </Box> : ''
                        }

                        {paymentMethod === 'Banking' &&
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ width: '30%' }}>
                                    <Item2>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm userInfo={userInfo} 
                                                hotelDetail={hotelDetail}
                                                totalPrice={totalPrice}
                                                paymentMethod={paymentMethod}
                                                hotelId={params.hotelId}
                                                userId={userData.ctm_id}
                                                bookingInfo={bookingInfo}
                                                setBookingNoti={(data) => {
                                                    setBookingNoti({ ...data })
                                                }}

                                                setTotalPrice={(price) => {
                                                    setTotalPrice(price)
                                                }}
                                            />
                                        </Elements>
                                    </Item2>
                                </Box>
                            </Box>
                        }

                        {bookingNoti.status &&
                            <Grid item xs={12}>
                                <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                    <Alert severity={bookingNoti.type} sx={{ marginTop: '10px' }}>{bookingNoti.noti}</Alert>
                                </Stack>
                            </Grid>
                        }
                        {paymentMethod !== 'Banking' &&
                            <Stack flexDirection={'row'} justifyContent={'center'} sx={{ marginBottom: '50px', marginTop: '30px' }}>
                                <Box>
                                    <Button variant="contained" sx={{ color: 'white !important' }} onClick={() => bookingHotel()}>THANH TOÁN</Button>
                                </Box>
                            </Stack>
                        }
                    </Item>

                </Grid>
            </Box>
        </div>
    )
}

const CheckoutForm = (props) => {
    const { userInfo, hotelDetail, totalPrice, hotelId, userId, bookingInfo } = props

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        props.setBookingNoti({ status: false, noti: '', type: '' })
        const { name, address, email, phone_number } = userInfo
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!name.length || !address.length || !email.length || !phone_number.length) {
            props.setBookingNoti({ status: true, noti: 'Không được bỏ trống các trường', type: 'error' })
            return;
        } 
        const { room_type, person, checkinDate, checkoutDate } = bookingInfo

        if (!room_type.length || !person.toString().length || !checkinDate.toString().length || !checkoutDate.toString().length) {
            props.setBookingNoti({ status: true, noti: 'Không được bỏ trống các trường', type: 'error' })
            return;
        } else {
            const currentDateGetTime = new Date().getTime();
            const checkInDateGetTime = new Date(checkinDate).getTime();
            const checkOutDateGetTime = new Date(checkoutDate).getTime();
            const subCurrentDateAndCheckInDate = checkInDateGetTime - currentDateGetTime
            const subCheckInDateAndCheckOutDate = checkOutDateGetTime - checkInDateGetTime

            if (subCurrentDateAndCheckInDate <= 0) {
                props.setBookingNoti({ status: true, noti: 'Ngày nhận phòng cần lớn hơn ngày hiện tại', type: 'error' })
                return;
            } else if (subCheckInDateAndCheckOutDate <= 0) {
                props.setBookingNoti({ status: true, noti: 'Ngày trả phòng cần lớn hơn ngày nhận phòng', type: 'error' })
                return;

            } else {
                const roomTypeInfo = hotelDetail.room_detail.find((item) => item.hotel_type === room_type)

                if (roomTypeInfo) {
                    if (person > roomTypeInfo.hotel_limit) {
                        props.setBookingNoti({ status: true, noti: 'Số người không thể lớn hơn số người giới hạn của phòng', type: 'error' })
                        return;
                    } else if (roomTypeInfo.room_available >= roomTypeInfo.room_quality) {
                        props.setBookingNoti({ status: true, noti: 'Không còn phòng trống', type: 'error' })
                        return;
                    } else {
                        const date1 = new Date(checkinDate);
                        const date2 = new Date(checkoutDate);
                        const diffTime = Math.abs(date2 - date1);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const price = roomTypeInfo.hotel_price * diffDays

                        props.setTotalPrice(price)
                    }
                }
            }
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: userInfo.email,
                phone: userInfo.phone,
                name: userInfo.name,
            }
        });

        if (!error) {
            const { id } = paymentMethod;
            const bookingData = {
                hotel_id: hotelId,
                hotel_type: bookingInfo.room_type,
                checkin_date: bookingInfo.checkinDate,
                checkout_date: bookingInfo.checkoutDate,
                person: bookingInfo.person,
                total_price: totalPrice,
                user_id: userId,
            }

            try {
                const { data } = await HotelAPI.chargeBankingHotel({ id, bookingData })
                console.log('banking data: ', data)

                if (data.success) {
                    props.setBookingNoti({ status: true, noti: 'Chúc mừng bạn đã đăng kí thành công', type: 'success' })

                    setTimeout(() => {
                        props.setBookingNoti({ status: false, noti: '', type: '' })
                        navigate('/hotel')
                    }, 2000)
                }

            } catch (error) {
                console.log('errorrrrrr >>>>> ', error)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement id="card-element" />
            <Button type="submit" sx={{ color: 'white !important', marginTop: '80px !important' }} disabled={!stripe || !elements} variant="contained">
                Thanh toán
            </Button>
        </form>

    );
};

const stripePromise = loadStripe('pk_test_51KHAdUKzeo9d90anKj4ocFehY0bDFuNR5REW9UZKQ3vKWpfXJgbr2P0odm9HugkcoVmfmF383bTkmZRQZvpp8wlv00PAvM4dYm');
