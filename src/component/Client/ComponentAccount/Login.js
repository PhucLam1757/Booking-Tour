import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginBackground from '../../../asset/images/login-background.jpg'; 
import Alert from '@mui/material/Alert';
import UserAPI from '../../../API/UserAPI';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function LoginComponent() {
    const [signUpNoti, setSignUpNoti] = useState({ status: false, noti: '', type: '' })
    const navigation = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSignUpNoti({ status: false, noti: '', type: '' })

        const data = new FormData(event.currentTarget);
        const customerData = {
            email: data.get('email'),
            password: data.get('password'),
        }

        if ( !customerData.email.length || !customerData.password.length ){
            setSignUpNoti({ status: true, noti: 'Field can not blank', type: 'error' })
        }else{
            const loginRes = await UserAPI.userLogin({email: customerData.email, password: customerData.password})
            if ( loginRes.data && loginRes.data.success ){
                if ( loginRes.data.payload.ctm_role === 'admin' ){
                    navigation('/admin')
                }else{
                    navigation('/')
                }
                window.sessionStorage.setItem("user_data", JSON.stringify(loginRes.data.payload));
                
            }else{
                setSignUpNoti({ status: true, noti: loginRes.data.error.message, type: 'error' })
            }
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
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, fontSize: '2em', width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            {signUpNoti.status &&
                                <Alert severity={signUpNoti.type} sx={{ marginTop: '10px', width: '100%' }}>{signUpNoti.noti}</Alert>
                            }

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
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