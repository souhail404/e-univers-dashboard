import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrdersComparisonChart = ({thisWeek, prevWeek}) => {
    const days= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data = thisWeek.map((el, index) => ({
        _id: days[index],
        thisWeek: el.orderCount,
        prevWeek: prevWeek[index].orderCount,
    }));
    
    return (
        <div className="chart-container f-c-c-c">
            <div className="chart-header">
                <h3>Orders Comparison Chart</h3>
            </div>
            <BarChart width={380} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id"  />
                <YAxis  padding={{ bottom: 3 }} allowDecimals={false}/>
                <Tooltip  />
                <Legend />
                <Bar dataKey="prevWeek" name="Previous Week" fill="#0077b6" minPointSize={5} />
                <Bar dataKey="thisWeek" name="Current Week" fill="#03045e" minPointSize={5} />
            </BarChart>
        </div>
    )
}

export default OrdersComparisonChart