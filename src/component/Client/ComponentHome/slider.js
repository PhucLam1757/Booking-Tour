import React, { useEffect, useState } from 'react'
import Slider1 from '../../../asset/images/slider1.jpeg'
import Slider2 from '../../../asset/images/slider2.jpg'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ComponentHomeSlider(props) {
    const [allCategory, setAllCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [searchFilter, setSearchFilter] = useState('')

    const navigate = useNavigate()

    const getAllCategory = async () => {
        try {
            const category = await TourCategoryAPI.getAll()

            if (category.data && category.data.success) {
                setAllCategory(category.data.payload)
            }
        } catch (error) {
            console.log('get cate')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <div>
            <div className="fh5co-parallax" style={{ backgroundImage: `url(${Slider1})` }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                            <div className="fh5co-intro fh5co-table-cell">
                                <h1 className="text-center" style={{ fontWeight: '800' }}>DU LỊCH CÙNG AATOURIST</h1>
                                <p style={{ fontWeight: '600' }}>TOUR PHÚ QUỐC ƯU ĐÃI CỰC KHỦNG<a href="http://freehtml5.co">Xem ngay</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div id="availability">
                            <form action="#">
                                <div className="a-col alternate" style={{ width: '40%' }}>
                                    <section style={{ height: '100%', marginTop: '3px' }}>
                                        <label style={{ color: 'white' }}>Loại tour</label>
                                        <select className="input-field" style={{height: '60%'}} onChange={(event)=> setSelectedCategory(event.target.value)}>
                                            <option value={0}>Tất cả</option>
                                            {allCategory.map((categoryItem, categoryIndex) => {
                                                
                                                return (
                                                    <option value={categoryItem.category_id} key={`list-home-category-${categoryIndex}`}>{categoryItem.name}</option>
                                                )
                                            })}
                                        </select>
                                    </section>
                                </div>

                                <div className="a-col alternate" style={{ width: '40%' }}>
                                    <div className="input-field">
                                        <label htmlFor="date-end">Tên tour</label>
                                        <input className="form-control" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
                                    </div>
                                </div>

                                <div className="a-col action" style={{ width: '20%', cursor: 'pointer' }}>
                                    <a >
                                        <span style={{ paddingTop: '15%', }} onClick={() => navigate(`/tour?category=${selectedCategory}&search=${searchFilter}`)}>
                                            Kiểm tra
                                        </span>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}