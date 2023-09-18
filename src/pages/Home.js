import React, { useEffect, useState } from 'react'

import {MdOutlineAttachMoney, MdOutlineShoppingCart, MdPersonOutline, MdShowChart} from 'react-icons/md'
import OrdersComparisonChart from '../components/Charts/OrdersComparisonChart'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import AmountComparisonChart from '../components/Charts/AmountComparaisonChart'
import OverviewCard from '../components/Dashboard/OverviewCard'
import { Skeleton } from '@mui/material'
import RecentOrdersList from '../components/Dashboard/RecentOrdersList'
import DateRangePicker from '../components/common/DateRangePicker'
import { BiDownload } from 'react-icons/bi'

const Home = () => {
  const {user} = useAuth()

  const [overviewPeriod, setOverviewPeriod] = useState({startDate:'', endDate:'', range:''})

  const [period , setPeriod] = useState('week')
  const [isLoading , setIsLoading] = useState(false)
  const [thisWeekOrders, setThisWeekOrders]= useState()
  const [prevWeekOrders, setPrevWeekOrders]= useState()
  const [thisWeekCustomers, setThisWeekCustomers]= useState()
  const [prevWeekCustomers, setPrevWeekCustomers]= useState()
  const [thisWeekAmount, setThisWeekAmount]= useState()
  const [prevWeekAmount, setPrevWeekAmount]= useState()
  const [thisWeekData, setThisWeekData]= useState([])
  const [previousWeekData, setPreviousWeekData]= useState([])
  
  const fetchOverview = async ()=>{
    try{
      setIsLoading(true)
      const res = await fetch(`http://localhost:4000/api/overview`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const response = await res.json();
      if(res.ok){
        const {
            thisWeekOrders, 
            prevWeekOrders,
            thisWeekAmount,
            prevWeekAmount,
            thisWeek,
            previousWeek,
            thisWeekCustomers,
            prevWeekCustomers
          } = response;
          setThisWeekData(thisWeek);
          setPreviousWeekData(previousWeek);
      }
      else{
        toast.error(`${response.message}`)
      }
      setIsLoading(false)
    }catch(err){
        console.log(err);
        setIsLoading(false)
    } 
  }

  const fetchGeneralOverview = async ()=>{
    try{
      console.log(`http://localhost:4000/api/overview/general?startDate=${overviewPeriod.startDate}&endDate=${overviewPeriod.endDate}&range=${overviewPeriod.range}`);
      const res = await fetch(`http://localhost:4000/api/overview/general?startDate=${overviewPeriod.startDate}&endDate=${overviewPeriod.endDate}&range=${overviewPeriod.range}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const response = await res.json();
      if(res.ok){
        const {thisPeriodCustomers, oldPeriodCustomers, thisPeriodOrders, thisPeriodRevenue, oldPeriodOrders, oldPeriodRevenue} = response
        setThisWeekOrders(thisPeriodOrders);
        setPrevWeekOrders(oldPeriodOrders);
        setThisWeekCustomers(thisPeriodCustomers);
        setPrevWeekCustomers(oldPeriodCustomers);
        setThisWeekAmount(thisPeriodRevenue);
        setPrevWeekAmount(oldPeriodRevenue);
        console.log('yesss');
      }
      else{
        toast.error(`${response.message}`)
      }
    }catch(err){
        console.log(err);
    } 
  }

  
  useEffect(()=>{
    fetchOverview()
  }, [])

  useEffect(()=>{
    if(overviewPeriod.startDate, overviewPeriod.endDate){
      fetchGeneralOverview()
    }
  }, [overviewPeriod])

  return (
    <main className='page home-page'>
      <section className='white-bg-section flex-c-jb header-200'>
        <div>
        </div>
        <div className='f-r-c-c header-200__right'>
          <DateRangePicker overviewPeriod={overviewPeriod} setOverviewPeriod={setOverviewPeriod} />   
          <button type="button" className='header-200__button'>
              <BiDownload style={{fontSize:'20px'}} />
              <span>Download Report</span>
          </button> 
        </div>
      </section>
      <section className='overview-cards-wrapper'>
        {
          isLoading ?
            <>
              <Skeleton height={100}/>
              <Skeleton height={100}/>
              <Skeleton height={100}/>
            </>
          :
          <>
            <OverviewCard icon={<MdOutlineShoppingCart /> } label='Orders' period={overviewPeriod.range} thisData={thisWeekOrders} prevData={prevWeekOrders}  />
            <OverviewCard icon={<MdOutlineAttachMoney /> } label='Revenue' period={overviewPeriod.range} thisData={thisWeekAmount} prevData={prevWeekAmount}  />
            <OverviewCard icon={<MdPersonOutline /> } label='New Customers' period={overviewPeriod.range} thisData={thisWeekCustomers} prevData={prevWeekCustomers}  />
          </>
        }
      </section>
      <section className='charts-wrapper'>
        {
          isLoading ?
            <>
              <Skeleton height={200}/>
              <Skeleton height={200}/>
            </>
          :
          <>
            <OrdersComparisonChart thisWeek={thisWeekData} prevWeek={previousWeekData} />
            <AmountComparisonChart thisWeek={thisWeekData} prevWeek={previousWeekData} />
          </>
        }
        
      </section>
      <section className='white-bg-section'>
        <div className="section-header">
          <h3>Recent Orders </h3>
        </div>
        <RecentOrdersList />
      </section>
    </main>
  )
}

export default Home