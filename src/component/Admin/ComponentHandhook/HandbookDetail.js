import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import HandbookAPI from '../../../API/HandhookAPI';

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

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function ComponentAdminHandbookDetail(props) {
    const [handbookDetail, setHandbookDetail] = useState({})
    const [updateHandbookNoti, setUpdateHandbookNoti] = useState({ status: false, noti: '', type: '' })
    const navigate = useNavigate()
    const param = useParams()

    const getHandbookDetail = async () => {
        try {
            const handbookRes = await HandbookAPI.getHandbookById(Number(param.handbookId))

            if (handbookRes.data && handbookRes.data.success ) {
                setHandbookDetail(handbookRes.data.payload[0])
            }
        } catch (error) {
            console.log('get handbook detail error: ', error)
        }
    }

    const updateHandbook = async () => {
        try {
            setUpdateHandbookNoti({ status: false, noti: '', type: '' })

            if (!handbookDetail.handbook_name.length || !handbookDetail.handbook_desc.length || !handbookDetail.handbook_img.length) {
                setUpdateHandbookNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const postData = { id: handbookDetail.handbook_id, handbook_name: handbookDetail.handbook_name, handbook_desc: handbookDetail.handbook_desc, handbook_img: handbookDetail.handbook_img }

                const addPostRes = await HandbookAPI.updateServiceData(postData)

                if (addPostRes.data && addPostRes.data.success) {
                    setUpdateHandbookNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })
                    
                    setTimeout(() => {
                        setUpdateHandbookNoti({ status: false, noti: '', type: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setUpdateHandbookNoti({ status: true, noti: 'Xoá thông tin thất bại', type: 'error' })
        }
    }

    useEffect(() => {
        getHandbookDetail()
    }, [])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Button variant="outlined" onClick={() => navigate('/admin/handbook')}>
                        <ArrowBackIcon />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Box sx={{ margin: '10px 0' }}>
                        <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                            Hình ảnh:
                        </Typography>
                        <img src ={handbookDetail.handbook_img ? handbookDetail.handbook_img : '' } style={{width: '100%', height: '20vw'}}/>
                        <RedditTextField
                            id="country-name"
                            variant="filled"
                            type = "file"
                            style={{ marginTop: 11 }}
                            onChange={(event) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(event.target.files[0]);
                                if (event.target.files[0]) {
                                    reader.onload = function () {
                                        setHandbookDetail({ ...handbookDetail, handbook_img: reader.result })
                                    };
    
                                    reader.onerror = function (error) {
                                        console.log('Error: ', error);
                                    };
                                }
                            }}
                        // disabled
                        />
                    </Box>

                    <Box sx={{ margin: '10px 0' }}>
                        <Typography variant="p" component="p">
                            Tên cẩm nang:
                        </Typography>
                        <RedditTextField
                            defaultValue=""
                            id="country-name"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={handbookDetail.handbook_name && handbookDetail.handbook_name }
                            onChange={(event) => setHandbookDetail({ ...handbookDetail, handbook_name: event.target.value })}
                        // disabled
                        />
                    </Box>

                    <Box sx={{ margin: '10px 0' }}>
                        <Typography variant="p" component="p">
                            Ngày tạo:
                        </Typography>
                        <RedditTextField
                            defaultValue=""
                            id="country-name"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={handbookDetail.create_date ? formatDate(handbookDetail.create_date) : ''}
                            disabled
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} >
                    <Box sx={{ margin: '10px 0' }}>
                        <Typography variant="p" component="p">
                            Chi tiết:
                        </Typography>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={20}
                            placeholder="Insert description"
                            style={{ width: '100%', marginTop: '10px' }}
                            value={handbookDetail.handbook_desc}
                            onChange={(event) => setHandbookDetail({ ...handbookDetail, handbook_desc: event.target.value })}
                        />
                    </Box>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {updateHandbookNoti.status &&
                            <Grid item xs={12}>
                                <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                    <Alert severity={updateHandbookNoti.type} sx={{ marginTop: '10px' }}>{updateHandbookNoti.noti}</Alert>
                                </Stack>
                            </Grid>
                        }

                        <Grid item xs={12}>
                            <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Button variant="contained" sx={{ width: 'fit-content' }} onClick={() => updateHandbook()}>Cập nhật dịch vụ</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}