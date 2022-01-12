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
import ServiceAPI from '../../../API/ServiceAPI';

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

export default function ComponentAdminServiceDetail(props) {
    const [serviceDetail, setServiceDetail] = useState({})
    const [updateServiceNoti, setUpdateServiceNoti] = useState({ status: false, noti: '', type: '' })
    const navigate = useNavigate()
    const param = useParams()

    const getServiceDetail = async () => {
        try {
            const postRes = await ServiceAPI.getServiceById(Number(param.serviceId))

            if (postRes.data && postRes.data.success ) {
                setServiceDetail(postRes.data.payload[0])
            }
        } catch (error) {
            console.log('get post detail error: ', error)
        }
    }

    const updateService = async () => {
        try {
            setUpdateServiceNoti({ status: false, noti: '', type: '' })

            if (!serviceDetail.service_name.length || !serviceDetail.service_desc.length || !serviceDetail.service_img.length) {
                setUpdateServiceNoti({ status: true, noti: 'Các trường không được để trống', type: 'error' })
            } else {
                const postData = { id: serviceDetail.service_id, service_name: serviceDetail.service_name, service_desc: serviceDetail.service_desc, service_img: serviceDetail.service_img }

                const addPostRes = await ServiceAPI.updateServiceData(postData)

                if (addPostRes.data && addPostRes.data.success) {
                    setUpdateServiceNoti({ status: true, noti: 'Cập nhật thông tin thành công', type: 'success' })
                    
                    setTimeout(() => {
                        setUpdateServiceNoti({ status: false, noti: '', type: '' })
                    }, 1000)
                }
            }
        } catch (error) {
            setUpdateServiceNoti({ status: true, noti: 'Xoá thông tin thất bại', type: 'error' })
        }
    }

    useEffect(() => {
        getServiceDetail()
    }, [])

    console.log('serviceDetail: ', serviceDetail)

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Button variant="outlined" onClick={() => navigate('/admin/service')}>
                        <ArrowBackIcon />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Box sx={{ margin: '10px 0' }}>
                        <Typography variant="p" component="p" sx={{ margin: '10px 0' }}>
                            Hình ảnh:
                        </Typography>
                        <img src ={serviceDetail.service_img ? serviceDetail.service_img : '' } style={{width: '100%', height: '20vw'}}/>
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
                                        setServiceDetail({ ...serviceDetail, service_img: reader.result })
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
                            Tên dịch vụ:
                        </Typography>
                        <RedditTextField
                            defaultValue=""
                            id="country-name"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            value={serviceDetail.service_name && serviceDetail.service_name }
                            onChange={(event) => setServiceDetail({ ...serviceDetail, service_name: event.target.value })}
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
                            value={serviceDetail.create_date ? new Date(serviceDetail.create_date).toISOString().split('T')[0] : ''}
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
                            value={serviceDetail.service_desc}
                            onChange={(event) => setServiceDetail({ ...serviceDetail, service_desc: event.target.value })}
                        />
                    </Box>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {updateServiceNoti.status &&
                            <Grid item xs={12}>
                                <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                    <Alert severity={updateServiceNoti.type} sx={{ marginTop: '10px' }}>{updateServiceNoti.noti}</Alert>
                                </Stack>
                            </Grid>
                        }

                        <Grid item xs={12}>
                            <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                <Button variant="contained" sx={{ width: 'fit-content' }} onClick={() => updateService()}>Cập nhật dịch vụ</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}