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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
    { id: 'role_name', label: 'Tên', minWidth: 250 },
    {
        id: 'role_function',
        label: 'Chức năng',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

const allRole = [
    // { label: 'Trang người dùng', value: 'clent-home' },
    { label: 'Trang chủ Admin', value: 'admin-dashboard' },
    { label: 'Quản lí đặt tour', value: 'admin-booking' },
    { label: 'Quản lí tour', value: 'admin-tour' },
    { label: 'Quản lí loại tour', value: 'admin-tourcategory' },
    { label: 'Quản lí địa điểm', value: 'admin-place' },
    { label: 'Quản lí quốc gia', value: 'admin-contry' },
    { label: 'Quản lí tin tức', value: 'admin-blog' },
    { label: 'Quản lí cẩm nang', value: 'admin-handbook' },
    { label: 'Quản lí dịch vụ', value: 'admin-service' },
    { label: 'Quản lí liên hệ', value: 'admin-contact' },
    { label: 'Quản lí tài khoản', value: 'admin-account' },
    { label: 'Quản lí phân quyền', value: 'admin-accountRole' },
    { label: 'Quản lí thẻ', value: 'admin-bank' },
]

export default function ComponentAdminAccountRole(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [allRoleData, setAllRoleData] = useState([]);
    const [openRoleModal, setOpenRoleModal] = useState({ status: false, type: '' });
    const [newRoleData, setNewRoleData] = useState({ name: '', role_function: '' })
    const [addRoleNoti, setAddRoleNoti] = useState({ status: false, noti: '', type: '' }) /*display noti in modal when add and update*/
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

    useEffect(() => {
        getAllRole()
    }, [])

    const addNewRole = async () => {
        try{
            setAddRoleNoti({ status: false, noti: '', type: '' })
            if (!newRoleData.name.length || !newRoleData.role_function.length) {
                setAddRoleNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else{
                const addRes = await RoleAPI.createNewRole({name: newRoleData.name, role_function: newRoleData.role_function })

                if ( addRes.data && addRes.data.success ){
                    setAddRoleNoti({ status: true, noti: 'Thêm quyền thành công', type: 'success' })
                    setAllRoleData(addRes.data.payload)

                    setTimeout(() => {
                        setOpenRoleModal({ status: false, type: '' })
                        setAddRoleNoti({ status: false, noti: '', type: '' })
                        setNewRoleData({ name: '', role_function: '' })
                    }, 1000)

                }else{
                    setAddRoleNoti({ status: true, noti: addRes.data.error.message, type: 'error' })
                }
            }
        }catch(error){
            setAddRoleNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    const deleteRole = async (roleId) => {
        try{
            const deleteRoleRes = await RoleAPI.deleteRole(roleId)

            if (deleteRoleRes.data && deleteRoleRes.data.success) {
                setAllRoleData(deleteRoleRes.data.payload)
                setOpenNotiSnackBar({ status: true, noti: 'Xoá phân quyền thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: 'Xoá phân quyền thất bại', type: 'error' })
            }

        }catch(error){
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updateRole = async () => {
        try{
            setAddRoleNoti({ status: false, noti: '', type: '' })
            if (!newRoleData.name.length || !newRoleData.role_function.length) {
                setAddRoleNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            }else{
                const addRes = await RoleAPI.updateRole({id: newRoleData.role_id, name: newRoleData.name, role_function: newRoleData.role_function })

                if ( addRes.data && addRes.data.success ){
                    setAddRoleNoti({ status: true, noti: 'Sửa quyền thành công', type: 'success' })
                    
                    const rowData = [...allRoleData].map((item) => {
                        if ( Number(item.role_id) === Number(newRoleData.role_id) ){
                            return {
                                ...item,
                                role_name: newRoleData.name, 
                                role_function: newRoleData.role_function
                            }
                        }else {
                            return item
                        }
                    })
                    setAllRoleData(rowData)

                    setTimeout(() => {
                        setOpenRoleModal({ status: false, type: '' })
                        setAddRoleNoti({ status: false, noti: '', type: '' })
                        setNewRoleData({ name: '', role_function: '' })
                    }, 1000)

                }else{
                    setAddRoleNoti({ status: true, noti: addRes.data.error.message, type: 'error' })
                }
            }
        }catch(error){
            setAddRoleNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

    return (
        <div>
            {openRoleModal.status &&
                <div>
                    <BootstrapDialog
                        onClose={() => setOpenRoleModal({ status: false, type: '' })}
                        aria-labelledby="customized-dialog-title"
                        open={openRoleModal.status}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenRoleModal({ status: false, type: '' })}>
                            {openRoleModal.type === 'add' ? 'Thêm quyền mới' : 'Sửa quyền'}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <RedditTextField
                                label="Tên"
                                defaultValue=""
                                id="contact-address"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                value={newRoleData.name}
                                onChange={(event) => setNewRoleData({ ...newRoleData, name: event.target.value })}
                            />

                            <Box sx={{marginTop: '20px'}}>
                                <Typography variant="p" component="p">
                                    Quyền:
                                </Typography>
                                <FormGroup>
                                    {allRole.map((roleItem, roleIndex) => {
                                        return (
                                            <FormControlLabel key={`add-role-modal-${roleIndex}`}
                                                control={<Checkbox checked={newRoleData.role_function.split(',').includes(roleItem.value)} 
                                                            onChange={(event) => {
                                                                let roleCheck = newRoleData.role_function.split(',')
                                                                if ( roleCheck.indexOf(roleItem.value) >= 0){
                                                                    roleCheck = roleCheck.filter((item) => item !== roleItem.value)
                                                                }else{
                                                                    roleCheck.push(roleItem.value)
                                                                }

                                                                roleCheck = roleCheck.filter((item) => item.length)
                                                                setNewRoleData({...newRoleData, role_function: roleCheck.toString()})
                                                                
                                                            }}/>
                                                        } 
                                                label={roleItem.label} 
                                            />
                                        )
                                    })}
                                </FormGroup>
                            </Box>

                            {addRoleNoti.status &&
                                <Alert severity={addRoleNoti.type} sx={{ marginTop: '10px' }}>{addRoleNoti.noti}</Alert>
                            }

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => {
                                if (openRoleModal.type === 'add') {
                                    addNewRole()
                                } else if (openRoleModal.type === 'update') {
                                    updateRole()
                                }
                            }}>
                                {openRoleModal.type === 'add' ? 'Thêm' : 'Sửa'}
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            }

            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Phân quyền
                </Typography>
                <Button variant="contained" onClick={() => {
                    setOpenRoleModal({ status: true, type: 'add' })
                    setNewRoleData({ name: '', role_function: ''})
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
                            {allRoleData
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
                                                                        setNewRoleData({role_id: row.role_id, name: row.role_name, role_function: row.role_function})
                                                                        setOpenRoleModal({ status: true, type: 'update' })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={()=>deleteRole(row.role_id)} disabled={row.role_name=== 'user' || row.role_name=== 'admin' ? true : false}>Xoá</Button>
                                                                </ButtonGroup> : 
                                                                (
                                                                    column.id === 'role_function' ?
                                                                    <ul>
                                                                        {row.role_function.split(',').map((roleItem, roleIndex) => {
                                                                            const getValueFromLabel = allRole.find((item) => item.value===roleItem)
                                                                            if ( getValueFromLabel ){
                                                                                return <li>{getValueFromLabel.label}</li>
                                                                            }else{
                                                                                return <li></li>
                                                                            }
                                                                            
                                                                        })}
                                                                    </ul>:
                                                                    value))}
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
                    count={allRoleData.length}
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

