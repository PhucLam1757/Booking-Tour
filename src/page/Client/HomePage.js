import React, { useEffect, useState } from "react";
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';
import ComponentHomeBlog from '../../component/Client/ComponentHome/blog';
import ComponentHomePlace from '../../component/Client/ComponentHome/place';
import ComponentHomeService from "../../component/Client/ComponentHome/service";
import ComponentHomeFeedback from "../../component/Client/ComponentHome/feedback";
import ComponentHomeSlider from '../../component/Client/ComponentHome/slider'
import ComponentHomeHandbook from "../../component/Client/ComponentHome/handbook";

export default function HomePage(props) {
    return (
        <div>
            <div id="fh5co-wrapper">
                <div id="fh5co-page">
                    <ComponentHomeHeader />
                    {/* end:fh5co-header */}
                    <ComponentHomeSlider />
                    <ComponentHomePlace />
                    <ComponentHomeService />
                    <ComponentHomeHandbook />
                    <ComponentHomeFeedback />
                    <ComponentHomeBlog />
                </div>
                {/* END fh5co-page */}
            </div>
        </div>
    )
}