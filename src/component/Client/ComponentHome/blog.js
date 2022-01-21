import React, { useState, useEffect } from 'react'
import TravelBlog from '../../../asset/images/Travel-blog.jpeg'
import PostAPI from '../../../API/PostAPI'

const monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];

export default function ComponentHomeBlog(props) {
    const [allBlog, setAllBlog] = useState([])

    const getAllBlog = async () => {
        try {
            const allBlog = await PostAPI.getAll(6)
            if (allBlog.data && allBlog.data.success) {
                setAllBlog(allBlog.data.payload)
            }
        } catch (error) {
            console.log('get post error: ', error)
        }
    }

    useEffect(() => {
        getAllBlog()
    }, [])

    return (
        <div id="fh5co-blog-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>BÀI VIẾT MỚI NHẤT</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {allBlog.map((blogItem, blogIndex) => {
                        return (
                            <div className="col-md-4" key={`home-blog-${blogIndex}`}>
                                <div className="blog-grid" style={{ backgroundImage: `url(${blogItem.blog_image})` }}>
                                    <div className="date text-center">
                                        <span>{new Date(blogItem.updated_at).getDate()}</span>
                                        <small>{monthNames[new Date(blogItem.updated_at).getMonth()].substr(0,3)}</small>
                                    </div>
                                </div>
                                <div className="desc">
                                    <h3><a href="#">{blogItem.blog_title}</a></h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}