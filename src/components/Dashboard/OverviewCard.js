import { Skeleton } from '@mui/material';
import React from 'react'
import { MdShowChart } from 'react-icons/md'

const OverviewCard = ({icon, period, label, thisData, prevData, stats, isLoading, unit}) => {
    var percent= 0;
    if(thisData > 0 && prevData === 0) {
        percent = 100;
    }
    else if(thisData === 0 && prevData > 0) {
        percent = -100;
    }
    else if(thisData > 0 && prevData > 0) {
        percent = (((thisData * 100)/ prevData) - 100).toFixed(2)
    }
    else{
        percent= 0
    }
    const sign = Math.sign(percent);
    return (
        <div className="stat-overview-card">
            <div className="header">
                <div className='icon'>
                    {icon}
                </div>
                <div className='txt'>
                    <p className="head-txt">{label}</p>
                    {
                        isLoading ?
                        <Skeleton /> :
                        <p className="period-txt">{period ? `${period==='day'? 'today': `This ${period}`}`: `This Period`}</p>
                    }
                </div>
            </div>  
            <div className="content">
                {
                    isLoading ?
                    <Skeleton /> : <p className='data'>{thisData?.toLocaleString(undefined, { minimumFractionDigits: 0})} {unit}</p>
                }
                
                {   
                    stats ?
                    isLoading ? <Skeleton /> : <p className={`stats ${sign===-1?'down':'up'}`} ><MdShowChart/> <span>{sign===-1?'':'+'}{percent} %</span> </p>
                    : null
                }
                
            </div>
        </div>
    )
}

export default OverviewCard