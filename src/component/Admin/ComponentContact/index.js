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
import ContactAPI from '../../../API/ContactAPI';

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
    { id: 'contact_address', label: 'Địa chỉ', minWidth: 250 },
    {
        id: 'contact_phone',
        label: 'SĐT',
        minWidth: 170,
    },
    {
        id: 'contact_email',
        label: 'Email',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

export default function ComponentAdminContact(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState([]);
    const [openContactModal, setOpenContactModal] = useState({ status: false, type: '' });
    const [newContactData, setNewContactData] = useState({ address: '', phone: '', email: '' })
    const [addContactNoti, setAddContactNoti] = useState({ status: false, noti: '', type: '' }) /*display noti in modal when add and update*/
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [comfirmDelete, setComfirmDelete] = useState({ status: false, columnId: '' })

    const getAllContactData = async () => {
        try {
            const getContactRes = await ContactAPI.getAll()
            if (getContactRes.data && getContactRes.data.success) {

                setTableRowData(getContactRes.data.payload)
            }
        } catch (error) {
            console.log('Get Contact Error: ', error)
        }
    }

    useEffect(() => {
        getAllContactData()
    }, [])

    const addNewContact = async () => {
        try {
            setAddContactNoti({ status: false, noti: '', type: '' })

            if (!newContactData.address.length || !newContactData.phone.length || !newContactData.email.length) {
                setAddContactNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else if (!String(newContactData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setAddContactNoti({ status: true, noti: 'Email sai định dạng', type: 'error' })
            } else if (!newContactData.phone.match(/\d/g).length === 10) {
                setAddContactNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            } else {
                const addNewContactRes = await ContactAPI.addNew({ id: new Date().getTime(), address: newContactData.address, number_phone: newContactData.phone, email: newContactData.email })
                
                if (addNewContactRes.data && addNewContactRes.data.success) {
                    setAddContactNoti({ status: true, noti: 'Thêm thông tin liên hệ thành công', type: 'success' })
                    setTableRowData(addNewContactRes.data.payload)

                    setTimeout(() => {
                        setOpenContactModal({ status: false, type: '' })
                        setAddContactNoti({ status: false, noti: '', type: '' })
                        setNewContactData({ address: '', phone: '', email: '' })
                    }, 1000)
                }else{
                    setAddContactNoti({ status: true, noti: addNewContactRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddContactNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updateContactData = async (columnId) => {
        try {
            setAddContactNoti({ status: false, noti: '', type: '' })

            if (!newContactData.address.length || !newContactData.phone.length || !newContactData.email.length) {
                setAddContactNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else if (!String(newContactData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setAddContactNoti({ status: true, noti: 'Email sai định dạng', type: 'error' })
            } else if (!newContactData.phone.match(/\d/g).length === 10) {
                setAddContactNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            } else {
                const addNewContactRes = await ContactAPI.updateContact({ id: newContactData.id, address: newContactData.address, number_phone: newContactData.phone, email: newContactData.email })

                if (addNewContactRes.data && addNewContactRes.data.success) {
                    setAddContactNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })

                    const rowData = [...tableRowData].map((item) => {
                        if (item.contact_id === newContactData.id) {
                            return {
                                ...item,
                                contact_address: newContactData.address,
                                contact_phone: newContactData.phone,
                                contact_email: newContactData.email
                            }
                        } else {
                            return item
                        }
                    })

                    setTableRowData(rowData)

                    setTimeout(() => {
                        setOpenContactModal({ status: false, type: '' })
                        setAddContactNoti({ status: false, noti: '', type: '' })
                        setNewContactData({ address: '', phone: '', email: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setAddContactNoti({ status: true, noti: error.message, type: 'error' })
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
             {comfirmDelete.status ?
                <ComfirmDeteleModal
                    status={comfirmDelete.status}
                    columnId={comfirmDelete.columnId}
                    setStatus={(status) => setComfirmDelete({ columnId: '', status: status })}
                    setDeleteSuccess={() => {
                        const rowData = [...tableRowData].filter((item) => item.contact_id !== comfirmDelete.columnId)
                        setTableRowData(rowData)
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin thành công', type: 'success' })
                        
                        setComfirmDelete({ columnId: '', status: false })
                    }}

                    setDeleteFailed={() => {
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin thất bại', type: 'error' })
                    }}
                /> : ''
            }

            {openContactModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenContactModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openContactModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenContactModal({ status: false, type: '' })}>
                            {openContactModal.type === 'add' ? 'New Conact Data' : 'Update contact data'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Address"
                                defaultValue=""
                                id="contact-address"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newContactData.address}
                                onChange={(event) => setNewContactData({ ...newContactData, address: event.target.value })}
                            />

                            <RedditTextField
                                label="Phone Number"
                                defaultValue=""
                                id="contact-phonenumber"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newContactData.phone}
                                onChange={(event) => setNewContactData({ ...newContactData, phone: event.target.value })}
                            />

                            <RedditTextField
                                label="Email"
                                defaultValue=""
                                id="email"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newContactData.email}
                                onChange={(event) => setNewContactData({ ...newContactData, email: event.target.value })}
                            />

                            {addContactNoti.status &&
                                <Alert severity={addContactNoti.type} sx={{ marginTop: '10px' }}>{addContactNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openContactModal.type === 'add') {
                                    addNewContact()
                                } else if (openContactModal.type === 'update') {
                                    updateContactData()
                                }
                            }}>
                                {openContactModal.type === 'add' ? 'Add CONTACT' : 'Update'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Thông tin liên hệ
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenContactModal({ status: true, type: 'add' })
                    setNewContactData({ address: '', phone: '', email: '' })
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
                                                                        setOpenContactModal({ status: true, type: 'update' })
                                                                        setNewContactData({ id: row.contact_id, address: row.contact_address, phone: row.contact_phone, email: row.contact_email })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => setComfirmDelete({ status: true, columnId: row.contact_id })}>Xoá</Button>
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

const ComfirmDeteleModal = (props) => {
    const [comfirmDeleteModal, setComfirmDeleteModal] = useState(false)
    const [comfirmId, setColumnId] = useState('')

    useEffect(() => {
        setComfirmDeleteModal(props.status)
        setColumnId(props.columnId)
    }, [])

    const deleteContact = async (columnId) => {
        try {
            const deleteContactRes = await ContactAPI.deleteContact(columnId)

            if (deleteContactRes.data && deleteContactRes.data.success) {
                props.setDeleteSuccess()
            } else {
                props.setDeleteFailed()
            }
        } catch (error) {
            props.setDeleteFailed()
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={() => {
                    props.setStatus(false)
                    setComfirmDeleteModal(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={comfirmDeleteModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title"
                    onClose={() => {
                        props.setStatus(false)
                        setComfirmDeleteModal(false)
                    }}>
                    Xác nhận xoá
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    Bạn có chắc chắn muốn xoá
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => deleteContact(comfirmId)}>
                        Xoá
                    </Button>
                    <Button autoFocus onClick={() => {
                        props.setStatus(false)
                        setComfirmDeleteModal(false)
                    }}>
                        Huỷ
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

