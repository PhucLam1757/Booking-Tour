import React from "react";
import CommonProfile from '../../component/Client/CommonAccount/profile'
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';

export default function AccountPage(props) {
    return (
        <div>
            <ComponentHomeHeader />
            <div style={{marginTop: '70px', padding: '50px', boxSizing: 'border-box'}}>
                
                <CommonProfile />
            </div>
        </div>
    )
}