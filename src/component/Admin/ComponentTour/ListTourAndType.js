import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ComponentTourType from './tourType';
import ComponentAdminTour from './listtour';

export default function ListTourAndType(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <ComponentTourType {...props} />
                </Grid>
                <Grid item xs={12} sm={12} sx={{marginTop: '20px'}}>
                    <ComponentAdminTour {...props} />
                </Grid>
            </Grid>
        </Box>
    )
}