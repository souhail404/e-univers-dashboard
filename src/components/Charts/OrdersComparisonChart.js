import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrdersComparisonChart = ({thisPeriod, isLoading}) => {
    const [data, setData]  = useState([])
    useEffect(()=>{
        console.log(thisPeriod);
        if (thisPeriod.length > 0) {
            var array = []
            const d = thisPeriod.map((el, i)=>{
                const label = new Date(el.label)
                array[i] = { _id : label.toLocaleDateString(undefined , {month: 'short', day: 'numeric', year: 'numeric',}), value: el.totalOrders }  
                return {
                    _id : label,
                    value: el.totalOrders,
                }  
            })
            setData(array)
        }
    },[thisPeriod])
    
    
    
    return (
        <div className="chart-container f-c-c-c">
            <div className="chart-header">
                <h3>Orders Comparison Chart</h3>
            </div>
            {
                isLoading ?
                <ResponsiveContainer height={300}>
                    <Skeleton variant="rectangular" animation="wave"/>
                </ResponsiveContainer>
                :
                <ResponsiveContainer height={360}>
                    <BarChart data={data} margin={{ top: 0, left: 0, right: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id"  angle={-60} textAnchor="end" height={90} tick={{fontSize: 12}} />
                        <YAxis  padding={{ bottom: 3 }} allowDecimals={false} width={55} tick={{fontSize: 11}}/>
                        <Tooltip  />
                        <Legend />
                        <Bar dataKey="value" name="Orders"  fill="#03045e" minPointSize={5} />
                    </BarChart>
                </ResponsiveContainer>
            }
            
            
        </div>
    )
}

export default OrdersComparisonChart