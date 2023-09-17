import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiCalendarEvent } from 'react-icons/bi'
import dayjs from 'dayjs';

const DateRangePicker = () => {
    const [show , setShow] = useState(false)
    const [range , setRange] = useState('week')
    const [startDate , setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleRangeChange = ()=>{
        const date = new Date();
        if(range === 'day'){
            const dayStart = new Date(date);
            const dayEnd = new Date(date);
    
            const start = dayStart.toISOString().split('T')[0]
            const end = dayEnd.toISOString().split('T')[0]
            setStartDate(start)
            setEndDate(end)
        }
        if(range === 'week'){
            const currentDay = date.getDay();
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - currentDay);
        
            const weekEnd = new Date(date);
            weekEnd.setDate(date.getDate() + (6 - currentDay));

            const start = weekStart.toISOString().split('T')[0]
            const end = weekEnd.toISOString().split('T')[0]
            setStartDate(start)
            setEndDate(end)
        }
        if(range === 'month'){
            const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const start = startMonth.toLocaleDateString("fr-CA",{year:"numeric", month:"2-digit", day:"2-digit"});
            const end = endMonth.toLocaleDateString("fr-CA",{year:"numeric", month:"2-digit", day:"2-digit"});
            setStartDate(start)
            setEndDate(end)
        }
        if(range === 'year'){
            const startYear = new Date(date.getFullYear(), 0, 1);
            const endYear = new Date(date.getFullYear(), 11 + 1, 0);
            const start = startYear.toLocaleDateString("fr-CA",{year:"numeric", month:"2-digit", day:"2-digit"});
            const end = endYear.toLocaleDateString("fr-CA",{year:"numeric", month:"2-digit", day:"2-digit"});
            setStartDate(start)
            setEndDate(end)
        }
        
    }

    useEffect(()=>{
        handleRangeChange()
    }, [range])
    
    return (
        <div className="date-range-picker-wrapper"> 
            <button type="button" className='header-200__button' onClick={()=> setShow(!show)}>
                <BiCalendarEvent style={{fontSize:'20px'}} />
                <span>{dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}</span>
                {show ? <AiOutlineUp /> : <AiOutlineDown />}
            </button>
            <div className={`date-range-picker-menu shadow-5 ${show ? 'show': ''}`}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                    <DatePicker format='DD/MM/YYYY' value={dayjs(startDate)} onChange={(v) => {setStartDate(v); setRange('')}} className='date-input' label="Start date picker" />
                    <DatePicker format='DD/MM/YYYY' value={dayjs(endDate)} onChange={(v) => {setEndDate(v); setRange('')}} className='date-input' label="End date picker" />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControl className='select-wrapper' fullWidth>
                    <InputLabel id="select-range-label">By Range</InputLabel>
                    <Select
                        labelId="select-range-label"
                        id="select-range"
                        value={range}
                        label="By Range"
                        onChange={(e)=>setRange(e.target.value)}
                        className='range-input'
                    >
                        <MenuItem value={`day`}>Today</MenuItem>
                        <MenuItem value={`week`}>This Week</MenuItem>
                        <MenuItem value={`month`}>This Month</MenuItem>
                        <MenuItem value={`year`}>This Year</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>  
    )
}

export default DateRangePicker