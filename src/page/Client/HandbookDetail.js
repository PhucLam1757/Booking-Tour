import React from 'react'
import HandbookDetailComponent from '../../component/Client/ComponentHandbookDetail';
import ComponentHomeHeader from '../../component/Client/ComponentHome/header';

export default function HandbookDetailPage(props){
    return (
        <div>
            <ComponentHomeHeader />

            <div style={{marginTop: '70px'}}>
                <HandbookDetailComponent />
            </div>
        </div>
    )
}