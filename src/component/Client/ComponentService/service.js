import React, { useEffect, useState } from "react";
import ServiceAPI from "../../../API/ServiceAPI";
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
    const [allService, setAllService] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getAllService = async (page) => {
        try {
            setLoading(true)
            const blogRes = await ServiceAPI.getAll(2, page)

            if (blogRes.data && blogRes.data.success) {
                setAllService(blogRes.data.payload.service)
                const allItem = blogRes.data.payload.totalItem
                const total_page = Math.ceil(Number(allItem) / 2)
                setTotalPage(total_page)
                setCurrentPage(page)
            }
            setLoading(false)

        } catch (error) {
            console.log('get blog error: ', error)
        }
    }

    useEffect(() => {
        getAllService(1)
    }, [])

    return (
        <div id="fh5co-blog-section">
            <h1 style={{textAlign: 'center', marginBottom: '50px'}}>DỊCH VỤ CÔNG TY</h1>
            <div className="container">
                {!loading ?
                    <div className="row">
                        {allService.map((serviceItem, serviceIndex) => {
                            return (
                                <div className="col-md-4" key={`home-blog-${serviceIndex}`}>
                                    <div className="blog-grid" style={{ backgroundImage: `url(${serviceItem.service_img})` }}>
                                    </div>
                                    <div className="desc">
                                        <h3 style={{cursor: 'pointer'}}>
                                            <a onClick={()=>navigate(`/service/${serviceItem.service_id}`)}>{serviceItem.service_desc}</a>
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
                                getAllService(value)
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    )
}