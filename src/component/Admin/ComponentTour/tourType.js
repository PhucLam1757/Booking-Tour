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
import TourCategoryAPI from '../../../API/TourCategoryAPI';

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
    { id: 'name', label: 'Loại tour', minWidth: 150 },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

export default function ComponentTourType(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState([]);
    const [openCategoryModal, setOpenCategoryModal] = useState({ status: false, type: '' });
    const [newCategoryData, setNewCategoryData] = useState({ name: ''})
    const [addCategoryNoti, setAddCategoryNoti] = useState({ status: false, noti: '', type: '' }) /*display noti in modal when add and update*/
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })

    const getAllCategoryData = async () => {
        try {
            const getContactRes = await TourCategoryAPI.getAll()

            if (getContactRes.data && getContactRes.data.success) {

                setTableRowData(getContactRes.data.payload)
            }
        } catch (error) {
            console.log('Get Contact Error: ', error)
        }
    }

    useEffect(() => {
        getAllCategoryData()
    }, [])

    const addNewCategory = async () => {
        try {
            setAddCategoryNoti({ status: false, noti: '', type: '' })

            if (!newCategoryData.name.length) {
                setAddCategoryNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else {
                const addNewCategoryRes = await TourCategoryAPI.addNew({ name: newCategoryData.name})
                
                if (addNewCategoryRes.data && addNewCategoryRes.data.success) {
                    setAddCategoryNoti({ status: true, noti: 'Thêm thông tin loại tour thành công', type: 'success' })
                    
                    setTableRowData(addNewCategoryRes.data.payload)

                    setTimeout(() => {
                        setOpenCategoryModal({ status: false, type: '' })
                        setAddCategoryNoti({ status: false, noti: '', type: '' })
                        setNewCategoryData({ name: '' })
                    }, 1000)
                }else{
                    setAddCategoryNoti({ status: true, noti: addNewCategoryRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddCategoryNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const deleteCategory = async (columnId) => {
        try {
            const deleteCategoryRes = await TourCategoryAPI.deleteCategory(columnId)

            if (deleteCategoryRes.data && deleteCategoryRes.data.success ) {
                const rowData = [...tableRowData].filter((item) => item.category_id !== columnId)
                setTableRowData(rowData)

                setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin liên hệ thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: deleteCategoryRes.data.error.message, type: 'error' })
            }
        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updateCategoryData = async (columnId) => {
        try {
            setAddCategoryNoti({ status: false, noti: '', type: '' })

            if (!newCategoryData.name.length) {
                setAddCategoryNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else {
                const updateCategoryRes = await TourCategoryAPI.updateCategory({ id: newCategoryData.id, name: newCategoryData.name})

                if (updateCategoryRes.data && updateCategoryRes.data.success) {
                    setAddCategoryNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })

                    const rowData = [...tableRowData].map((item) => {
                        if (item.category_id === newCategoryData.id) {
                            return {
                                ...item,
                                name: newCategoryData.name,
                            }
                        } else {
                            return item
                        }
                    })

                    setTableRowData(rowData)

                    setTimeout(() => {
                        setOpenCategoryModal({ status: false, type: '' })
                        setAddCategoryNoti({ status: false, noti: '', type: '' })
                        setNewCategoryData({ name: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setAddCategoryNoti({ status: true, noti: error, type: 'error' })
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
            {openCategoryModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenCategoryModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openCategoryModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenCategoryModal({ status: false, type: '' })}>
                            {openCategoryModal.type === 'add' ? 'Loại Tour Mới' : 'Cập nhật thông tin loại tour'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Tên loại tour"
                                defaultValue=""
                                id="tourcategory-name"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newCategoryData.name}
                                onChange={(event) => setNewCategoryData({ ...newCategoryData, name: event.target.value })}
                            />

                            {addCategoryNoti.status &&
                                <Alert severity={addCategoryNoti.type} sx={{ marginTop: '10px' }}>{addCategoryNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openCategoryModal.type === 'add') {
                                    addNewCategory()
                                } else if (openCategoryModal.type === 'update') {
                                    updateCategoryData()
                                }
                            }}>
                                {openCategoryModal.type === 'add' ? 'Thêm loại tour' : 'Cập nhật'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Quản lí loại tour
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenCategoryModal({ status: true, type: 'add' })
                    setNewCategoryData({name: ''})
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
                                                                        setOpenCategoryModal({ status: true, type: 'update' })
                                                                        setNewCategoryData({ id: row.category_id, name: row.name})
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => deleteCategory(row.category_id)}>Xoá</Button>
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

