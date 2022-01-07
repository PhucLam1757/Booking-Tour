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

export default function ComponentAdminAddTour(props) {
    const [allPlace, setAllPlace] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [tourData, setTourData] = useState({})
    const [addTourNoti, setAddTourNoti] = useState({ status: false, noti: '', type: '' })

    const navigate = useNavigate()

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

    useEffect(() => {
        getAllPlace()
        getAllCategory()
    }, [])

    const addNewTour = async () => {
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
                const currentDateGetTime = new Date().getTime();
                const dataGo = new Date(tourData.date_go).getTime();
                const dateReturn = new Date(tourData.date_return).getTime();
                const subCurrentDateAndDateGo = dataGo - currentDateGetTime
                const subDateGoAndDateReturn = dateReturn - dataGo

                if (subCurrentDateAndDateGo <= 0) {
                    setAddTourNoti({ status: true, noti: 'Ngày đi không thể nhỏ hơn ngày hiện tại', type: 'error' })
                } else if (subDateGoAndDateReturn < 0) {
                    setAddTourNoti({ status: true, noti: 'Ngày về không thể nhỏ hơn ngày đi', type: 'error' })
                } else {
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
                    }

                    const addTourRes = await TourAPI.addNew(tourAllData)

                    if (addTourRes.data && addTourRes.data.success) {
                        setAddTourNoti({ status: true, noti: 'Thêm thông tin tour thành công', type: 'success' })

                        setTimeout(() => {
                            setAddTourNoti({ status: false, noti: '', type: '' })
                        }, 3000)

                    } else {
                        setAddTourNoti({ status: true, noti: 'Không thể thêm thông tin tour', type: 'error' })
                    }
                }


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
                        label="Tên tour"
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
                        <InputLabel id="demo-simple-select-label">Loại tour</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Loại tour"
                            value={tourData.tour_type}
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
                        <InputLabel id="demo-simple-select-label">Phương tiện</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tourData.tour_transport}
                            displayEmpty
                            onChange={(event) => {
                                setTourData({ ...tourData, tour_transport: event.target.value })
                            }}
                        >
                            <MenuItem value='Máy bay'>Máy bay</MenuItem>
                            <MenuItem value='Tàu hoả'>Tàu hoả</MenuItem>
                            <MenuItem value='Xe khách'>Xe khách</MenuItem>
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
                                <InputLabel id="demo-simple-select-label">Địa điểm đi</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Địa điểm đi"
                                    value={tourData.place_from}
                                    onChange={(event) => {
                                        setTourData({ ...tourData, place_from: event.target.value })
                                    }}
                                >
                                    {allPlace.map((placeItem, placeIndex) => {
                                        return (
                                            <MenuItem value={placeItem.place_id} key={`place-from-${placeIndex}`}>{placeItem.place_name}</MenuItem>
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
                                <InputLabel id="demo-simple-select-label">Địa điểm đến</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Địa điểm đến"
                                    value={tourData.place_to}
                                    onChange={(event) => {
                                        setTourData({ ...tourData, place_to: event.target.value })
                                    }}
                                >
                                    {allPlace.map((placeItem, placeIndex) => {
                                        return (
                                            <MenuItem value={placeItem.place_id} key={`place-to-${placeIndex}`}>{placeItem.place_name}</MenuItem>
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
                                label="Giá vé trẻ em"
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
                                label="Giá vé người lớn"
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
                            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={() => addNewTour()}>Thêm tour</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}