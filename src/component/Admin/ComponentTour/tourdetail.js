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

export default function ComponentTourDetail(props) {
    const [allPlace, setAllPlace] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [tourData, setTourData] = useState({})
    const [addTourNoti, setAddTourNoti] = useState({ status: false, noti: '', type: '' })

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
            const category = await TourCategoryAPI.getAll()

            if (category.data && category.data.success) {
                setAllCategory(category.data.payload)
            }

        } catch (error) {
            console.log('get category error: ', error)
        }
    }

    const getTourDetail = async () => {
        try {
            const tourId = params.id
            const tourDetailRes = await TourAPI.getTourById(tourId)
            if (tourDetailRes.data && tourDetailRes.data.success) {
                const detailPayload = tourDetailRes.data.payload[0]

                const detail = {
                    adult_price: detailPayload.adult_price,
                    tour_name: detailPayload.tour_name,
                    child_price: detailPayload.child_price,
                    date_go: formatDate(detailPayload.departure_day),
                    date_return: formatDate(detailPayload.return_day),
                    place_from: detailPayload.place_go_id,
                    place_to: detailPayload.place_destination_id,
                    total_date: detailPayload.go_time,
                    tour_desc: detailPayload.tour_desc,
                    tour_image: detailPayload.tour_img,
                    tour_policy: detailPayload.tour_policy,
                    tour_transport: detailPayload.transport,
                    tour_type: Number(detailPayload.category_id),
                    tour_status: detailPayload.tour_status
                }
                setTourData(detail)
            }
        } catch (error) {
            console.log('get tour detail error: ', error)
        }
    }


    useEffect(() => {
        getTourDetail()
        getAllPlace()
        getAllCategory()
    }, [])

    const updateTour = async () => {
        try {
            setAddTourNoti({ status: false, noti: '', type: '' })

            if (!tourData.adult_price || !tourData.tour_name || !tourData.child_price || !tourData.date_go
                || !tourData.date_return || !tourData.place_from || !tourData.place_to || !tourData.tour_desc
                || !tourData.tour_image || !tourData.tour_policy || !tourData.tour_transport || !tourData.tour_type) {

                setAddTourNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                if (!/^-?\d+$/.test(tourData.adult_price) || !/^-?\d+$/.test(tourData.child_price)) {
                    setAddTourNoti({ status: true, noti: 'Giá vé sai định dạng', type: 'error' })
                }
                const date1 = new Date(tourData.date_go);
                const date2 = new Date(tourData.date_return);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                setTourData({ ...tourData, total_date: `${diffDays <= 0 ? diffDays + 1 : diffDays} ngày ${diffDays <= 0 ? '' : diffDays - 1 > 0 ? (diffDays - 1) + ' đêm' : '1 đêm'}` })

                const tourAllData = {
                    adult_price: tourData.adult_price,
                    tour_name: tourData.tour_name,
                    child_price: tourData.child_price,
                    date_go: tourData.date_go,
                    date_return: tourData.date_return,
                    place_from: tourData.place_from,
                    place_to: tourData.place_to,
                    total_date: `${diffDays <= 0 ? diffDays + 1 : diffDays} ngày ${diffDays <= 0 ? '' : diffDays - 1 > 0 ? (diffDays - 1) + ' đêm' : '1 đêm'}`,
                    tour_desc: tourData.tour_desc,
                    tour_image: tourData.tour_image,
                    tour_policy: tourData.tour_policy,
                    tour_transport: tourData.tour_transport,
                    tour_type: tourData.tour_type,
                    tour_status: tourData.tour_status
                }

                const updateTourRes = await TourAPI.updateTour(tourAllData, params.id)
                console.log('updateTourRes: ', updateTourRes)
                if (updateTourRes.data && updateTourRes.data.success) {
                    setAddTourNoti({ status: true, noti: 'Cập nhật thông tin tour thành công', type: 'success' })

                    setTimeout(() => {
                        setAddTourNoti({ status: false, noti: '', type: '' })
                    }, 3000)

                } else {
                    setAddTourNoti({ status: true, noti: 'Không thể cập nhật thông tin tour', type: 'error' })
                }
                // }


            }
        } catch (error) {
            setAddTourNoti({ status: true, noti: 'Không thể thêm thông tin tour', type: 'error' })
        }
    }

    console.log('tourData >>>>>> ', tourData)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Button variant="outlined" onClick={() => navigate('/admin/tour')}>
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
                        value={tourData.tour_name}
                        onChange={(event) => {
                            setTourData({ ...tourData, tour_name: event.target.value })
                        }}
                        style={{ marginTop: 11 }}
                    />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Loại tour:
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tourData.tour_type ? tourData.tour_type : 0}
                            onChange={(event) => {
                                setTourData({ ...tourData, tour_type: event.target.value })
                            }}
                        >
                            {allCategory.map((categoryItem, categoryIndex) => {
                                return (
                                    <MenuItem value={categoryItem.category_id} key={`category-select-${categoryIndex}`}>{categoryItem.name}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Mô tả tour:
                    </Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={20}
                        placeholder="Nhập mô tả cho tour"
                        style={{ width: '100%' }}
                        value={tourData.tour_desc}
                        onChange={(event) => {
                            setTourData({ ...tourData, tour_desc: event.target.value })
                        }}
                    />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Chính sách:
                    </Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={20}
                        placeholder="Nhập chính sách cho tour"
                        style={{ width: '100%' }}
                        value={tourData.tour_policy}
                        onChange={(event) => {
                            setTourData({ ...tourData, tour_policy: event.target.value })
                        }}
                    />
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
                                    setTourData({ ...tourData, tour_image: reader.result })
                                };

                                reader.onerror = function (error) {
                                    console.log('Error: ', error);
                                };
                            }
                        }} />
                </Box>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Phương tiện di chuyển:
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tourData.tour_transport ? tourData.tour_transport : 0}
                            onChange={(event) => {
                                setTourData({ ...tourData, tour_transport: event.target.value })
                            }}
                        >
                            <MenuItem value={'Máy bay'}>Máy bay</MenuItem>
                            <MenuItem value={'Tàu hoả'}>Tàu hoả</MenuItem>
                            <MenuItem value={'Xe khách'}>Xe khách</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Địa điểm đi:
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tourData.place_from ? tourData.place_from : 0}
                                    onChange={(event) => {
                                        setTourData({ ...tourData, place_from: event.target.value })
                                    }}
                                >
                                    {allPlace.map((placeItem) => {
                                        return (
                                            <MenuItem value={placeItem.place_id}>{placeItem.place_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Địa điểm đến:
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tourData.place_to ? tourData.place_to : 0}
                                    onChange={(event) => {
                                        setTourData({ ...tourData, place_to: event.target.value })
                                    }}
                                >
                                    {allPlace.map((placeItem) => {
                                        return (
                                            <MenuItem value={placeItem.place_id}>{placeItem.place_name}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Thời gian đi:
                            </Typography>
                            <TextField id="outlined-basic"
                                variant="outlined"
                                type={'date'}
                                sx={{ width: '100%' }}
                                value={tourData.date_go}
                                onChange={(event) => {
                                    setTourData({ ...tourData, date_go: event.target.value })
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Thời gian về:
                            </Typography>
                            <TextField id="outlined-basic"
                                variant="outlined"
                                type={'date'}
                                sx={{ width: '100%' }}
                                value={tourData.date_return}
                                onChange={(event) => {
                                    setTourData({ ...tourData, date_return: event.target.value })
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Tổng thời gian:
                    </Typography>
                    <RedditTextField
                        defaultValue=""
                        id="country-name"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        value={tourData.total_date}
                        disabled
                    />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Vé trẻ em:
                            </Typography>

                            <RedditTextField
                                defaultValue=""
                                id="country-name"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={tourData.child_price}
                                onChange={(event) => {
                                    setTourData({ ...tourData, child_price: event.target.value })
                                }}
                            />

                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                                Vé người lớn:
                            </Typography>
                            <RedditTextField
                                defaultValue=""
                                id="country-name"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={tourData.adult_price}
                                onChange={(event) => {
                                    setTourData({ ...tourData, adult_price: event.target.value })
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ margin: '10px 0' }}>
                    <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                        Trạng thái:
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tourData.tour_status ? tourData.tour_status : ''}
                            defaultValue={tourData.tour_status ? tourData.tour_status : ''}
                            label="Status"
                            onChange={(event) => {
                                setTourData({ ...tourData, tour_status: event.target.value })
                            }}
                        >
                            <MenuItem value={'Chưa khởi hành'}>Chưa khởi hành</MenuItem>
                            <MenuItem value={'Đã hoàn thành'}>Đã hoàn thành</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {addTourNoti.status &&
                        <Grid item xs={12}>
                            <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Alert severity={addTourNoti.type} sx={{ marginTop: '10px' }}>{addTourNoti.noti}</Alert>
                            </Stack>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={() => updateTour()}>Cập nhật tour</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}