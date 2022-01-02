import React from "react";
import WebFooter from "../../component/Client/Common/Footer";
import '../../asset/css/superfish.css'
import '../../asset/css/owl.carousel.css'
import '../../asset/css/bootstrap-datepicker.min.css'
import '../../asset/css/cs-select.css'
import '../../asset/css/cs-skin-border.css'
import '../../asset/css/themify-icons.css'
import '../../asset/css/flaticon.css'
import '../../asset/css/icomoon.css'
import '../../asset/css/style.scss'

export default function ClientLayout(props){
    return (
        <div className="web-client-full-layout">
            {props.children}
            <WebFooter />
        </div>
    )
}