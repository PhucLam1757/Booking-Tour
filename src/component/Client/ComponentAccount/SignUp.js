import React, { useState, useEffect } from 'react';
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
import RoleAPI from '../../../API/RoleAPI';

const theme = createTheme();

export default function SignUpComponent() {
    let navigation = useNavigate();
    const [signUpNoti, setSignUpNoti] = useState({ status: false, noti: '', type: '' })
    const [userRole, setUserRole] = useState(0)
    const [customerData, setCustomerData] = useState({})
    const [verifyForm, setVerifyForm] = useState(false)
    const [verifyCode, setVerifyCode] = useState(0)

    const getUserRole = async () => {
        try {
            const roleRes = await RoleAPI.getAll('user')

            if (roleRes.data && roleRes.data.success) {
                const rolePayload = roleRes.data.payload
                if (rolePayload.length) {
                    setUserRole(rolePayload[0].role_id)
                }
            }
        } catch (error) {
            console.log('get user role error: ', error)
        }
    }

    useEffect(() => {
        getUserRole()
    }, [])

    const handleSubmitSendCode = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const customerData = {
                name: data.get('name'),
                email: data.get('email'),
                phone: data.get('phone'),
                address: data.get('address'),
                password: data.get('password'),
                confirmPassword: data.get('confirmPassword')
            }

            setSignUpNoti({ status: false, noti: '', type: '' })
            if (!customerData.name.length || !customerData.email.length || !customerData.phone.length || !customerData.address.length || !customerData.password.length || !customerData.confirmPassword.length) {
                setSignUpNoti({ status: true, noti: 'Không thể thiếu thông tin', type: 'error' })
            } else if (!String(customerData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setSignUpNoti({ status: true, noti: 'Email sai định dạng', type: 'error' })
            } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(customerData.phone)) {
                setSignUpNoti({ status: true, noti: 'Số điện thoại sai định dạng', type: 'error' })
            } else if (customerData.password !== customerData.confirmPassword) {
                setSignUpNoti({ status: true, noti: 'Nhập lại mật khẩu không chính xác', type: 'error' })
            } else {
                setSignUpNoti({ status: false, noti: '', type: '' })
                setCustomerData(customerData)

                const verifyEmail = await UserAPI.verifyEmail(customerData.email)

                console.log('verifyEmail: ', verifyEmail)
                if (verifyEmail.data && verifyEmail.data.success) {
                    setVerifyCode(verifyEmail.data.payload)

                    setSignUpNoti({ status: true, noti: 'Đã gửi email xác thực tài khoản', type: 'success' })

                    setTimeout(() => {
                        setSignUpNoti({ status: false, noti: '', type: '' })
                        setVerifyForm(true)
                    }, 2000)
                }else{
                    setSignUpNoti({ status: true, noti: verifyEmail.data.error.message, type: 'error' })
                }
            }

        } catch (error) {
            setSignUpNoti({ status: true, noti: error.message, type: 'error' })
        }

    };

    const handleSubmitSignup = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const code = data.get('verifycode')

            setSignUpNoti({ status: false, noti: '', type: '' })

            if (Number(code) === Number(verifyCode)) {
                const createCustomerRes = await UserAPI.createNewUser({ user_name: customerData.name, user_email: customerData.email, user_phone: customerData.phone, user_address: customerData.address, user_password: customerData.password, role: userRole })
                if (createCustomerRes.data && createCustomerRes.data.success) {
                    window.sessionStorage.setItem("user_data", JSON.stringify({ ctm_email: customerData.email, ctm_role: 'user', ctm_id: createCustomerRes.data.payload}));
                    navigation('/')

                } else {
                    setSignUpNoti({ status: true, noti: createCustomerRes.data.error.message, type: 'error' })
                }

            } else {
                setSignUpNoti({ status: true, noti: 'Mã xác thực không chính xác', type: 'error' })
            }

        } catch (error) {
            setSignUpNoti({ status: true, noti: error.message, type: 'error' })
        }
    }

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
                            Đăng ký
                        </Typography>
                        {!verifyForm ?
                            <Box component="form" noValidate onSubmit={handleSubmitSendCode} sx={{ mt: 1, fontSize: '2em', width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Họ và tên"
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
                                            label="Số điện thoại"
                                            name="phone"
                                            autoComplete="phone"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Địa chỉ"
                                            name="address"
                                            autoComplete="address"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Mật khẩu"
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
                                            label="Nhập lại mật khẩu"
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
                                    Đăng ký
                                </Button>

                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Bạn đã có tài khoản? Đăng nhập
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box> :
                            <Box component="form" noValidate onSubmit={handleSubmitSignup} sx={{ mt: 1, fontSize: '2em', width: '100%' }}>
                                <TextField
                                    autoComplete="given-name"
                                    name="verifycode"
                                    required
                                    fullWidth
                                    id="verifycode"
                                    label="Mã xác thực"
                                    autoFocus
                                />


                                {signUpNoti.status &&
                                    <Alert severity={signUpNoti.type} sx={{ marginTop: '10px' }}>{signUpNoti.noti}</Alert>
                                }

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Xác thực
                                </Button>
                            </Box>
                        }
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}