import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TourIcon from '@mui/icons-material/Tour';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import FeedIcon from '@mui/icons-material/Feed';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FlightIcon from '@mui/icons-material/Flight';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
    const navigate = useNavigate()

    return (
        <div>
            <ListItem button onClick={()=>navigate('/admin')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Trang chủ" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/tour')}>
                <ListItemIcon>
                    <FlightIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí tour" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/tour-type')}>
                <ListItemIcon>
                    <TourIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí loại tour" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/place')}>
                <ListItemIcon>
                    <PlaceIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí địa điểm" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/country')}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí quốc gia" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/blog')}>
                <ListItemIcon>
                    <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí tin tức" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/contact')}>
                <ListItemIcon>
                    <CallIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí liên hệ" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/account')}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí tài khoản" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/account-role')}>
                <ListItemIcon>
                    <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí phân quyền" />
            </ListItem>
        </div>
    )
}

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem> */}
    </div>
);