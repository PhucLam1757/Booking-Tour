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
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HotelAPI from '../../../API/HotelAPI';

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

export default function ComponentAdminUpdateHotel(props) {
    const [allPlace, setAllPlace] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [hotelData, setHotelData] = useState({ room_detail: [] })
    const [addHotelNoti, setAddHotelNoti] = useState({ status: false, noti: '', type: '' })

    const navigate = useNavigate()
    const params = useParams()

    const getAllPlace = async () => {
        try {
            const place = await PlaceAPI.getAll()

            if (place.data && place.data.success) {
                setAllPlace(place.data.payload)
            }

        } catch (error) {
            console.log('get place error: ', error)
        }
    }

    const getAllCategory = async () => {
        try {
            const category = await HotelAPI.getAllCategory()

            if (category.data && category.data.success) {
                setAllCategory(category.data.payload)
            }

        } catch (error) {
            console.log('get category error: ', error)
        }
    }

    const getHotelById = async () => {
        try {
            const hotelRes = await HotelAPI.getHotelById(params.hotelId)

            if (hotelRes.data && hotelRes.data.success) {
                setHotelData(hotelRes.data.payload)
            }

        } catch (error) {
            console.log('get category error: ', error)
        }
    }

    useEffect(() => {
        getAllPlace()
        getAllCategory()
        getHotelById()
    }, [])

    const updateHotelData = async () => {
        try {
            setAddHotelNoti({ status: false, noti: '', type: '' })

            if (!hotelData.hotel_name || !hotelData.hotel_cate || !hotelData.place_id || !hotelData.hotel_image || !hotelData.hotel_desc) {
                setAddHotelNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const hotelAllData = {
                    hotel_id: hotelData.hotel_id,
                    hotel_name: hotelData.hotel_name,
                    hotel_cate: hotelData.hotel_cate,
                    place_id: hotelData.place_id,
                    hotel_image: hotelData.hotel_image,
                    hotel_desc: hotelData.hotel_desc,
                    room_detail: hotelData.room_detail,
                }

                const updateHotelRes = await HotelAPI.updateHotelData(hotelAllData)
                
                if (updateHotelRes.data && updateHotelRes.data.success) {
                    setAddHotelNoti({ status: true, noti: 'Cập nhật thông tin khách sạn thành công', type: 'success' })

                    setTimeout(() => {
                        setAddHotelNoti({ status: false, noti: '', type: '' })
                    }, 3000)

                } else {
                    setAddHotelNoti({ status: true, noti: 'Không thể cập nhật thông tin khách sạn', type: 'error' })
                }

            }
        } catch (error) {
            setAddHotelNoti({ status: true, noti: 'Không thể cập nhật thông tin khách sạn', type: 'error' })
        }
    }


    console.log('hotelData.room_detail >>>>> ', hotelData.room_detail)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Button variant="outlined" onClick={() => navigate('/admin/hotel')}>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p">
                        Tên khách sạn:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        value={hotelData.hotel_name}
                        onChange={(event) => {
                            setHotelData({ ...hotelData, hotel_name: event.target.value })
                        }}
                        style={{ marginTop: 11 }}
                    />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Loại khách sạn:
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại khách sạn</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={hotelData.hotel_cate ? hotelData.hotel_cate : ''}
                            onChange={(event) => {
                                setHotelData({ ...hotelData, hotel_cate: event.target.value })
                            }}
                        >
                            {allCategory.map((categoryItem, categoryIndex) => {
                                return (
                                    <MenuItem value={categoryItem.cate_id} key={`category-select-${categoryIndex}`}>{categoryItem.cate_name}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Địa điểm:
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Địa điểm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Loại tour"
                            value={hotelData.place_id ? hotelData.place_id : ''}
                            onChange={(event) => {
                                setHotelData({ ...hotelData, place_id: event.target.value })
                            }}
                        >
                            {allPlace.map((placeItem, placeIndex) => {
                                return (
                                    <MenuItem value={placeItem.place_id} key={`category-select-${placeIndex}`}>{placeItem.place_name}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }} >
                        Hình ảnh:
                    </Typography>
                    <TextField id="outlined-basic" variant="outlined" type={'file'}
                        onChange={(event) => {
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            if (event.target.files[0]) {
                                reader.onload = function () {
                                    setHotelData({ ...hotelData, hotel_image: reader.result })
                                };

                                reader.onerror = function (error) {
                                    console.log('Error: ', error);
                                };
                            }
                        }} />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Mô tả khách sạn:
                    </Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={10}
                        placeholder="Nhập mô tả cho khách sạn"
                        style={{ width: '100%' }}
                        value={hotelData.hotel_desc}
                        onChange={(event) => {
                            setHotelData({ ...hotelData, hotel_desc: event.target.value })
                        }}
                    />
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ margin: '10px 0' }}>
                    <Stack flexDirection={'row'} justifyContent={'center'} >
                        <Box>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Chi tiết:
                            </Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => {
                                const hotel = [...hotelData.room_detail]
                                hotel.push({
                                    hotel_id: new Date().getTime(),
                                    hotel_type: '',
                                    hotel_price: 0,
                                    hotel_limit: 0,
                                    hotel_bed: 0,
                                    room_quality: 0,

                                })

                                setHotelData({ ...hotelData, room_detail: [...hotel] })
                            }}>
                                <AddIcon />
                            </Button>
                        </Box>
                    </Stack>

                    {hotelData.room_detail.map((roomItem, roomIndex) => {
                        return (
                            <Stack flexDirection={'row'} justifyContent={'flex-start'}>
                                <RedditTextField
                                    label="Loại phòng"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.hotel_type}
                                    onChange={(event) => {
                                        const hotel = [...hotelData.room_detail]
                                        hotel[roomIndex].hotel_type = event.target.value
                                        setHotelData({ ...hotelData, room_detail: hotel })
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <RedditTextField
                                    label="Giá"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.hotel_price}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            const hotel = [...hotelData.room_detail]
                                            hotel[roomIndex].hotel_price = event.target.value
                                            setHotelData({ ...hotelData, room_detail: hotel })
                                        }
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <RedditTextField
                                    label="Số người"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.hotel_limit}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            const hotel = [...hotelData.room_detail]
                                            hotel[roomIndex].hotel_limit = event.target.value
                                            setHotelData({ ...hotelData, room_detail: hotel })
                                        }
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <RedditTextField
                                    label="Số giường"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.hotel_bed}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            const hotel = [...hotelData.room_detail]
                                            hotel[roomIndex].hotel_bed = event.target.value
                                            setHotelData({ ...hotelData, room_detail: hotel })
                                        }
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <RedditTextField
                                    label="Số lượng phòng"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.room_quality}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            const hotel = [...hotelData.room_detail]
                                            hotel[roomIndex].room_quality = event.target.value
                                            setHotelData({ ...hotelData, room_detail: hotel })
                                        }
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <RedditTextField
                                    label="Số phòng sử dụng"
                                    defaultValue=""
                                    id="country-name"
                                    variant="filled"
                                    value={roomItem.room_available}
                                    onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            const hotel = [...hotelData.room_detail]
                                            hotel[roomIndex].room_available = event.target.value
                                            setHotelData({ ...hotelData, room_detail: hotel })
                                        }
                                    }}
                                    style={{ marginTop: 11, marginRight: '20px' }}
                                />

                                <Button onClick={() => {
                                    const hotel = [...hotelData.room_detail].filter((item, index) => item.hotel_id !== roomItem.hotel_id)
                                    setHotelData({ ...hotelData, room_detail: hotel })
                                }}>
                                    <DeleteForeverIcon />
                                </Button>

                            </Stack>
                        )
                    })}

                </Box>
            </Grid>


            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {addHotelNoti.status &&
                        <Grid item xs={12}>
                            <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Alert severity={addHotelNoti.type} sx={{ marginTop: '10px' }}>{addHotelNoti.noti}</Alert>
                            </Stack>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={() => updateHotelData()}>Cập nhật khách sạn</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}