import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PlaceAPI from '../../../API/PlaceAPI';
import TourAPI from '../../../API/TourAPI';
import TourCategoryAPI from '../../../API/TourCategoryAPI';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import BookingAPI from '../../../API/Booking';

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

export default function ComponentBookingDetail(props) {
    const [updateBookingNoti, setUpdateBookingNoti] = useState({ status: false, noti: '', type: '' })
    const [bookingDetail, setBookingDetail] = useState({})
    const navigate = useNavigate()
    const params = useParams()

    const getBookingDetail = async () => {
        try {
            const bookingRes = await BookingAPI.getBookingById(params.bookingId)

            if (bookingRes.data && bookingRes.data.success) {
                if (bookingRes.data.payload && bookingRes.data.payload.length) {
                    setBookingDetail(bookingRes.data.payload[0])
                }
            }
        } catch (error) {
            console.log('get booking detail error: ', error)
        }
    }

    const updateBookingStatus = async () => {
        try{
            setUpdateBookingNoti({status: false, noti: '', type: ''})
            const updateRes = await BookingAPI.updateTourStatus({id: params.bookingId, status:bookingDetail.status })
            
            if ( updateRes.data && updateRes.data.success ){
                setUpdateBookingNoti({status: true, noti: 'Cập nhật thành công', type: 'success'})
            }else{
                setUpdateBookingNoti({status: true, noti: 'Cập nhật thất bại', type: 'error'})
            }

            setTimeout(() => {
                setUpdateBookingNoti({status: false, noti: '', type: ''})
            }, 2000)


        }catch(error){
            console.log('update booking status error: ', error)
        }
    }

    useEffect(() => {
        getBookingDetail()
    }, [params])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Button variant="outlined" onClick={() => navigate('/admin/booking')}>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Tên tour:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.tour_name}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Ngày đi:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.departure_day && formatDate(bookingDetail.departure_day)}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Ngày về:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.return_day && formatDate(bookingDetail.return_day)}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Tên khách hàng:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.name}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Số điện thoại khách hàng:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.phone}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Địa chỉ khách hàng:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.address}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Email khách hàng:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.email}
                        style={{ marginTop: 11 }}
                    />
                </Box>

            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Tổng giá tiền:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.total_price + 'VNĐ'}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Phương thức thanh toán:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={bookingDetail.payment_method}
                        style={{ marginTop: 11 }}
                    />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Số lượng trẻ em:
                            </Typography>
                            <RedditTextField
                                defaultValue=""
                                id="country-name"
                                variant="filled"
                                value={bookingDetail.total_child}
                                style={{ marginTop: 11 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Số lượng người lớn:
                            </Typography>
                            <RedditTextField
                                defaultValue=""
                                id="country-name"
                                variant="filled"
                                value={bookingDetail.total_adult}
                                style={{ marginTop: 11 }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Trạng thái:
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bookingDetail.status ? bookingDetail.status: ''}
                                    defaultValue={bookingDetail.status ? bookingDetail.status: ''}
                                    label="Age"
                                    onChange={(event) => {
                                        setBookingDetail({...bookingDetail, status: event.target.value})
                                    }}
                                >
                                    <MenuItem value={'no_payment'}>Chưa thanh toán</MenuItem>
                                    <MenuItem value={'comfirm_payment'}>Đang chờ xác nhận</MenuItem>
                                    <MenuItem value={'paymented'}>Đã thanh toán</MenuItem>
                                    <MenuItem value={'complete'}>Đã hoàn thành</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {updateBookingNoti.status &&
                            <Grid item xs={12}>
                                <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                    <Alert severity={updateBookingNoti.type} sx={{ marginTop: '10px' }}>{updateBookingNoti.noti}</Alert>
                                </Stack>
                            </Grid>
                        }

                        <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={()=>updateBookingStatus()}>Cập nhật trạng thái</Button>
                        </Stack>

                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {updateBookingNoti.status &&
                        <Grid item xs={12}>
                            <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Alert severity={updateBookingNoti.type} sx={{ marginTop: '10px' }}>{updateBookingNoti.noti}</Alert>
                            </Stack>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}