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
import Alert from '@mui/material/Alert';
import BookingAPI from '../../../API/Booking'
import BankAPI from '../../../API/BankAPI';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

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
    padding: '50px 20px 50px 20px'
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

export default function BookingDetail(props) {
    const [bookingDetail, setBookingDetail] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [comfirmDelete, setComfirmDelete] = useState(false)
    const [updateInfoNoti, setUpdateInfoNoti] = useState({ status: false, noti: '', type: '' })

    const params = useParams()
    const styles = useStyles()
    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getBookingDetail = async () => {
        try {
            const tourRes = await BookingAPI.getBookingById(Number(params.bookingId))
            if (tourRes.data && tourRes.data.success) {
                const payload = tourRes.data.payload[0]
                setBookingDetail(payload)
                setUserInfo({
                    name: payload.name,
                    address: payload.address,
                    email: payload.email,
                    phone_number: payload.phone,
                })
            }
        } catch (error) {
            console.log('get tour detail error: ', error)
        }
    }

    const displayStatus = (status) => {
        if (status === 'no_payment') {
            return (
                <Alert badgeContent={4} color="warning" icon={false}>Chưa xác nhận</Alert>
            )
        } else if (status === 'comfirm_payment') {
            return (
                <Alert badgeContent={4} color="primary" icon={false} sx={{ '& .css-acap47-MuiAlert-message': { width: '100%' }, textAlign: 'center' }}>Đang chờ xác nhận</Alert>
            )
        } else if (status === 'paymented') {
            return (
                <Alert badgeContent={4} color="success" icon={false}>Đã xác nhận</Alert>
            )

        } else if (status === 'complete') {
            return (
                <Alert badgeContent={4} color="error" icon={false}>Đã hoàn thành</Alert>
            )
        }
    }

    useEffect(() => {
        getBookingDetail()
    }, [])

    const deleteBooking = () => {
        setComfirmDelete(true)
    }

    const updateBookingUserInfo = async () => {
        try {
            const { name, email, address, phone_number } = userInfo
            if (!name.length || !email.length || !address.length || !phone_number.length) {
                setUpdateInfoNoti({ status: true, noti: 'Các trường không thể bỏ trống', type: 'error' })
            } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone_number)) {
                setUpdateInfoNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            } else {
                const updateUserRes = await BookingAPI.updateBookingUserInfo(userInfo, userData.ctm_id, bookingDetail.booking_id)

                if (updateUserRes.data.success) {
                    setUpdateInfoNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })
                } else {
                    setUpdateInfoNoti({ status: true, noti: 'Cập nhật thông tin thất bại', type: 'error' })
                }
            }

            setTimeout(() => {
                setUpdateInfoNoti({ status: false, noti: '', type: '' })
            }, 2000)

        } catch (error) {
            setUpdateInfoNoti({ status: true, noti: 'Cập nhật thông tin thất bại', type: 'error' })
            setTimeout(() => {
                setUpdateInfoNoti({ status: false, noti: '', type: '' })
            }, 2000)
        }

    }

    return (
        <div className={styles.root}>
            {comfirmDelete ?
                <ComfirmDeteleModal
                    status={comfirmDelete}
                    bookingId={params.bookingId}
                    setStatus={(status) => setComfirmDelete(status)}
                    bookingDetail={bookingDetail}
                /> : ''
            }
            <Box sx={{ flexGrow: 1, marginBottom: '50px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img src={bookingDetail.tour_img && bookingDetail.tour_img} style={{ width: '100%', height: '89%' }} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Item>
                            <Typography variant="h1" component="h2">
                                <b style={{ color: 'blue' }}>{bookingDetail.tour_name && bookingDetail.tour_name}</b>
                            </Typography>
                            <hr style={{ borderTop: '2px solid gray' }} />
                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3} >
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Ngày đi:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{bookingDetail.departure_day && formatDate(bookingDetail.departure_day)}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Ngày về:</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{bookingDetail.return_day && formatDate(bookingDetail.return_day)}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Địa điểm về: </Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{bookingDetail.place_go && bookingDetail.place_go}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={6} sm={3}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}>Trạng thái: </Typography>
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{bookingDetail.place_go && bookingDetail.place_go}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="p" component="p" sx={{ textAlign: 'left', color: 'black !important' }}><b>{displayStatus(bookingDetail.status)}</b></Typography>
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
                                    <th style={{ textAlign: 'center' }}>Đối tượng</th>
                                    <th style={{ textAlign: 'center' }}>Giá vé (1 người/tour)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Người lớn</td>
                                    <td>{bookingDetail.adult_price ? bookingDetail.adult_price : ''} VNĐ</td>
                                </tr>
                                <tr>
                                    <td>Trẻ em</td>
                                    <td>{bookingDetail.child_price ? bookingDetail.child_price : ''} VNĐ</td>
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
                                    value={bookingDetail.total_child && bookingDetail.total_child}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <RedditTextField
                                    label="Số lượng người lớn"
                                    defaultValue=""
                                    id="contact-address"
                                    variant="filled"
                                    value={bookingDetail.total_adult && bookingDetail.total_adult}

                                />
                            </Grid>
                        </Grid>
                    </Item>

                </Grid>

                {updateInfoNoti.status &&
                    <Alert severity={updateInfoNoti.type} sx={{ marginTop: '10px' }}>{updateInfoNoti.noti}</Alert>
                }

                <Stack flexDirection={'row'} justifyContent={'center'} sx={{ marginTop: '30px' }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ color: 'white' }}>
                        <Button variant="contained" sx={{ color: 'white' }} onClick={() => updateBookingUserInfo()}>CẬP NHẬT THÔNG TIN</Button>
                        <Button color="error" onClick={() => deleteBooking()}>XOÁ</Button>
                    </ButtonGroup>
                </Stack>

            </Box>
        </div>
    )
}

const ComfirmDeteleModal = (props) => {
    const [comfirmDeleteModal, setComfirmDeleteModal] = useState(false)
    const [bookingId, setBookingId] = useState('')
    const [bookingDetail, setBookingDetail] = useState({})
    const [alertNoti, setAlertNoti] = useState({ status: false, noti: '', type: '' })
    const navigate = useNavigate()

    useEffect(() => {
        setComfirmDeleteModal(props.status)
        setBookingId(props.bookingId)
        setBookingDetail(props.bookingDetail)
    }, [])

    const deleteBooking = async () => {
        try {
            if (bookingDetail.status === 'paymented' || bookingDetail.status === 'complete') {
                setAlertNoti({ status: true, noti: 'Không thể xoá khi lịch đặt ở trạng thái đã thanh toán hoặc hoàn thành', type: 'error' })
            } else {
                const deleteBookingRes = await BookingAPI.deleteBooking(bookingId)

                if (deleteBookingRes.data.success) {
                    setAlertNoti({ status: true, noti: 'Xoá lịch đặt tour thành công', type: 'success' })

                    setTimeout(() => {
                        navigate('/account')
                    }, 1000)

                } else {
                    setAlertNoti({ status: true, noti: 'Không thể xoá lịch đặt tour', type: 'error' })
                }
            }

        } catch (error) {
            setAlertNoti({ status: true, noti: 'Không thể xoá lịch đặt tour', type: 'error' })
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={() => {
                    props.setStatus(false)
                    setComfirmDeleteModal(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={comfirmDeleteModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title"
                    onClose={() => {
                        props.setStatus(false)
                        setComfirmDeleteModal(false)
                    }}>
                    Xác nhận xoá
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    Bạn có chắc chắn muốn xoá

                    {alertNoti.status &&
                        <Alert severity={alertNoti.type} sx={{ marginTop: '10px' }}>{alertNoti.noti}</Alert>
                    }

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => deleteBooking()}>
                        Xoá
                    </Button>
                    <Button autoFocus onClick={() => {
                        props.setStatus(false)
                        setComfirmDeleteModal(false)
                    }}>
                        Huỷ
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

