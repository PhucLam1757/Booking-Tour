import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
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
import ServiceAPI from '../../../API/ServiceAPI';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useNavigate } from 'react-router-dom';

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
    { id: 'id', label: 'ID', minWidth: 100 },
    {
        id: 'service_img',
        label: 'Hình ảnh',
        minWidth: 170,
    },
    { id: 'service_name', label: 'Tên dịch vụ', minWidth: 170 },
    {
        id: 'create_date',
        label: 'Ngày đăng',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
    },
];

export default function ComponentAdminListService(props) {
    const [allServiceData, setAllServiceData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [openServiceModal, setOpenServiceModal] = useState({ status: false, type: '' })
    const [serviceModalData, setServiceModalData] = useState({ id: '', service_name: '', service_desc: '', service_img: '' })
    const [serviceModalNoti, setServiceModalNoti] = useState({ status: false, noti: '', type: '' })
    const navigate = useNavigate()

    const getAllServiceData = async () => {
        try {
            const getServiceRes = await ServiceAPI.getAll()
            if (getServiceRes.data && getServiceRes.data.success) {
                setAllServiceData(getServiceRes.data.payload)
            }
        } catch (error) {
            console.log('get all post data error: ', error)
        }
    }

    useEffect(() => {
        getAllServiceData()
    }, [])

    const addNewService = async () => {
        try {
            setServiceModalNoti({ status: false, noti: '', type: '' })

            if (!serviceModalData.service_name.length || !serviceModalData.service_desc.length || !serviceModalData.service_img.length ) {
                setServiceModalNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const serviceData = {service_name: serviceModalData.service_name, service_desc: serviceModalData.service_desc, service_img: serviceModalData.service_img }
                const addPostRes = await ServiceAPI.createNewService(serviceData)
                if (addPostRes.data && addPostRes.data.success ) {
                    setServiceModalNoti({ status: true, noti: 'Thêm thông tin thành công', type: 'success' })
                    setAllServiceData(addPostRes.data.payload)

                    setTimeout(() => {
                        setOpenServiceModal({ status: false, type: '' })
                        setServiceModalNoti({ status: false, noti: '', type: '' })
                        setServiceModalData({ id: '', service_name: '', service_desc: '', service_img: '' })
                    }, 1000)
                }
            }

        } catch (error) {
            setServiceModalNoti({ status: true, noti: 'Thêm thông tin thất bại', type: 'error' })
        }
    }

    const deleteServiceData = async (serviceId) => {
        try {
            const deleteServiceRes = await ServiceAPI.deleteServiceData(serviceId)
            if (deleteServiceRes.data && deleteServiceRes.data.success ) {
                const rowData = [...allServiceData].filter((item) => item.service_id !== serviceId)

                setAllServiceData(rowData)
                setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin dịch vụ thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin dịch vụ thất bại', type: 'error' })
            }

        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin dịch vụ thất bại', type: 'error' })
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
            <div>
                <BootstrapDialog
                    onClose={() => setOpenServiceModal({ status: false, type: '' })}
                    aria-labelledby="customized-dialog-title"
                    open={openServiceModal.status}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenServiceModal({ status: false, type: '' })}>
                        {openServiceModal.type === 'add' ? 'Dịch vụ mới' : 'Cập nhật dịch vụ'}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <RedditTextField
                            label="Tên dịch vụ"
                            defaultValue=""
                            id="post-title"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={serviceModalData.service_name}
                            onChange={(event) => setServiceModalData({ ...serviceModalData, service_name: event.target.value })}
                        />

                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Miêu tả dịch vụ"
                            style={{ width: '100%', marginTop: '20px' }}
                            value={serviceModalData.service_desc}
                            onChange={(event) => setServiceModalData({ ...serviceModalData, service_desc: event.target.value })}
                        />

                        <RedditTextField
                            id="post-title"
                            variant="filled"
                            type="file"
                            style={{ marginTop: 11 }}
                            onChange={(event) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(event.target.files[0]);
                                if (event.target.files[0]) {
                                    reader.onload = function () {
                                        setServiceModalData({ ...serviceModalData, service_img: reader.result })
                                    };
    
                                    reader.onerror = function (error) {
                                        console.log('Error: ', error);
                                    };
                                }
                            }}
                        />


                        {serviceModalNoti.status &&
                            <Alert severity={serviceModalNoti.type} sx={{ marginTop: '10px' }}>{serviceModalNoti.noti}</Alert>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            if (openServiceModal.type === 'add') {
                                addNewService()
                            }
                        }}>
                            {openServiceModal.type === 'add' ? 'Thêm dịch vụ' : 'Cập nhật'}
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                        Dịch vụ
                </Typography>

                <Button variant="contained" onClick={() => {
                    // setServiceModalData({ id: '', service_name: '', service_desc: '', service_img: '' })
                    // setOpenServiceModal({ status: true, type: 'add' })
                    navigate('/admin/service/addnew')
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
                            {allServiceData
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
                                                                    <Button onClick={() => navigate(`/admin/service/${row.service_id}`)}>Chi tiết</Button>
                                                                    <Button color='error' onClick={() => deleteServiceData(row.service_id)}>Xoá</Button>
                                                                </ButtonGroup> : 
                                                                (
                                                                    column.id === 'service_img' ?
                                                                    <img src = {row.service_img} style={{width: '100px', height: '100px'}} /> :
                                                                    value
                                                                )
                                                                )}
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
                    count={allServiceData.length}
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
    )
}