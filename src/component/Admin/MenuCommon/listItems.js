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
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';
import RoleAPI from '../../../API/RoleAPI';

export const MainListItems = () => {
    const [roleFunction, setRoleFunction] = React.useState('')
    const navigate = useNavigate()
    const customerDataSession = JSON.parse(window.sessionStorage.getItem('user_data'))

    const getRoleFunction = async () => {
        try {
            if (customerDataSession) {
                const roleRes = await RoleAPI.getRoleByName(customerDataSession.ctm_role)
                if (roleRes.data && roleRes.data.success) {
                    const roleArr = roleRes.data.payload.role_function.split(',')
                    setRoleFunction(roleArr)
                }
            }
        } catch (error) {
            console.log('get role function error: ', error)
        }
    }

    React.useEffect(() => {
        getRoleFunction()
    }, [])

    console.log('roleFunction: ', roleFunction)

    return (
        <div>
            {roleFunction.indexOf('admin-dashboard') >= 0 ?
                <ListItem button onClick={() => navigate('/admin')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trang chủ" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-booking') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/booking')}>
                    <ListItemIcon>
                        <BorderColorIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí đặt tour" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-tour') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/tour')}>
                    <ListItemIcon>
                        <FlightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí tour" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-tourcategory') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/tour-type')}>
                    <ListItemIcon>
                        <TourIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí loại tour" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-place') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/place')}>
                    <ListItemIcon>
                        <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí địa điểm" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-contry') >= 0 ?

                <ListItem button onClick={() => navigate('/admin/country')}>
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí quốc gia" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-blog') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/blog')}>
                    <ListItemIcon>
                        <FeedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí tin tức" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-handbook') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/handbook')}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí cẩm nang" />
                </ListItem> : ''
            }


            {roleFunction.indexOf('admin-service') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/service')}>
                    <ListItemIcon>
                        <HomeRepairServiceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí dịch vụ" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-contact') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/contact')}>
                    <ListItemIcon>
                        <CallIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí liên hệ" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-account') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/account')}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí tài khoản" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-accountRole') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/account-role')}>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí phân quyền" />
                </ListItem> : ''
            }

            {roleFunction.indexOf('admin-bank') >= 0 ?
                <ListItem button onClick={() => navigate('/admin/banking')}>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí thẻ" />
                </ListItem> : ''
            }

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