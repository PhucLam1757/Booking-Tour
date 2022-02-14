import React, { useEffect, useState } from "react";
import PostAPI from "../../../API/PostAPI";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export default function ConponentListBlog(props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [allBlog, setAllBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getAllBlog = async (page) => {
        try {
            setLoading(true)
            const blogRes = await PostAPI.getAll(12, page)

            if (blogRes.data && blogRes.data.success) {
                setAllBlog(blogRes.data.payload.post)
                const allItem = blogRes.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 12)
                setTotalPage(total_page)
                setCurrentPage(page)
            }
            setLoading(false)

        } catch (error) {
            console.log('get blog error: ', error)
        }
    }

    useEffect(() => {
        getAllBlog(1)
    }, [])

    return (
        <div id="fh5co-blog-section">
            <div className="container">
                {!loading ?
                    <div className="row">
                        {allBlog.map((blogItem, blogIndex) => {
                            return (
                                <div className="col-md-4" key={`home-blog-${blogIndex}`}>
                                    <div className="blog-grid" style={{ backgroundImage: `url(${blogItem.blog_image})` }}>
                                        <div className="date text-center">
                                            <span>{new Date(blogItem.updated_at).getDate()}</span>
                                            <small>{monthNames[new Date(blogItem.updated_at).getMonth()].substr(0, 3)}</small>
                                        </div>
                                    </div>
                                    <div className="desc">
                                        <h3 style={{cursor: 'pointer'}}>
                                            <a onClick={()=>navigate(`/blog/${blogItem.blog_id}`)}>{blogItem.blog_title}</a>
                                        </h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                    <Box sx={{marginTop: '40px', marginBottom: '200px'}}>
                        <Stack spacing={2} flexDirection={'row'} justifyContent={'center'}>
                            <CircularProgress />
                        </Stack>
                    </Box>
                }
                <div className="row" style={{justifyContent: 'center' }}> 
                    <Stack spacing={2} flexDirection={'row'} justifyContent={'center'}>
                        <Pagination count={totalPage} color="secondary" defaultPage={1}
                            page={currentPage}
                            onChange={(event, value) => {
                                getAllBlog(value)
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    )
}