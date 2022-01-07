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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';
import CountryAPI from '../../../API/CountryAPI';
import PlaceAPI from '../../../API/PlaceAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} sx={{ width: '100%' }} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },

        '.MuiFilledInput-input': {
            minWidth: '300px !important',
        }
    },

}));

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'place_name', label: 'Tên địa điểm', minWidth: 250 },
    { id: 'country_name', label: 'Tên quốc gia', minWidth: 250 },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

export default function ComponentAdminPlace(props) {
    const [page, setPage] = useState(0);
    const [allCountry, setAllCountry] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState([]);
    const [openPlaceModal, setOpenPlaceModal] = useState({ status: false, type: '' });
    const [newPlaceData, setNewPlaceData] = useState({ place_name: '', place_id: 0, country_name: '', country_id: 0 })
    const [addPlaceNoti, setAddPlaceNoti] = useState({ status: false, noti: '', type: '' }) /*display noti in modal when add and update*/
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })

    const getAllPlaceData = async () => {
        try {
            const getPlaceRes = await PlaceAPI.getAll()
            if (getPlaceRes.data && getPlaceRes.data.success) {
                setTableRowData(getPlaceRes.data.payload)
            }
        } catch (error) {
            console.log('Get Place Error: ', error)
        }
    }

    const getAllCountryData = async () => {
        try {
            const getCountryRes = await CountryAPI.getAll()

            if (getCountryRes.data && getCountryRes.data.success) {
                setAllCountry(getCountryRes.data.payload)
            }
        } catch (error) {
            console.log('Get Country Error: ', error)
        }
    }

    useEffect(() => {
        getAllPlaceData()
        getAllCountryData()
    }, [])

    const addNewCountry = async () => {
        try {
            setAddPlaceNoti({ status: false, noti: '', type: '' })

            if (!newPlaceData.place_name.length || newPlaceData.country_id === 0) {
                setAddPlaceNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const addNewPlaceRes = await PlaceAPI.addNew({ place_name: newPlaceData.place_name, country_id: newPlaceData.country_id })

                if (addNewPlaceRes.data && addNewPlaceRes.data.success) {
                    setAddPlaceNoti({ status: true, noti: 'Thêm thông tin quốc gia thành công', type: 'success' })

                    setTableRowData(addNewPlaceRes.data.payload)

                    setTimeout(() => {
                        setOpenPlaceModal({ status: false, type: '' })
                        setAddPlaceNoti({ status: false, noti: '', type: '' })
                        setNewPlaceData({ place_name: '', place_id: 0, country_name: '', country_id: 0 })
                    }, 1000)
                } else {
                    setAddPlaceNoti({ status: true, noti: addNewPlaceRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddPlaceNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const deletePlace = async (columnId) => {
        try {
            const deleteCategoryRes = await PlaceAPI.deletePlace(columnId)

            if (deleteCategoryRes.data && deleteCategoryRes.data.success) {
                const rowData = [...tableRowData].filter((item) => item.place_id !== columnId)
                setTableRowData(rowData)

                setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin địa điểm thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: deleteCategoryRes.data.error.message, type: 'error' })
            }
        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updatePlaceData = async () => {
        try {
            setAddPlaceNoti({ status: false, noti: '', type: '' })

            if (!newPlaceData.place_name.length || newPlaceData.country_id === 0) {
                setAddPlaceNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const updateCategoryRes = await PlaceAPI.updatePlace({ id: newPlaceData.place_id, place_name: newPlaceData.place_name, country_id: newPlaceData.country_id })
                console.log('updateCategoryRes: ', updateCategoryRes)
                if (updateCategoryRes.data && updateCategoryRes.data.success) {
                    setAddPlaceNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })
                    setTableRowData(updateCategoryRes.data.payload)

                    setTimeout(() => {
                        setOpenPlaceModal({ status: false, type: '' })
                        setAddPlaceNoti({ status: false, noti: '', type: '' })
                        setNewPlaceData({ place_name: '', place_id: 0, country_name: '', country_id: 0 })
                    }, 1000)
                }
            }
        } catch (error) {
            setAddPlaceNoti({ status: true, noti: error, type: 'error' })
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            {openPlaceModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenPlaceModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openPlaceModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenPlaceModal({ status: false, type: '' })}>
                            {openPlaceModal.type === 'add' ? 'Quốc gia mới' : 'Cập nhật thông tin quốc gia'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Tên địa điểm"
                                defaultValue=""
                                id="country-name"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newPlaceData.place_name}
                                onChange={(event) => setNewPlaceData({ ...newPlaceData, place_name: event.target.value })}
                            />

                            <Box sx={{ margin: '20px 0' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quốc gia</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newPlaceData.country_id}
                                        label="Age"
                                        onChange={(event) => setNewPlaceData({ ...newPlaceData, country_id: event.target.value })}
                                    >
                                        {allCountry.map((countryItem, countryIndex) => {
                                            return (
                                                <MenuItem value={countryItem.country_id} key={`country-select-${countryIndex}`}>{countryItem.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>

                            {addPlaceNoti.status &&
                                <Alert severity={addPlaceNoti.type} sx={{ marginTop: '10px' }}>{addPlaceNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openPlaceModal.type === 'add') {
                                    addNewCountry()
                                } else if (openPlaceModal.type === 'update') {
                                    updatePlaceData()
                                }
                            }}>
                                {openPlaceModal.type === 'add' ? 'Thêm quốc gia' : 'Cập nhật'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Quản lí địa điểm
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenPlaceModal({ status: true, type: 'add' })
                    setNewPlaceData({ place_name: '', place_id: 0, country_name: '', country_id: 0 })
                }}>
                    Thêm mới
                </Button>
            </Stack>
            <br />

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
                                                                    <Button onClick={() => {
                                                                        setOpenPlaceModal({ status: true, type: 'update' })
                                                                        setNewPlaceData({ place_id: row.place_id, place_name: row.place_name, country_id: row.country_id, country_name: row.country_name })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => deletePlace(row.place_id)}>Xoá</Button>
                                                                </ButtonGroup> : value)}
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

