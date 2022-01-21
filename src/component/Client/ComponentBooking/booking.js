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
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import BankAPI from '../../../API/BankAPI';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js';
import axios from 'axios';


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

export default function Booking(props) {
    const [tourDetail, setTourDetail] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('')
    const [totalChild, setTotalChild] = useState(0)
    const [totalAdult, setTotalAdult] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [bookingNoti, setBookingNoti] = useState({ status: false, noti: '', type: '' })
    const [bankCardInfo, setBankCardInfo] = useState([])

    const params = useParams()
    const styles = useStyles()
    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getTourDetail = async () => {
        try {
            const tourRes = await TourAPI.getTourById(Number(params.tourId))

            if (tourRes.data && tourRes.data.success) {
                setTourDetail(tourRes.data.payload[0])
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
        getTourDetail()
        getUserData()
        getBankInfo()
    }, [])


    const bookingTour = async () => {
        try {
            setBookingNoti({ status: false, noti: '', type: '' })
            const { name, address, email, phone_number } = userInfo

            if (!name.length || !address.length || !email.length || !phone_number.length || !paymentMethod.length || (Number(totalChild) <= 0 && Number(totalAdult) <= 0)) {
                setBookingNoti({ status: true, noti: 'Không được bỏ trống các trường', type: 'error' })
            } else {
                const data = {
                    name: userInfo.name,
                    address: userInfo.address,
                    email: userInfo.email,
                    phone: userInfo.phone_number,
                    user_id: userData.ctm_id,
                    tour_id: params.tourId,
                    total_price: totalPrice,
                    payment_method: paymentMethod,
                    total_child: totalChild,
                    total_adult: totalAdult
                }
                const bookingRes = await BookingAPI.addNew(data)

                if (bookingRes.data && bookingRes.data.success) {
                    setBookingNoti({ status: true, noti: 'Chúc mừng bạn đã đăng kí thành công', type: 'success' })

                } else {
                    setBookingNoti({ status: true, noti: 'Bạn đã thanh toán thất bại', type: 'error' })
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
                        <img src={tourDetail.tour_img && tourDetail.tour_img} style={{ width: '100%', height: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Item>
                            <Typography variant="h1" component="h2">
                                <b style={{ color: 'blue' }}>{tourDetail.tour_name && tourDetail.tour_name}</b>
                            </Typography>
                            <hr style={{ borderTop: '2px solid gray' }} />
                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3} >
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Ngày đi:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{tourDetail.departure_day && formatDate(tourDetail.departure_day)}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Ngày về:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{tourDetail.return_day && formatDate(tourDetail.return_day)}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Tổng thời gian</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{tourDetail.go_time && tourDetail.go_time}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Địa điểm đi: </Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{tourDetail.place_destinate && tourDetail.place_destinate}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Địa điểm về: </Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{tourDetail.place_go && tourDetail.place_go}</b></Typography>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Item>
                        <Typography variant="h1" component="h2">
                            <b style={{ color: 'yellowgreen' }}>GIÁ VÉ CHI TIẾT</b>
                        </Typography>
                        <table class="table table-bordered" >
                            <thead>
                                <tr>
                                    <th>Đối tượng</th>
                                    <th>Giá vé (1 người/tour)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Người lớn</td>
                                    <td>{tourDetail.adult_price ? tourDetail.adult_price : ''} VNĐ</td>
                                </tr>
                                <tr>
                                    <td>Trẻ em</td>
                                    <td>{tourDetail.child_price ? tourDetail.child_price : ''} VNĐ</td>
                                </tr>
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
                            <Typography variant="h5" component="h5"><b>SỐ LƯỢNG KHÁCH</b></Typography>
                        </Box>
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={4} sm={4}>
                                <RedditTextField
                                    label="Số lượng trẻ em"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={totalChild}
                                    onChange={(event) => {
                                        if (/^-?\d+$/.test(event.target.value) || !event.target.value.length) {
                                            setTotalChild(event.target.value)

                                            if (/^-?\d+$/.test(event.target.value)) {
                                                const price = totalPrice + (Number(event.target.value) * tourDetail.child_price)
                                                setTotalPrice(price)
                                            } else {
                                                const price = tourDetail.adult_price * totalAdult
                                                setTotalPrice(price)
                                            }

                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <RedditTextField
                                    label="Số lượng người lớn"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={totalAdult}
                                    onChange={(event) => {
                                        if (/^-?\d+$/.test(event.target.value) || !event.target.value.length) {
                                            setTotalAdult(event.target.value)

                                            if (/^-?\d+$/.test(event.target.value)) {
                                                const price = totalPrice + (Number(event.target.value) * tourDetail.adult_price)
                                                setTotalPrice(price)
                                            } else {
                                                const price = tourDetail.child_price * totalChild
                                                setTotalPrice(price)
                                            }

                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ justifyContent: 'end' }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h5" style={{ textAlign: 'end', fontSize: '1.5em', marginTop: '20px', fontWeight: 700 }}>Tổng giá trị: <span style={{ color: 'red' }}>{totalPrice} VNĐ</span></Typography>
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
                                            <CheckoutForm userInfo={userInfo} totalChild={totalChild}
                                                totalAdult={totalAdult}
                                                totalPrice={totalPrice}
                                                paymentMethod={paymentMethod}
                                                tourId={params.tourId}
                                                userId={userData.ctm_id}
                                                setBookingNoti={(data) => {
                                                    setBookingNoti({ ...data })
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
                                    <Button variant="contained" sx={{ color: 'white !important' }} onClick={() => bookingTour()}>THANH TOÁN</Button>
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
    const { userInfo, totalChild, totalAdult, totalPrice, tourId, userId } = props

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        props.setBookingNoti({ status: false, noti: '', type: '' })
        const { name, address, email, phone_number } = userInfo
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!name.length || !address.length || !email.length || !phone_number.length || (Number(totalChild) <= 0 && Number(totalAdult) <= 0)) {
            props.setBookingNoti({ status: true, noti: 'Không được bỏ trống các trường', type: 'error' })
            return;
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

            try {
                const { data } = await BookingAPI.chargeBanking({ id, amount: totalPrice, userInfo, totalChild, totalAdult, tourId, userId })

                if (data.success) {
                    props.setBookingNoti({ status: true, noti: 'Chúc mừng bạn đã đăng kí thành công', type: 'success' })

                    setTimeout(() => {
                        props.setBookingNoti({ status: false, noti: '', type: '' })
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
