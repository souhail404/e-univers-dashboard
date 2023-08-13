import React from 'react'
import { MdShowChart } from 'react-icons/md'

const OverviewCard = ({icon, period, label, thisData, prevData}) => {
    const percent= (thisData > 0) ? (((thisData * 100)/ prevData) - 100).toFixed(2): 0;
    const sign = Math.sign(percent);
    console.log(thisData, prevData);
    return (
        <div className="stat-overview-card">
            <div className="header">
                <div className='icon'>
                    {icon}
                </div>
                <div className='txt'>
                    <p className="head-txt">{label}</p>
                    <p className="period-txt">this {period}</p>
                </div>
            </div>  
            <div className="content">
                <p className='data'>{thisData}</p>
                <p className={`stats ${sign===-1?'down':'up'}`} ><MdShowChart/> <span>{sign===-1?'':'+'}{percent} %</span> </p>
            </div>
        </div>
    )
}

export default OverviewCard