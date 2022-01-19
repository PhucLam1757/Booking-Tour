import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BookingAPI from '../../../API/Booking';
import HotelAPI from '../../../API/HotelAPI';

function AdminHotelRevenue() {
    const [filterFromDate, setFilterFromDate] = useState('')
    const [filterToDate, setFilterToDate] = useState('')
    const [listBooking, setListBooking] = useState([])

    const getBookingByData = async (from, to) => {
        try{    
            const bookingRes = await HotelAPI.getBookingByFilterDate({fromDate: filterFromDate, toDate: filterToDate})
            console.log('bookingRes: ', bookingRes)

            if ( bookingRes.data && bookingRes.data.success ){
                setListBooking(bookingRes.data.payload)
            }

        }catch(error){
            console.log('Get booking by data error: ', error)
        }
    }

    useEffect(() => {
        setFilterFromDate(new Date().toISOString().split('T')[0])
        setFilterToDate(new Date().toISOString().split('T')[0])
        getBookingByData('', '')
    }, [])

    useEffect(() => {
        getBookingByData(filterFromDate, filterToDate)
    }, [filterFromDate, filterToDate])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography variant="h5" component="h2">
                        Doanh thu khách sạn
                    </Typography>
                </Stack>

                <br />

                <Stack flexDirection={'row'} justifyContent={'flex-start'}>
                    <Box sx={{ margin: '20px 0' }}>
                        <Typography variant="h6" component="h2">
                            Từ ngày:
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" type={"date"} value={filterFromDate} onChange={(event) => {
                            setFilterFromDate(event.target.value)
                        }} />
                    </Box>
                    <Box sx={{ margin: '20px 0 20px 30px' }}>
                        <Typography variant="h6" component="h2">
                            Đến ngày:
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" type={"date"} value={filterToDate} onChange={(event) => {
                            setFilterToDate(event.target.value)
                        }} />
                    </Box>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart listBooking={listBooking}/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits listBooking={listBooking}/>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders listBooking={listBooking}/>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default function Dashboard() {
    return <AdminHotelRevenue />;
}