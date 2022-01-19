import React, { useState, useEffect } from 'react'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import TourAPI from '../../../API/TourAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import TouBanner from '../../../asset/images/TourBanner.jpeg';
import '../../../asset/sass/tour-page.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HotelAPI from '../../../API/HotelAPI'

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ComponentHotel(props) {
    const [allCategory, setAllCategory] = useState([])
    const [hotelData, setHotelData] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [valueCategory, setValueCategory] = useState(0)
    const [valueDateGo, setValueDateGo] = useState('')
    const [valueDateReturn, setValueDateReturn] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const navigate = useNavigate()

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

    const getHotelData = async (page,limit, search, category) => {
        try {
            const hotel = await HotelAPI.getHotelByFilter({ page, limit, search, category })
            console.log('hotel: ', hotel)
            if (hotel.data && hotel.data.success) {
                setHotelData(hotel.data.payload.hotel)
                const allItem = hotel.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 2)
                setTotalPage(total_page)
                setCurrentPage(page)
            }
        } catch (error) {
            console.log('get hotel error: ', error)
        }
    }

    useEffect(() => {
        getAllCategory()
        getHotelData(1, 2, '', 0)
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
                                        <label style={{ color: 'white' }}>TÌM KIẾM KHÁCH SẠN</label>
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
                                        <label style={{ color: 'white' }}>LOẠI KHÁCH SẠN</label>
                                        <select className="input-field"
                                            style={{ height: '50px' }}
                                            value={valueCategory}
                                            onChange={(event) => {
                                                setValueCategory(event.target.value)
                                            }}
                                        >
                                            <option value={0} >Tất cả</option>
                                            {allCategory.map((categoryItem, allCategoryIndex) => {
                                                return <option value={categoryItem.cate_id} key={`categorySelect-${allCategoryIndex}`}>{categoryItem.cate_name}</option>
                                            })}
                                        </select>
                                    </section>
                                </div>
                                <div className="a-col alternate">
                                    <div style={{ marginTop: '32px' }}>
                                        <button style={{ height: '50px', background: 'white', border: 'none', width: '100%' }}
                                            onClick={() => getHotelData( 1, 2, valueSearch, valueCategory)}
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
                {hotelData.map((hotelItem, hotelIndex) => {
                    return (
                        <div className='col-12' style={{ marginTop: '20px' }} key={`list-tour-${hotelIndex}`}>
                            <div style={{ width: '100%', minheight: '100px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)', padding: '20px' }}>
                                <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                                    <div className='col-sm-12 col-md-4'>
                                        <img src={hotelItem.hotel_image ? hotelItem.hotel_image : TouBanner} style={{ width: '100%', maxHeight: '300px', height: '300px' }} />
                                    </div>
                                    <div className='col-sm-10 col-md-6'>
                                        <h2 style={{ color: '#06558A', fontWeight: 700 }}>{hotelItem.hotel_name}</h2>
                                        <h4>Địa điểm: <b>{hotelItem.place_name}</b></h4>
                                        <h4>Loại khách sạn: <b>{hotelItem.cate_name}</b></h4>
                                        <h4 style={{maxHeight: '200px'}}>Mô tả: {hotelItem.hotel_desc}</h4>
                                    </div>
                                    <div className='col-2'>
                                        <button class="view-tour-detail-button"
                                            onClick={() => navigate(`/hotel/${hotelItem.hotel_id}`)}
                                            role="button"
                                            style={{ whiteSpace: 'nowrap' }}
                                        >Xem chi tiết</button>
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
                            getHotelData(page, 2, valueSearch, valueCategory)
                        }}
                    />
                </Stack>
            </div>

        </div>
    )
}
