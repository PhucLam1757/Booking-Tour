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
import BankAPI from '../../../API/BankAPI';


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
    { id: 'card_name', label: 'Tên ngân hàng', minWidth: 250 },
    {
        id: 'card_number',
        label: 'Số thẻ',
        minWidth: 170,
    },
    {
        id: 'card_author',
        label: 'Chủ tài khoản',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

export default function ComponentAdminBank(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState([]);
    const [openBankModal, setOpenBankModal] = useState({ status: false, type: '' });
    const [newBankData, setNewBankData] = useState({ card_name: '', card_number: '', card_author: '' })
    const [addBankNoti, setAddBankNoti] = useState({ status: false, noti: '', type: '' }) /*display noti in modal when add and update*/
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [comfirmDelete, setComfirmDelete] = useState({ status: false, columnId: '' })

    const getAllContactData = async () => {
        try {
            const getContactRes = await BankAPI.getAll()
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

    const addNewBankInfo = async () => {
        try {
            setAddBankNoti({ status: false, noti: '', type: '' })

            if (!newBankData.card_name.length || !newBankData.card_number.length || !newBankData.card_author.length) {
                setAddBankNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else {
                const addNewBankInfoRes = await BankAPI.addNew({card_name: newBankData.card_name, card_number: newBankData.card_number, card_author: newBankData.card_author })
                
                if (addNewBankInfoRes.data && addNewBankInfoRes.data.success) {
                    setAddBankNoti({ status: true, noti: 'Thêm thông tin tài khoản ngân hàng thành công', type: 'success' })
                    setTableRowData(addNewBankInfoRes.data.payload)

                    setTimeout(() => {
                        setOpenBankModal({ status: false, type: '' })
                        setAddBankNoti({ status: false, noti: '', type: '' })
                        setNewBankData({ card_name: '', card_number: '', card_author: ''})
                    }, 1000)
                }else{
                    setAddBankNoti({ status: true, noti: addNewBankInfoRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddBankNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updateContactData = async (columnId) => {
        try {
            setAddBankNoti({ status: false, noti: '', type: '' })

            if (!newBankData.card_name.length || !newBankData.card_number.length || !newBankData.card_author.length) {
                setAddBankNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else {
                const addNewBankRes = await BankAPI.updateBankInfo({ id: newBankData.id, address: newBankData.address, number_phone: newBankData.phone, email: newBankData.email })

                if (addNewBankRes.data && addNewBankRes.data.success) {
                    setAddBankNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })

                    const rowData = [...tableRowData].map((item) => {
                        if (item.card_id === newBankData.id) {
                            return {
                                ...item,
                                card_name: newBankData.card_name,
                                card_number: newBankData.card_number,
                                card_author: newBankData.card_author
                            }
                        } else {
                            return item
                        }
                    })

                    setTableRowData(rowData)

                    setTimeout(() => {
                        setOpenBankModal({ status: false, type: '' })
                        setAddBankNoti({ status: false, noti: '', type: '' })
                        setNewBankData({ card_name: '', card_number: '', card_author: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setAddBankNoti({ status: true, noti: error.message, type: 'error' })
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
                        const rowData = [...tableRowData].filter((item) => item.card_id !== comfirmDelete.columnId)
                        setTableRowData(rowData)
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin thành công', type: 'success' })
                        
                        setComfirmDelete({ columnId: '', status: false })
                    }}

                    setDeleteFailed={() => {
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin thất bại', type: 'error' })
                    }}
                /> : ''
            }

            {openBankModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenBankModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openBankModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenBankModal({ status: false, type: '' })}>
                            {openBankModal.type === 'add' ? 'Thêm thông tin thẻ ngân hàng' : 'Cập nhật thông tin thẻ'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Tên ngân hàng"
                                defaultValue=""
                                id="contact-address"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newBankData.card_name}
                                onChange={(event) => setNewBankData({ ...newBankData, card_name:event.target.value})}
                            />

                            <RedditTextField
                                label="Số thẻ"
                                defaultValue=""
                                id="contact-phonenumber"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newBankData.phone}
                                onChange={(event) => setNewBankData({ ...newBankData, card_number: event.target.value })}
                            />

                            <RedditTextField
                                label="Chủ thẻ"
                                defaultValue=""
                                id="email"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newBankData.card_author}
                                onChange={(event) => setNewBankData({ ...newBankData, card_author: event.target.value })}
                            />

                            {addBankNoti.status &&
                                <Alert severity={addBankNoti.type} sx={{ marginTop: '10px' }}>{addBankNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openBankModal.type === 'add') {
                                    addNewBankInfo()
                                } else if (openBankModal.type === 'update') {
                                    updateContactData()
                                }
                            }}>
                                {openBankModal.type === 'add' ? 'THÊM MỚI' : 'CẬP NHẬT'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Quản lí số thẻ ngân hàng
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenBankModal({ status: true, type: 'add' })
                    setNewBankData({ card_name: '', card_number: '', card_author: '' })
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
                                                                        setOpenBankModal({ status: true, type: 'update' })
                                                                        setNewBankData({ id: row.card_id, card_name: row.card_name, card_number: row.card_number, card_author: row.card_author })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => setComfirmDelete({ status: true, columnId: row.card_id })}>Xoá</Button>
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

    const deleteBank = async (columnId) => {
        try {
            const deleteBankRes = await BankAPI.deleteBankInfo(columnId)

            if (deleteBankRes.data && deleteBankRes.data.success) {
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
                    <Button autoFocus onClick={() => deleteBank(comfirmId)}>
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

