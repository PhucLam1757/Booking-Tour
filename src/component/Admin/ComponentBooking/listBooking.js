import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import PlaceAPI from '../../../API/PlaceAPI';
import TourAPI from '../../../API/TourAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import TourCategoryAPI from '../../../API/TourCategoryAPI';
import BookingAPI from '../../../API/Booking';

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'name', label: 'Tên khách hàng', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'address', label: 'Địa chỉ', minWidth: 100 },
    { id: 'phone', label: 'Số điện thoại', minWidth: 100 },
    { id: 'total_price', label: 'Tổng giá tiền', minWidth: 100 },
    { id: 'status', label: 'Trạng thái', minWidth: 100 },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

export default function ComponentBookingTour(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState([]);
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [listCategory, setListCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [listTour, setListTour] = useState([])
    const [selectedTour, setSelectedTour] = useState(0)
    const [selectedStatus, setSelectedStatus] = useState('all')

    const navigate = useNavigate()

    const getAllBooking = async (category, tour, status) => {
        try {
            const tourByFilter = await BookingAPI.getBookingByFilter({category, tour, status})

            if ( tourByFilter.data && tourByFilter.data.success ){
                setTableRowData(tourByFilter.data.payload)
            }
        } catch (error) {
            console.log('get all tour error: ', error)
        }
    }


    const getAllCategory = async () => {
        try {
            const categoryRes = await TourCategoryAPI.getAll()

            if (categoryRes.data && categoryRes.data.success) {
                setListCategory(categoryRes.data.payload)
            }
        } catch (error) {
            console.log('get category error: ', error)
        }
    }

    const getTourByCategory = async (category) => {
        try {
            const categoryRes = await TourAPI.getTourIdByCategory(category)

            if (categoryRes.data && categoryRes.data.success) {
                setListTour(categoryRes.data.payload)
            }

        } catch (error) {
            console.log('get tour by category error: ', error)
        }
    }

    useEffect(() => {
        getTourByCategory(selectedCategory)
    }, [selectedCategory])


    useEffect(() => {
        getAllCategory()
        getAllBooking(0, 0, 'all')
    }, [])

    const deleteBooking = async (columnId) => {
        try {
            const deleteBooking = await BookingAPI.deleteBooking(columnId)

            if (deleteBooking.data && deleteBooking.data.success) {
                const rowData = [...tableRowData].filter((item) => item.booking_id !== columnId)
                setTableRowData(rowData)

                setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin booking thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: deleteBooking.data.error.message, type: 'error' })
            }
        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const displayStatus = (status) => {
        if (status === 'no_payment') {
            return (
                <Alert badgeContent={4} color="warning" icon={false}>Chưa thanh toán</Alert>
            )
        } else if (status === 'comfirm_payment') {
            return (
                <Alert badgeContent={4} color="primary" icon={false}>Đang chờ xác nhận</Alert>
            )
        } else if (status === 'paymented') {
            return (
                <Alert badgeContent={4} color="success" icon={false}>Đã thanh toán</Alert>
            )

        } else if (status === 'complete') {
            return (
                <Alert badgeContent={4} color="error" icon={false}>Đã hoàn thành</Alert>
            )
        }
    }

    return (
        <div>
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Quản lí đặt tour
                </Typography>
            </Stack>
            <br />

            <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại tour</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCategory}
                            onChange={(event) => {
                                // category, tour, status
                                getAllBooking(event.target.value, selectedTour, selectedStatus )
                                setSelectedCategory(event.target.value)
                            }}
                        >
                            <MenuItem value={0}>Tất cả</MenuItem>
                            {listCategory.map((categoryItem, categoryIndex) => {
                                return (
                                    <MenuItem key={`list-select-category-${categoryIndex}`} value={categoryItem.category_id}>{categoryItem.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tên tour</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedTour}
                            label="Age"
                            onChange={(event) => {
                                // category, tour, status
                                getAllBooking(selectedCategory, event.target.value, selectedStatus )
                                setSelectedTour(event.target.value)
                            }}
                        >
                            <MenuItem value={0}>Tất cả</MenuItem>
                            {listTour.map((tourItem, tourIndex) => {
                                return (
                                    <MenuItem key={`list-select-tour-${tourIndex}`} value={tourItem.tour_id}>{tourItem.tour_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedStatus}
                            label="Age"
                            onChange={(event) => {
                                // category, tour, status
                                getAllBooking(selectedCategory ? selectedCategory : 0, selectedTour ? selectedTour: 0, event.target.value )
                                setSelectedStatus(event.target.value)
                            }}
                        >
                            <MenuItem value={'all'}>Tất cả</MenuItem>
                            <MenuItem value={'no_payment'}>Chưa thanh toán</MenuItem>
                            <MenuItem value={'comfirm_payment'}>Đang chờ xác nhận</MenuItem>
                            <MenuItem value={'paymented'}>Đã thanh toán</MenuItem>
                            <MenuItem value={'complete'}>Đã hoàn thành</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRowData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {

                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'id' ? (page) * 10 + (index + 1) : (
                                                            column.id === 'action' ?
                                                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                    <Button color='error' onClick={() => deleteBooking(row.booking_id)}>Xoá</Button>
                                                                    <Button onClick={() => navigate(`/admin/booking/${row.booking_id}`)}>Chi tiết</Button>
                                                                </ButtonGroup> : 
                                                                (
                                                                    column.id === 'status' ?
                                                                    displayStatus(row.status):
                                                                    value
                                                                ))}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={tableRowData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Snackbar open={openNotiSnackBar.status} autoHideDuration={6000} onClose={() => setOpenNotiSnackBar({ ...openNotiSnackBar, status: false })} sx={{ marginLeft: '280px' }}>
                <Alert onClose={() => setOpenNotiSnackBar({ ...openNotiSnackBar, status: false })} severity={openNotiSnackBar.type} sx={{ width: '100%' }}>
                    {openNotiSnackBar.noti}
                </Alert>
            </Snackbar>
        </div>
    );
}

