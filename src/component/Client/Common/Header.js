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


export default function WebHeader(props) {
    const [allCategory, setAllCategory] = useState([])
    const navigate = useNavigate()
    const styles = useStyles()

    const userData = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getAllCategory = async () => {
        try {
            const category = await TourCategoryAPI.getAll()

            if (category.data && category.data.success) {
                setAllCategory(category.data.payload)
            }
        } catch (error) {
            console.log('get category error: ', error)
        }
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        getAllCategory()
    }, [])

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{height: '50px'}}>
                <Link sx={{marginLeft: '20px', cursor: 'pointer'}}>
                    <ArrowBackIcon/>
                </Link>
            </Box>
            <Divider />
            <List>
                {[{key: 'TRANG CHỦ', link: '/'}, {key:'TOUR', link: '/tour'}, {key:'KHÁCH SẠN', link: '/hotel'} , {key: 'DỊCH VỤ', link: '/service'}, {key: 'TIN TỨC', link: '/blog'}, {key: 'LIÊN HỆ', link: '/contact'}].map((text, index) => (
                    <ListItem button key={text.key} onClick={()=>navigate(`${text.link}`)}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.key} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar position="sticky" sx={{ background: '#FF5721' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
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
                                                <Typography textAlign="center" onClick={()=>{
                                                    if ( setting === 'Đăng xuất' ) {
                                                        navigate('/')
                                                        window.sessionStorage.removeItem('user_data')
                                                    }else if ( setting === 'Trang cá nhân' ){
                                                        navigate('/account')
                                                    }
                                                }}>{setting === 'Trang quản trị' ? (userData.ctm_role !== 'user'? setting: '') : setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box> : 
                                <Box className={styles.loginTextFrame}>
                                    <Typography className={styles.loginText} onClick={()=>navigate('/login')}><b>Đăng nhập</b></Typography>&nbsp;/ &nbsp;<Typography className={styles.loginText} onClick={()=>navigate('/signup')}><b>Đăng kí</b></Typography>
                                </Box>

                            }
                            <a href='/' style={userData ? {} : {display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <img src={TravelIcon} style={{width: '200px', height: '50px'}}/>
                            </a>

                            <Box>
                                <React.Fragment key={'right'}>
                                    <Button onClick={toggleDrawer('right', true)} sx={userData ? {} : {marginTop: '15px !important'}}>
                                        <MenuIcon />
                                    </Button>
                                    <SwipeableDrawer
                                        anchor={'right'}
                                        open={state['right']}
                                        onClose={toggleDrawer('right', false)}
                                        onOpen={toggleDrawer('right', true)}
                                    >
                                        {list('right')}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            </Box>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}