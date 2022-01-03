import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
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

            <ListItem button onClick={()=>navigate('/admin/tour-type')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí loại tour" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/country')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí quốc gia" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/blog')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí tin tức" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/contact')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí liên hệ" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/account')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí tài khoản" />
            </ListItem>

            <ListItem button onClick={()=>navigate('/admin/account-role')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
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