import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import LoginBackground from '../../../asset/images/login-background.jpg';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import UserAPI from '../../../API/UserAPI';

const theme = createTheme();

export default function SignUpComponent() {
    let navigation = useNavigate();
    const [signUpNoti, setSignUpNoti] = useState({ status: false, noti: '', type: '' })

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setSignUpNoti({ status: false, noti: '', type: '' })
    
            const data = new FormData(event.currentTarget);
            const customerData = {
                name: data.get('name'),
                email: data.get('email'),
                phone: data.get('phone'),
                address: data.get('address'),
                password: data.get('password'),
                confirmPassword: data.get('confirmPassword')
            }

            if (!customerData.name.length || !customerData.email.length || !customerData.phone.length || !customerData.address.length || !customerData.password.length || !customerData.confirmPassword.length) {
                setSignUpNoti({ status: true, noti: 'Field can not blank', type: 'error' })
            }else if (!String(customerData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setSignUpNoti({ status: true, noti: 'Email is wrong format', type: 'error' })
            } else if (!customerData.phone.match(/\d/g).length === 10) {
                setSignUpNoti({ status: true, noti: 'Phone number is wrong format', type: 'error' })
            }else if ( customerData.password !== customerData.confirmPassword){
                setSignUpNoti({ status: true, noti: 'Confirm password is wrong', type: 'error' })
            }else{
                setSignUpNoti({ status: false, noti: '', type: '' })
    
                const createCustomerRes = await UserAPI.createNewUser({user_name: customerData.name, user_email: customerData.email, user_phone: customerData.phone, user_address: customerData.address, user_password: customerData.password})
                
                if ( createCustomerRes.data && createCustomerRes.data.success ){
                    window.sessionStorage.setItem("user_data", JSON.stringify({ctm_email: customerData.email, ctm_phone: customerData.phone, ctm_role: 'ctm'}));
                    navigation('/')
                }else{
                    setSignUpNoti({ status: true, noti: createCustomerRes.data.error.message, type: 'error' })
                }
            }

        }catch(error){
            setSignUpNoti({ status: true, noti: 'Can not create account', type: 'error' })
            console.log('error: ', error)
        }
        
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${LoginBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="phone"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>

                            {signUpNoti.status &&
                                <Alert severity={signUpNoti.type} sx={{ marginTop: '10px' }}>{signUpNoti.noti}</Alert>
                            }

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}