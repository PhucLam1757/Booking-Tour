import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits(props) {
    const [turnover, setTurnover] = React.useState(0)
    var nf = new Intl.NumberFormat();

    React.useEffect(() => {
        const allBooking = [...props.listBooking]
        let price = 0
        allBooking.forEach((bookingItem) => {
            price += Number(bookingItem.total_price)
        })

        setTurnover(price)

    }, [props.listBooking])

    return (
        <React.Fragment>
            <Title>Tổng doanh thu(VNĐ)</Title>
            <Typography component="p" variant="h4">
                {nf.format(turnover)} 
            </Typography>
        </React.Fragment>
    );
}