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
import HandbookAPI from '../../../API/HandhookAPI';
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
        id: 'handbook_img',
        label: 'Hình ảnh',
        minWidth: 170,
    },
    { id: 'handbook_name', label: 'Tên dịch vụ', minWidth: 170 },
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

export default function ComponentAdminListHandbook(props) {
    const [allHandbookData, setAllHandbookData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [openHandbookModal, setOpenHandbookModal] = useState({ status: false, type: '' })
    const [handbookModalData, setHandbookModalData] = useState({ id: '', handbook_name: '', handbook_desc: '', handbook_img: '' })
    const [handbookModalNoti, setHandbookModalNoti] = useState({ status: false, noti: '', type: '' })
    const [comfirmDelete, setComfirmDelete] = useState({ status: false, columnId: '' })

    const navigate = useNavigate()

    const getAllServiceData = async () => {
        try {
            const getServiceRes = await HandbookAPI.getAll()
            if (getServiceRes.data && getServiceRes.data.success) {
                setAllHandbookData(getServiceRes.data.payload)
            }
        } catch (error) {
            console.log('get all post data error: ', error)
        }
    }

    useEffect(() => {
        getAllServiceData()
    }, [])

    const addNewHandbook = async () => {
        try {
            setHandbookModalNoti({ status: false, noti: '', type: '' })

            if (!handbookModalData.handbook_name.length || !handbookModalData.handbook_desc.length || !handbookModalData.handbook_img.length) {
                setHandbookModalNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const handbookData = { handbook_name: handbookModalData.handbook_name, handbook_desc: handbookModalData.handbook_desc, handbook_img: handbookModalData.handbook_img }
                const addHandbookRes = await HandbookAPI.createNewHandbook(handbookData)
                if (addHandbookRes.data && addHandbookRes.data.success) {
                    setHandbookModalNoti({ status: true, noti: 'Thêm thông tin thành công', type: 'success' })
                    setAllHandbookData(addHandbookRes.data.payload)

                    setTimeout(() => {
                        setOpenHandbookModal({ status: false, type: '' })
                        setHandbookModalNoti({ status: false, noti: '', type: '' })
                        setHandbookModalData({ id: '', handbook_name: '', handbook_desc: '', handbook_img: '' })
                    }, 1000)
                }
            }

        } catch (error) {
            setHandbookModalNoti({ status: true, noti: 'Thêm thông tin thất bại', type: 'error' })
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
                        const rowData = [...allHandbookData].filter((item) => item.handbook_id !== comfirmDelete.columnId)

                        setAllHandbookData(rowData)
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin cẩm nang thành công', type: 'success' })

                        setComfirmDelete({ columnId: '', status: false })
                    }}

                    setDeleteFailed={() => {
                        setOpenNotiSnackBar({ status: true, noti: 'Xoá thông tin thất bại', type: 'error' })
                    }}
                /> : ''
            }

            <div>
                <BootstrapDialog
                    onClose={() => setOpenHandbookModal({ status: false, type: '' })}
                    aria-labelledby="customized-dialog-title"
                    open={openHandbookModal.status}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenHandbookModal({ status: false, type: '' })}>
                        {openHandbookModal.type === 'add' ? 'Cẩm nang mới' : 'Cập nhật cẩm nang'}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <RedditTextField
                            label="Tên cẩm nang"
                            defaultValue=""
                            id="post-title"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={handbookModalData.handbook_name}
                            onChange={(event) => setHandbookModalData({ ...handbookModalData, handbook_name: event.target.value })}
                        />

                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Miêu tả cẩm nang"
                            style={{ width: '100%', marginTop: '20px' }}
                            value={handbookModalData.handbook_desc}
                            onChange={(event) => setHandbookModalData({ ...handbookModalData, handbook_desc: event.target.value })}
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
                                        setHandbookModalData({ ...handbookModalData, handbook_img: reader.result })
                                    };

                                    reader.onerror = function (error) {
                                        console.log('Error: ', error);
                                    };
                                }
                            }}
                        />


                        {handbookModalNoti.status &&
                            <Alert severity={handbookModalNoti.type} sx={{ marginTop: '10px' }}>{handbookModalNoti.noti}</Alert>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            if (openHandbookModal.type === 'add') {
                                addNewHandbook()
                            }
                        }}>
                            {openHandbookModal.type === 'add' ? 'Thêm cẩm nang' : 'Cập nhật'}
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Cẩm Nang
                </Typography>

                <Button variant="contained" onClick={() => {
                    // setHandbookModalData({ id: '', handbook_name: '', handbook_desc: '', handbook_img: '' })
                    // setOpenHandbookModal({ status: true, type: 'add' })
                    navigate('/admin/handbook/addnew')
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
                            {allHandbookData
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
                                                                    <Button onClick={() => navigate(`/admin/handbook/${row.handbook_id}`)}>Chi tiết</Button>
                                                                    <Button color='error' onClick={() => setComfirmDelete({ status: true, columnId: row.handbook_id })}>Xoá</Button>
                                                                </ButtonGroup> :
                                                                (
                                                                    column.id === 'handbook_img' ?
                                                                        <img src={row.handbook_img} style={{ width: '100px', height: '100px' }} /> :
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
                    count={allHandbookData.length}
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

const ComfirmDeteleModal = (props) => {
    const [comfirmDeleteModal, setComfirmDeleteModal] = useState(false)
    const [comfirmId, setColumnId] = useState('')

    useEffect(() => {
        setComfirmDeleteModal(props.status)
        setColumnId(props.columnId)
    }, [])

    const deleteHandbook = async (columnId) => {
        try {
            const deleteHandbookRes = await HandbookAPI.deleteHandbookData(columnId)

            if (deleteHandbookRes.data && deleteHandbookRes.data.success) {
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
                    <Button autoFocus onClick={() => deleteHandbook(comfirmId)}>
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