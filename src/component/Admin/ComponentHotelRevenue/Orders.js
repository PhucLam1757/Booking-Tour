import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useNavigate} from 'react-router-dom'

export default function Orders(props) {
    const [listTour, setListTour] = React.useState([])

    const navagate = useNavigate()
    var nf = new Intl.NumberFormat();

    React.useEffect(() => {
        setListTour(props.listBooking)

    },[props.listBooking])

    return (
        <React.Fragment>
            <Title>Đặt khách sạn</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Tổng số tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTour.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.phone_number}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{nf.format(row.total_price)} VNĐ</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}