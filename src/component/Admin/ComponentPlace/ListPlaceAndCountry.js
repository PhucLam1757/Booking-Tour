import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ComponentAdminCountry from './Country';
import ComponentAdminPlace from './Place';

export default function ListPlaceAndCountry(props) {
    const [listCountry, setListCountry] = useState([])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <ComponentAdminCountry {...props}
                        setCountry={(country) => {
                            setListCountry(country)
                        }} />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ marginTop: '20px' }}>
                    <ComponentAdminPlace {...props} listCountry={listCountry}/>
                </Grid>
            </Grid>
        </Box>
    )
}