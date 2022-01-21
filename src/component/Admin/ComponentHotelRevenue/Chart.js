import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export default function Chart(props) {
    const [chartData, setChartData] = React.useState()
    const theme = useTheme();

    React.useEffect(() => {
        const allBooking = [...props.listBooking]
        const data = []

        const getDate = []

        allBooking.forEach((bookingItem) => {
            if (getDate.indexOf(formatDate(bookingItem.created_date)) < 0) {
                getDate.push(formatDate(bookingItem.created_date))
            }
        })

        getDate.forEach((dateItem) => {
            let price = 0
            allBooking.forEach((bookingItem) => {
                if (formatDate(bookingItem.created_date).toString() === dateItem.toString()) {
                    price += Number(bookingItem.total_price)
                }
            })
            data.push(
                createData(formatDate(dateItem), price)
            )
        })
        setChartData(data)

    }, [props.listBooking])

    return (
        <React.Fragment>
            <Title>Doanh thu</Title>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                          
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}