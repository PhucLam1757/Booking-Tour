import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ComponentCategory from './category';
import ComponentAdminListHotel from './hotel'

export default function ListHotelAndCategory(props) {
    const [listCate, setListCate] = useState([])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <ComponentCategory {...props} setCate={(cate) => setListCate(cate)}/>
                </Grid>
                <Grid item xs={12} sm={12} sx={{marginTop: '20px'}}>
                    <ComponentAdminListHotel {...props} listCate = {listCate}/>
                </Grid>
            </Grid>
        </Box>
    )
}