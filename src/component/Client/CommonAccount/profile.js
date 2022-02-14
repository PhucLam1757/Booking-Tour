import React, {useState, useEffect} from "react";
import Grid from '@mui/material/Grid';
import NoAvatar from '../../../asset/images/noavatar.png'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import 'react-tabs/style/react-tabs.css';
import UserAPI from "../../../API/UserAPI";
import ListAccoutTour from './bookingTour'

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

const useStyles = makeStyles((theme) => ({

}))

export default function CommonProfile(props) {
    const [userInfo, setUserInfo] = useState({})
    const [addUpdateNoti, setAddUpdateNoti] = useState({status: false, noti: '', type: ''})

    const styles = makeStyles()
    const customerDataSession = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getUserData = async () => {
        try{
            const userRes = await UserAPI.getUserInfo(customerDataSession.ctm_id)
            
            if ( userRes.data && userRes.data.success ){
                setUserInfo(userRes.data.payload)
            }
        }catch(error){
            console.log('get user data error: ', error)
        }
    }

    const updateUserInfo = async () => {
        try{
            const userRes = await UserAPI.updateUserInfo({...userInfo, id: customerDataSession.ctm_id})
        
            if ( userRes.data && userRes.data.success ){
                setAddUpdateNoti({status: true, noti: 'Cập nhật thông tin thành công',type: 'success'})
            }else{
                setAddUpdateNoti({status: true, noti: 'Cập nhật thông tin thất bại',type: 'error'})
            }

            setTimeout(() => {
                setAddUpdateNoti({status: false, noti: '',type: ''})
            }, 3000)

        }catch(error){
            console.log('update user data error: ', error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Stack flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
                        <Avatar
                            alt="user-avatar"
                            src={NoAvatar}
                            sx={{ width: 56, height: 56 }}
                        />
                        <TextField
                            label="Tên"
                            defaultValue=""
                            id="contact-address"
                            variant="filled"
                            style={{ marginTop: 11, width: '100%' }}
                            value={userInfo.name}
                            onChange={(event) => {
                                setUserInfo({...userInfo, name: event.target.value})
                            }}
                        />

                        <TextField
                            label="Email"
                            defaultValue=""
                            id="contact-address"
                            variant="filled"
                            style={{ marginTop: 11, width: '100%' }}
                            value={userInfo.email}
                            onChange={(event) => {
                                setUserInfo({...userInfo, email: event.target.value})
                            }}
                        />

                        <TextField
                            label="Địa chỉ"
                            defaultValue=""
                            id="contact-address"
                            variant="filled"
                            style={{ marginTop: 11, width: '100%' }}
                            value={userInfo.address}
                            onChange={(event) => {
                                setUserInfo({...userInfo, address: event.target.value})
                            }}
                        />
                        <TextField
                            label="Số điện thoại"
                            defaultValue=""
                            id="contact-address"
                            variant="filled"
                            style={{ marginTop: 11, width: '100%' }}
                            value={userInfo.phone_number}
                            onChange={(event) => {
                                setUserInfo({...userInfo, phone_number: event.target.value})
                            }}
                        />

                        {addUpdateNoti.status &&
                            <Grid item xs={12}>
                                <Stack spacing={2} justifyContent="space-around" flexDirection={'row'}>
                                    <Alert severity={addUpdateNoti.type} sx={{ marginTop: '10px' }}>{addUpdateNoti.noti}</Alert>
                                </Stack>
                            </Grid>
                        }

                        <Box sx={{marginTop: '30px'}}>
                            <Button variant="contained" sx={{color: 'white !important'}} onClick={()=>updateUserInfo()}>Cập nhật</Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={1}>
                </Grid>
                <Grid item xs={12} sm={7}>
                        <ListAccoutTour />
                </Grid>
            </Grid>
        </div>
    )
}