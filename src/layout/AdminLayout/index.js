import React from "react";
import AdminMenu from '../../component/Admin/MenuCommon/index';

export default function AdminLayout(props){
    return (
        <AdminMenu>
            {props.children}
        </AdminMenu>
    )
}