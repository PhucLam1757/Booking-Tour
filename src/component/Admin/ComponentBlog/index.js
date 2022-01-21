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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';
import PostAPI from '../../../API/PostAPI';
import TextareaAutosize from '@mui/material/TextareaAutosize';

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
    { id: 'blog_image', label: 'Hình ảnh', minWidth: 170 },
    { id: 'blog_title', label: 'Tiêu đề', minWidth: 170 },
    // {
    //     id: 'blog_desc',
    //     label: 'Chi tiết',
    //     minWidth: 150,
    //     maxWidth: 150,
    // },
    {
        id: 'updated_at',
        label: 'Ngày đăng',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
    },
];


export default function ComponentAdminBlog(props) {
    const [allPostData, setAllPostData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openNotiSnackBar, setOpenNotiSnackBar] = useState({ status: false, noti: '', type: '' })
    const [openPostModal, setOpenPostModal] = useState({ status: false, type: '' })
    const [postModalData, setPostModalData] = useState({ id: '', title: '', desc: '', image: '' })
    const [postModalNoti, setPostModalNoti] = useState({ status: false, noti: '', type: '' })

    const getAllPostData = async () => {
        try {
            const getPostRes = await PostAPI.getAll()
            if (getPostRes.data && getPostRes.data.success) {
                setAllPostData(getPostRes.data.payload)
            }
        } catch (error) {
            console.log('get all post data error: ', error)
        }
    }

    useEffect(() => {
        getAllPostData()
    }, [])

    const addNewPost = async () => {
        try {
            setPostModalNoti({ status: false, noti: '', type: '' })

            if (!postModalData.title.length || !postModalData.desc.length || !postModalData.image.length) {
                setPostModalNoti({ status: true, noti: 'Các trường không được bỏ trống', type: 'error' })
            } else {
                const postData = { title: postModalData.title, desc: postModalData.desc, image: postModalData.image }

                const addPostRes = await PostAPI.createNewPost(postData)
                if (addPostRes.data && addPostRes.data.success) {

                    setPostModalNoti({ status: true, noti: 'Thêm tin tức thành công', type: 'success' })
                    setAllPostData(addPostRes.data.payload)

                    setTimeout(() => {
                        setOpenPostModal({ status: false, type: '' })
                        setPostModalNoti({ status: false, noti: '', type: '' })
                        setPostModalData({ id: '', title: '', desc: '', image: '' })
                    }, 1000)
                }
            }

        } catch (error) {
            setPostModalNoti({ status: true, noti: 'Add data failed', type: 'error' })
        }
    }

    const deletePostData = async (postId) => {
        try {
            const deleteContactRes = await PostAPI.deletePostData(postId)

            if (deleteContactRes.data && deleteContactRes.data.success) {
                const rowData = [...allPostData].filter((item) => item.blog_id !== postId)

                setAllPostData(rowData)
                setOpenNotiSnackBar({ status: true, noti: 'Xoá tin tức thành công', type: 'success' })
            } else {
                setOpenNotiSnackBar({ status: true, noti: deleteContactRes.data.error.message, type: 'error' })
            }

        } catch (error) {
            setOpenNotiSnackBar({ status: true, noti: error.message, type: 'error' })
        }
    }

    const updatePostData = async () => {
        try {
            setPostModalNoti({ status: false, noti: '', type: '' })

            if (!postModalData.title.length || !postModalData.desc.length || !postModalData.image.length) {
                setPostModalNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const postData = { id: postModalData.id, title: postModalData.title, desc: postModalData.desc, image: postModalData.image }

                const addPostRes = await PostAPI.updatePostData(postData)

                if (addPostRes.data && addPostRes.data.success) {
                    setPostModalNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })

                    const rowData = [...allPostData].map((item) => {
                        if (item.blog_id === postModalData.id) {
                            return {
                                ...item,
                                blog_title: postModalData.title,
                                blog_desc: postModalData.desc,
                                blog_image: postModalData.image
                            }
                        } else {
                            return item
                        }
                    })

                    setAllPostData(rowData)

                    setTimeout(() => {
                        setOpenPostModal({ status: false, type: '' })
                        setPostModalNoti({ status: false, noti: '', type: '' })
                        setPostModalData({ id: '', title: '', desc: '', image: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setPostModalNoti({ status: true, noti: 'Add data failed', type: 'error' })
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
                    onClose={() => setOpenPostModal({ status: false, type: '' })}
                    aria-labelledby="customized-dialog-title"
                    open={openPostModal.status}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenPostModal({ status: false, type: '' })}>
                        {openPostModal.type === 'add' ? 'Thêm tin tức mới' : 'Cập nhật tin tức'}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <RedditTextField
                            label="Title"
                            defaultValue=""
                            id="post-title"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={postModalData.title}
                            onChange={(event) => setPostModalData({ ...postModalData, title: event.target.value })}
                        />

                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Nhập mô tả"
                            style={{ width: '100%', marginTop: '20px' }}
                            value={postModalData.desc}
                            onChange={(event) => setPostModalData({ ...postModalData, desc: event.target.value })}
                        />

                        <Box sx={{ margin: '10px 0' }}>
                            <Typography variant="p" component="p">
                                Hình ảnh:
                            </Typography>
                            <RedditTextField
                                defaultValue=""
                                id="post-title"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                type="file"
                                onChange={(event) => {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(event.target.files[0]);
                                    if (event.target.files[0]) {
                                        reader.onload = function () {
                                            setPostModalData({ ...postModalData, image: reader.result })
                                        };

                                        reader.onerror = function (error) {
                                            console.log('Error: ', error);
                                        };
                                    }
                                }}
                            />
                        </Box>


                        {postModalNoti.status &&
                            <Alert severity={postModalNoti.type} sx={{ marginTop: '10px' }}>{postModalNoti.noti}</Alert>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            if (openPostModal.type === 'add') {
                                addNewPost()
                            } else if (openPostModal.type === 'update') {
                                updatePostData()
                            }
                        }}>
                            {openPostModal.type === 'add' ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography variant="h5" component="h2">
                    Tin tức
                </Typography>

                <Button variant="contained" onClick={() => {
                    setPostModalData({ id: '', title: '', desc: '', image: '' })
                    setOpenPostModal({ status: true, type: 'add' })
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
                            {allPostData
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
                                                                        setOpenPostModal({ status: true, type: 'update' })
                                                                        setPostModalData({ id: row.blog_id, title: row.blog_title, desc: row.blog_desc, image: row.blog_image })
                                                                    }}>Cập nhật</Button>
                                                                    <Button color='error' onClick={() => deletePostData(row.blog_id)}>Xoá</Button>
                                                                </ButtonGroup> :
                                                                (
                                                                    column.id === 'blog_image' ?
                                                                        <img src={row.blog_image} style={{ width: '100px', height: '100px' }} /> :
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
                    count={allPostData.length}
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