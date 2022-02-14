import React, { useState, useEffect } from 'react'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import TourAPI from '../../../API/TourAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import TouBanner from '../../../asset/images/TourBanner.jpeg';
import '../../../asset/sass/tour-page.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import FavouriteAPI from '../../../API/FavouriteAPI';
import FavoriteIcon from '@mui/icons-material/Favorite';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ComponentTour(props) {
    const [allCategory, setAllCategory] = useState([])
    const [tourData, setTourData] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [valueCategory, setValueCategory] = useState(0)
    const [valueDateGo, setValueDateGo] = useState('')
    const [valueDateReturn, setValueDateReturn] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [favouriteList, setFavouriteList] = useState([])

    const navigate = useNavigate()
    let categoryQuery = useQuery().get("category");
    let searchQuery = useQuery().get("search");
    const customerDataSession = JSON.parse(window.sessionStorage.getItem('user_data'))

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

    const getTourData = async (page, search, category, dateGo, dateReturn) => {
        try {
            const tour = await TourAPI.getTourByFilter({ page: page, limit: 4, search, category, dateGo, dateReturn })
            if (tour.data && tour.data.success) {
                setTourData(tour.data.payload.tour)
                const allItem = tour.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 4)
                setTotalPage(total_page)
                setCurrentPage(page)
            }
        } catch (error) {
            console.log('get tour error: ', error)
        }
    }

    const getFavourite = async () => {
        try {
            if (customerDataSession) {
                const favouriteRes = await FavouriteAPI.getId(customerDataSession.ctm_id)

                if (favouriteRes.data && favouriteRes.data.success) {
                    setFavouriteList(favouriteRes.data.payload)
                }
            }

        } catch (error) {
            console.log('get favourite error: ', error)
        }
    }

    const removeFavourite = async (tour_id) => {
        try{
            if (customerDataSession) {
                const removeRes = await FavouriteAPI.deleteFavourite({user_id: customerDataSession.ctm_id, tour_id: tour_id})
                
                if ( removeRes.data && removeRes.data.success){
                    if ( removeRes.data.payload.length ){
                        const favourite = removeRes.data.payload.map((item) => item.tour_id)
                        setFavouriteList(favourite)
                    }
                }
            }     
        }catch(error){
            console.log('remove favourite error: ', error)
        }
    }

    const addFavourite = async (tour_id) => {
        try{
            if (customerDataSession) {
                const addRes = await FavouriteAPI.addNew({user_id: customerDataSession.ctm_id, tour_id: tour_id})
                
                if ( addRes.data && addRes.data.success){
                    setFavouriteList(addRes.data.payload)
                }
            }
        }catch(error){
            console.log('add favourite error: ', error)
        }
    }

    useEffect(() => {
        getFavourite()
    }, [])

    useEffect(() => {
        getAllCategory()
        getTourData(1, searchQuery ? searchQuery : '', categoryQuery ? categoryQuery : 0, valueDateGo, valueDateReturn)
        setValueCategory(categoryQuery ? categoryQuery : 0)
        setValueSearch(searchQuery ? searchQuery : '')
    }, [])

    return (
        <div className='view-tour-page-item'>
            <div className="wrap">
                <div className="container">
                    <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <div id="availability">
                            <form action="#" style={{ justifyContent: 'center' }} onSubmit={(event) => event.preventDefault()}>
                                <div className="a-col alternate">
                                    <section style={{ height: '100%', marginTop: '4px' }}>
                                        <label style={{ color: 'white' }}>Tìm kiếm Tour</label>
                                        <input className="form-control"
                                            placeholder='Nhập vào Tour muốn tìm kiếm'
                                            value={valueSearch}
                                            onChange={(event) => {
                                                setValueSearch(event.target.value)
                                            }}
                                        />

                                    </section>
                                </div>
                                <div className="a-col alternate">
                                    <section style={{ height: '100%', marginTop: '4px' }}>
                                        <label style={{ color: 'white' }}>LOẠI TOUR</label>
                                        <select className="input-field"
                                            style={{ height: '50px' }}
                                            value={valueCategory}
                                            onChange={(event) => {
                                                setValueCategory(event.target.value)
                                            }}
                                        >
                                            <option value={0} >Tất cả</option>
                                            {allCategory.map((categoryItem, allCategoryIndex) => {
                                                return <option value={categoryItem.category_id} key={`categorySelect-${allCategoryIndex}`}>{categoryItem.name}</option>
                                            })}
                                        </select>
                                    </section>
                                </div>
                                <div className="a-col alternate" style={{ background: 'transparentcy', marginTop: '3px' }}>
                                    <div className="input-field" sx={{ marginTop: '10px' }}>
                                        <label htmlFor="date-start">Ngày đi</label>
                                        <Box >
                                            <TextField id="outlined-basic"
                                                variant="outlined"
                                                type={'date'}
                                                sx={{ width: '100%', background: 'white', height: '50px' }}
                                                value={valueDateGo}
                                                onChange={(event) => {
                                                    setValueDateGo(event.target.value)
                                                }}
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className="a-col alternate" style={{ background: 'transparentcy', marginTop: '3px' }}>
                                    <div className="input-field">
                                        <label htmlFor="date-end">Ngày về</label>
                                        <Box >
                                            <TextField id="outlined-basic"
                                                variant="outlined"
                                                type={'date'}
                                                sx={{ width: '100%', background: 'white', height: '50px' }}
                                                value={valueDateReturn}
                                                onChange={(event) => {
                                                    setValueDateReturn(event.target.value)
                                                }}
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className="a-col alternate">
                                    <div style={{ marginTop: '32px' }}>
                                        <button style={{ height: '50px', background: 'white', border: 'none', width: '100%' }}
                                            onClick={() => getTourData(1, valueSearch, valueCategory, valueDateGo, valueDateReturn)}
                                        >Tìm kiếm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '100px' }}></div>

            <div className='row' style={{ paddingLeft: '40px', paddingRight: '40px', boxSizing: 'border-box', marginLeft: 0, marginRight: 0 }}>
                {tourData.map((tourItem, tourIndex) => {
                    return (
                        <div className='col-12' style={{ marginTop: '20px' }} key={`list-tour-${tourIndex}`}>
                            <div style={{ width: '100%', minheight: '100px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)', padding: '20px' }}>
                                <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                                    <div className='col-sm-12 col-md-4'>
                                        <img src={tourItem.tour_img ? tourItem.tour_img : TouBanner} style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                    <div className='col-sm-10 col-md-6'>
                                        <h2 style={{ color: '#06558A', fontWeight: 700 }}>{tourItem.tour_name}</h2>
                                        <h3 style={{ fontWeight: 600, color: 'black' }}>{tourItem.place_destinate}-{tourItem.place_go}</h3>
                                        <h5>Thời gian: {tourItem.go_time}</h5>
                                        <h5>Phương tiện: {tourItem.transport}</h5>
                                        <h5 style={{ color: 'red', fontSize: '1.2em' }}>Giá vé: Chỉ từ {tourItem.child_price} vnđ</h5>
                                    </div>
                                    <div className='col-2'>
                                        <button class="view-tour-detail-button"
                                            onClick={() => navigate(`/tour/${tourItem.tour_id}`)}
                                            role="button"
                                            style={{ whiteSpace: 'nowrap' }}
                                        >Xem chi tiết</button>

                                        {favouriteList.indexOf(tourItem.tour_id) >= 0 ?
                                            <IconButton onClick={() => removeFavourite(tourItem.tour_id)} color="error">
                                                <FavoriteIcon color="error"/>
                                            </IconButton> :
                                            <IconButton onClick={() => addFavourite(tourItem.tour_id)}>
                                                <FavoriteBorderIcon color="error"/>
                                            </IconButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="row" style={{ justifyContent: 'center', marginTop: '100px', marginLeft: 0, marginRight: 0 }}>
                <Stack spacing={2} flexDirection={'row'} justifyContent={'center'}>
                    <Pagination count={totalPage} color="secondary" defaultPage={1}
                        page={currentPage}
                        onChange={(event, page) => {
                            getTourData(page, valueSearch, valueCategory, valueDateGo, valueDateReturn)
                        }}
                    />
                </Stack>
            </div>

        </div>
    )
}
