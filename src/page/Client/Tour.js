import React from "react";
import ComponentTourHeader from "../../component/Client/ComponentTour/Header";
import ComponentTour from "../../component/Client/ComponentTour/Tour";

export default function Tour(props){
    return (
        <div>
            <ComponentTourHeader {...props}/>
            <ComponentTour {...props}/>
        </div>
    )
}