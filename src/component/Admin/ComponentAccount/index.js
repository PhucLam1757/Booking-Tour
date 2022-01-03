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
import RoleAPI from '../../../API/RoleAPI';
import UserAPI from '../../../API/UserAPI';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    { id: 'name', label: 'Tên', minWidth: 250 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
    },
    {
        id: 'phone_number',
        label: 'SĐT',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'role',
        label: 'Quyền',
        minWidth: 170,
        align: 'center',
    },

    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];


export default function ComponentAdminAccount(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [allRoleData, setAllRoleData] = useState([]);
    const [allAccount, setAllAccount] = useState([])
    const [openAccountModal, setOpenAccountModal] = useState({ status: false, type: '' });
    const [newAccountData, setNewAccountData] = useState({ name: '', email: '', phone_number: '', role: 0, password: '', comfirm_password: '' })
    const [addAccountNoti, setAddAccountNoti] = useState({ status: false, noti: '', type: '' })
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getAllRole = async () => {
        try {
            const roleRes = await RoleAPI.getAll()
            if (roleRes.data && roleRes.data.success) {
                setAllRoleData(roleRes.data.payload)
            }
        } catch (error) {
            console.log('get role error: ', error)
        }
    }

    const getAllAccount = async () => {
        try{
            const userRes = await UserAPI.getAll()
            if ( userRes.data && userRes.data.success ){
                setAllAccount(userRes.data.payload)
            }

        }catch(error){
            console.log('get role error: ', error)
        }
    }

    useEffect(() => {
        getAllRole()
        getAllAccount()
    }, [])

    const addNewAccount = async () => {
        try {
            setAddAccountNoti({ status: false, noti: '', type: '' })
            if (!newAccountData.name.length || !newAccountData.email.length || !newAccountData.phone_number.length || !newAccountData.password.length || !newAccountData.comfirm_password.length || newAccountData.role <= 0) {
                setAddAccountNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else if (!String(newAccountData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setAddAccountNoti({ status: true, noti: 'Email sai định dạng', type: 'error' })
            } else if (!newAccountData.phone_number.match(/\d/g).length === 10) {
                setAddAccountNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            } else if (newAccountData.password !== newAccountData.comfirm_password) {
                setAddAccountNoti({ status: true, noti: 'Nhập lại mật khẩu không chính xác', type: 'error' })
            } else {
                setAddAccountNoti({ status: false, noti: '', type: '' })

                const createUserRes = await UserAPI.createNewUser({ user_name: newAccountData.name, user_email: newAccountData.email, user_phone: newAccountData.phone_number, user_address: '', user_password: newAccountData.password, role: Number(newAccountData.role) })

                if (createUserRes.data && createUserRes.data.success) {
                    setAddAccountNoti({ status: true, noti: 'Thêm tài khoản thành công', type: 'success' })
                    await getAllAccount()

                    setTimeout(() => {
                        setOpenAccountModal({ status: false, type: '' })
                        setAddAccountNoti({ status: false, noti: '', type: '' })
                        setNewAccountData({ name: '', email: '', phone_number: '', role: 0, password: '', comfirm_password: '' })
                    }, 1000)

                } else {
                    setAddAccountNoti({ status: true, noti: createUserRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddAccountNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const deleteAccount = async (userId) => {
        try {
            const deleteUserRes = await UserAPI.deleteAccount(userId)

            if (deleteUserRes.data && deleteUserRes.data.success) {
                setAllAccount(deleteUserRes.data.payload)
                setOpenNotiSnackBar({ status: true, noti: 'Xoá tài khoản thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: 'Xoá tài khoản thất bại', type: 'error' })
            }

        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updateAccount = async () => {
        try {
            setAddAccountNoti({ status: false, noti: '', type: '' })

            if (!newAccountData.name.length || !newAccountData.email.length || !newAccountData.phone_number.length || newAccountData.role <= 0) {
                setAddAccountNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else if (!String(newAccountData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setAddAccountNoti({ status: true, noti: 'Email sai định dạng', type: 'error' })
            } else if (!newAccountData.phone_number.match(/\d/g).length === 10) {
                setAddAccountNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            }else {
                const updateRes = await UserAPI.updateAccount({user_id: newAccountData.user_id ,user_name: newAccountData.name, user_email: newAccountData.email, user_phone: newAccountData.phone_number, user_address: '', role: Number(newAccountData.role) })

                if (updateRes.data && updateRes.data.success) {
                    setAddAccountNoti({ status: true, noti: 'Cập nhật tài khoản thành công', type: 'success' })
                    const rowData = [...allAccount].map((item) => {
                        if (Number(item.user_id) === Number(newAccountData.user_id)) {
                            return {
                                ...item,
                                name: newAccountData.name,
                                email: newAccountData.email,
                                phone_number: newAccountData.phone_number,
                                role: Number(newAccountData.role)
                            }
                        } else {
                            return item
                        }
                    })
                    setAllAccount(rowData)

                    setTimeout(() => {
                        setOpenAccountModal({ status: false, type: '' })
                        setAddAccountNoti({ status: false, noti: '', type: '' })
                        setNewAccountData({ name: '', role_function: '' })
                    }, 1000)

                } else {
                    setAddAccountNoti({ status: true, noti: updateRes.data.error.message, type: 'error' })
                }
            }
        } catch (error) {
            setAddAccountNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    return (
        <div>
            {openAccountModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenAccountModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openAccountModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenAccountModal({ status: false, type: '' })}>
                            {openAccountModal.type === 'add' ? 'Thêm quyền mới' : 'Sửa quyền'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Tên"
                                defaultValue=""
                                id="account-name"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newAccountData.name}
                                onChange={(event) => setNewAccountData({ ...newAccountData, name: event.target.value })}
                            />

                            <RedditTextField
                                label="Email"
                                defaultValue=""
                                id="account-email"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newAccountData.email}
                                onChange={(event) => setNewAccountData({ ...newAccountData, email: event.target.value })}
                            />

                            <RedditTextField
                                label="Phone Number"
                                defaultValue=""
                                id="account-phone"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newAccountData.phone_number}
                                onChange={(event) => setNewAccountData({ ...newAccountData, phone_number: event.target.value })}
                            />
                            <Box sx={{margin: '20px 0'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newAccountData.role}
                                        label="Age"
                                        onChange={(event) => setNewAccountData({ ...newAccountData, role: event.target.value })}
                                    >
                                        {allRoleData.map((roleItem, roleIndex) => {
                                            return (
                                                <MenuItem value={roleItem.role_id} key={`role-select-${roleIndex }`}>{roleItem.role_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>

                            {openAccountModal.type === 'add' &&
                                <>
                                    <RedditTextField
                                        label="Mật khẩu"
                                        defaultValue=""
                                        id="account-password"
                                        variant="filled"
                                        style={{ marginTop: 11 }}
                                        value={newAccountData.password}
                                        type="password"
                                        onChange={(event) => setNewAccountData({ ...newAccountData, password: event.target.value })}
                                    />

                                    <RedditTextField
                                        label="Nhâp lại mật khẩu"
                                        defaultValue=""
                                        id="account-comfirm-password"
                                        variant="filled"
                                        style={{ marginTop: 11 }}
                                        type="password"
                                        value={newAccountData.comfirm_password}
                                        onChange={(event) => setNewAccountData({ ...newAccountData, comfirm_password: event.target.value })}
                                    />
                                </>
                            }

                            {addAccountNoti.status &&
                                <Alert severity={addAccountNoti.type} sx={{ marginTop: '10px' }}>{addAccountNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openAccountModal.type === 'add') {
                                    addNewAccount()
                                } else if (openAccountModal.type === 'update') {
                                    updateAccount()
                                }
                            }}>
                                {openAccountModal.type === 'add' ? 'Thêm' : 'Sửa'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }

            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Tài khoản
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenAccountModal({ status: true, type: 'add' })
                    setNewAccountData({ name: '', email: '', phone_number: '', role: 0, password: '', comfirm_password: '' })
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
                            {allAccount
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
                                                                        setNewAccountData({name: row.name, email: row.email, phone_number: row.phone_number, role: row.role, user_id: row.user_id })
                                                                        setOpenAccountModal({ status: true, type: 'update' })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => deleteAccount(row.user_id)}>Xoá</Button>
                                                                </ButtonGroup> : 
                                                                (
                                                                    column.id === 'role' ?
                                                                    <div>{allRoleData.find((item)=> Number(item.role_id) === Number(row.role)) ? allRoleData.find((item)=> Number(item.role_id) === Number(row.role)).role_name : ''}</div> :
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
                    count={allAccount.length}
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

