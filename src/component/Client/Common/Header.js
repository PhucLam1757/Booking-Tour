import React, { useState, useEffect } from 'react'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import { useNavigate } from 'react-router-dom'

export default function WebHeader(props) {
    const [allCategory, setAllCategory] = useState([])
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

    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <header id="fh5co-header-section">
            <div className="container">
                <div className="nav-header">
                    <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle"><i /></a>
                    <h1 id="fh5co-logo"><a href="index.html">Luxe</a></h1>
                    <nav id="fh5co-menu-wrap" role="navigation">
                        <ul className="sf-menu" id="fh5co-primary-menu">
                            <li><a href="/">Home</a></li>
                            <li>
                                <a className="fh5co-sub-ddown" onClick={() => {navigate('/tour')}} style={{cursor: 'pointer'}}>Tour</a>
                                <ul className="fh5co-sub-menu">
                                    {allCategory.map((categoryItem, categoryIndex) => {
                                        return (
                                            <li key={`categoruMenu-${categoryIndex}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    navigate('/tour')
                                                }}
                                            >
                                                <a>{categoryItem.name}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li><a href="/service">Services</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}