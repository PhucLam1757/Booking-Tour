import React, { useState, useEffect } from 'react'
import TourCategoryAPI from '../../../API/TourCategoryAPI'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TravelIcon from '../../../asset/images/travel-icon.png'

const useStyles = makeStyles((theme) => ({
    loginText: {
        color: 'white !important',
        cursor: 'pointer',


        '&:hover':{
            color: 'white !important',
            fontWeight: '800 !important',
        }
    },

    loginTextFrame: {
        marginTop: '20px !important',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
}))

const settings = ['Trang cá nhân', 'Đăng xuất'];
const pages = [{ key: 'TRANG CHỦ', link: '/' }, { key: 'TOUR', link: '/tour' }, { key: 'DỊCH VỤ', link: '/service' }, { key: 'TIN TỨC', link: '/blog' }, { key: 'LIÊN HỆ', link: '/contact' }];


export default function WebHeader(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const navigate = useNavigate()
     const styles = useStyles()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar position="sticky" sx={{ background: '#FF5721' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <a href='/' style={userData ? {} : { display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <img src={TravelIcon} style={{ width: '100px', height: '50px' }} />
                            </a>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.key}
                                        onClick={() => {
                                            setAnchorElNav(null);
                                            navigate(`${page.link}`)
                                        }}>
                                        <Typography textAlign="center" >{page.key}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <a href='/' style={userData ? {} : { display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <img src={TravelIcon} style={{ width: '100px', height: '50px' }} />
                            </a>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.key}
                                    onClick={() => {
                                        setAnchorElNav(null);
                                        navigate(`${page.link}`)
                                    }
                                    }
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.key}
                                </Button>
                            ))}
                        </Box>

                        {userData ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" onClick={() => {
                                                if (setting === 'Đăng xuất') {
                                                    navigate('/')
                                                    window.sessionStorage.removeItem('user_data')
                                                } else if (setting === 'Trang cá nhân') {
                                                    navigate('/account')
                                                }
                                            }}>{setting === 'Trang quản trị' ? (userData.ctm_role !== 'user' ? setting : '') : setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> :
                            <Box className={styles.loginTextFrame}>
                                <Typography className={styles.loginText} onClick={() => navigate('/login')}><b>Đăng nhập</b></Typography>&nbsp;/ &nbsp;<Typography className={styles.loginText} onClick={() => navigate('/signup')}><b>Đăng kí</b></Typography>
                            </Box>

                        }

                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}