import React, { useEffect, useState } from "react";
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';
import ComponentHomeBlog from '../../component/Client/ComponentHome/blog';
import ComponentHomePlace from '../../component/Client/ComponentHome/place';
import ComponentHomeService from "../../component/Client/ComponentHome/service";
import ComponentHomeFeedback from "../../component/Client/ComponentHome/feedback";
import ComponentHomeSlider from '../../component/Client/ComponentHome/slider'

// import script from ''
export default function HomePage(props) {

    // const loadScript = () => new Promise((resolve, reject) => {
    //     console.log('aaaaaaaaaaaaaaaaaa')
    //     let ready = false;
    //     if (!document) {
    //         reject(new Error('Document was not defined'));
    //     }
    //     const tag = document.getElementsByTagName('script')[0];
    //     const script = document.createElement('script');

    //     script.type = 'text/javascript';
    //     script.src = '../../asset/js/jquery.flexslider-min.js';
    //     script.async = true;

    //     script.onreadystatechange = () => {
    //         if (!ready && (!this.readyState || this.readyState === 'complete')) {
    //             ready = true;
    //             resolve(script);
    //         }
    //     };
    //     script.onload = script.onreadystatechange;

    //     script.onerror = (msg) => {
    //         console.log(msg);
    //         reject(new Error('Error loading script.'));
    //     };

    //     script.onabort = (msg) => {
    //         console.log(msg);
    //         reject(new Error('Script loading aboirted.'));
    //     };

    //     if (tag.parentNode != null) {
    //         tag.parentNode.insertBefore(script, tag);
    //     }
    // });

    // useEffect(() => {
    //     loadScript()
    // })

    return (
        <div>
            <div id="fh5co-wrapper">
                <div id="fh5co-page">
                    <ComponentHomeHeader />
                    {/* end:fh5co-header */}
                    <ComponentHomeSlider />

                    <ComponentHomePlace />
                    <ComponentHomeService />

                    <ComponentHomeFeedback />
                    <ComponentHomeBlog />
                </div>
                {/* END fh5co-page */}
            </div>
        </div>
    )
}