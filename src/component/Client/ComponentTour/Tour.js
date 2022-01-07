import React, { useState, useEffect } from 'react'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import TourAPI from '../../../API/TourAPI'
import { useNavigate } from 'react-router-dom'
import TouBanner from '../../../asset/images/TourBanner.jpeg';
import '../../../asset/sass/tour-page.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function ComponentTour(props) {
    const [allCategory, setAllCategory] = useState([])
    const [tourData, setTourData] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [valueCategory, setValueCategory] = useState(0)
    const [valueDateGo, setValueDateGo] = useState('')
    const [valueDateReturn, setValueDateReturn] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)


    const navigate = useNavigate()

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
            const tour = await TourAPI.getTourByFilter({ page: page, limit: 2, search, category, dateGo, dateReturn })
            console.log('tour >>>>>> ', tour)
            if (tour.data && tour.data.success) {
                setTourData(tour.data.payload.tour)
                const allItem = tour.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 2)
                setTotalPage(total_page)
                setCurrentPage(page)
            }
        } catch (error) {
            console.log('get tour error: ', error)
        }
    }

    useEffect(() => {
        getAllCategory()
        getTourData(1, '', 0, '', '')
    }, [])

    return (
        <div className='view-tour-page-item'>
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div id="availability">
                            <form action="#" style={{ justifyContent: 'center' }} onSubmit={(event) => event.preventDefault()}>
                                <div className="a-col alternate">
                                    <section style={{ height: '100%', marginTop: '4px' }}>
                                        <label style={{ color: 'white' }}>Tìm kiếm Tour</label>
                                        <input className="form-control"
                                            id="date-end"
                                            type="text"
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

            <div className='row' style={{ paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box' }}>
                {tourData.map((tourItem, tourIndex) => {
                    return (
                        <div className='col-12' style={{ marginTop: '20px' }} key={`list-tour-${tourIndex}`}>
                            <div style={{ width: '100%', minheight: '100px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)', padding: '20px' }}>
                                <div className='row'>
                                    <div className='col-sm-12 col-md-4'>
                                        <img src={TouBanner} style={{ width: '100%', height: 'auto' }} />
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
                                            onClick={()=>navigate(`/tour/${tourItem.tour_id}`)}
                                            role="button"
                                        >Xem chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="row" style={{ justifyContent: 'center', marginTop: '100px' }}>
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
