import React, { useEffect, useState } from 'react'

import {MdOutlineAttachMoney, MdOutlineCancel, MdOutlineRemoveShoppingCart, MdOutlineShoppingCart, MdPersonOutline, MdShowChart} from 'react-icons/md'
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
  const [isLoadingOverview , setIsLoadingOverview] = useState(false)
  const [isLoadingCharts , setIsLoadingCharts] = useState(false)
  const [thisPeriodOrders, setThisPeriodOrders]= useState()
  const [oldPeriodOrders, setOldPeriodOrders]= useState()
  const [thisPeriodCustomers, setThisPeriodCustomers]= useState()
  const [oldPeriodCustomers, setOldPeriodCustomers]= useState()
  const [thisPeriodAmount, setThisPeriodAmount]= useState()
  const [oldPeriodAmount, setOldPeriodAmount]= useState()
  const [thisPeriodReturns, setThisPeriodReturns]= useState()
  const [oldPeriodReturns, setOldPeriodReturns]= useState()
  const [thisPeriodData, setThisPeriodData]= useState([])

  const [thisWeekData, setThisWeekData]= useState([])
  const [previousWeekData, setPreviousWeekData]= useState([])
  
  // const fetchOverview = async ()=>{
  //   try{
  //     setIsLoading(true)
  //     const res = await fetch(`http://localhost:4000/api/overview`, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     })
  //     const response = await res.json();
  //     if(res.ok){
  //       const {
  //           thisWeek,
  //           previousWeek,
  //         } = response;
  //         setThisWeekData(thisWeek);
  //         setPreviousWeekData(previousWeek);
  //     }
  //     else{
  //       toast.error(`${response.message}`)
  //     }
  //     setIsLoading(false)
  //   }catch(err){
  //       console.log(err);
  //       setIsLoading(false)
  //   } 
  // }

  const fetchGeneralOverview = async ()=>{
    try{
      setIsLoadingOverview(true)
      const res = await fetch(`http://localhost:4000/api/overview/general?startDate=${overviewPeriod.startDate}&endDate=${overviewPeriod.endDate}&range=${overviewPeriod.range}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const response = await res.json();
      if(res.ok){
        const {
          thisPeriodCustomers, 
          oldPeriodCustomers, 
          thisPeriodOrders, 
          thisPeriodRevenue, 
          oldPeriodOrders, 
          oldPeriodRevenue, 
          thisPeriodReturns, 
          oldPeriodReturns 
        } = response
        setThisPeriodOrders(thisPeriodOrders);
        setOldPeriodOrders(oldPeriodOrders);
        setThisPeriodCustomers(thisPeriodCustomers);
        setOldPeriodCustomers(oldPeriodCustomers);
        setThisPeriodAmount(thisPeriodRevenue);
        setOldPeriodAmount(oldPeriodRevenue);
        setThisPeriodReturns(thisPeriodReturns);
        setOldPeriodReturns(oldPeriodReturns);
      }
      else{
        toast.error(`${response.message}`)
      }
      setIsLoadingOverview(false)
    }catch(err){
        console.log(err);
        setIsLoadingOverview(false)
    } 
  }

  const fetchChartsData = async ()=>{
    try{
      setIsLoadingCharts(true)
      const res = await fetch(`http://localhost:4000/api/overview/amount-chart?startDate=${overviewPeriod.startDate}&endDate=${overviewPeriod.endDate}&range=${overviewPeriod.range}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const response = await res.json();
      if(res.ok){
        const data = response;
        setThisPeriodData(data)
      }
      else{
        toast.error(`${response.message}`)
      }
      setIsLoadingCharts(false)
    }catch(err){
      console.log(err);
      setIsLoadingCharts(false)
    } 
  }
  
  // useEffect(()=>{
  //   fetchOverview() 
  // }, [])

  useEffect(()=>{
    if(overviewPeriod.startDate, overviewPeriod.endDate){
      fetchGeneralOverview()
    }
    if(overviewPeriod.startDate, overviewPeriod.endDate){
      fetchChartsData()
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
        <OverviewCard icon={<MdOutlineShoppingCart /> } label='Orders' period={overviewPeriod.range} thisData={thisPeriodOrders} prevData={oldPeriodOrders} stats={true} isLoading={isLoadingOverview} />
        <OverviewCard icon={<MdOutlineRemoveShoppingCart /> } label='Returned Orders' period={overviewPeriod.range} thisData={thisPeriodReturns} prevData={oldPeriodReturns} isLoading={isLoadingOverview} />
        <OverviewCard icon={<MdOutlineAttachMoney /> } label='Revenue' period={overviewPeriod.range} thisData={thisPeriodAmount} prevData={oldPeriodAmount} stats={true} isLoading={isLoadingOverview} unit={`$`} />
        <OverviewCard icon={<MdPersonOutline /> } label='New Customers' period={overviewPeriod.range} thisData={thisPeriodCustomers} prevData={oldPeriodCustomers} stats={true} isLoading={isLoadingOverview} />
      </section>
      <section className='charts-wrapper'>
        {thisPeriodData ? <OrdersComparisonChart thisPeriod={thisPeriodData} isLoading={isLoadingCharts}/>: null}
        {thisPeriodData ? <AmountComparisonChart thisPeriod={thisPeriodData} isLoading={isLoadingCharts}/>: null}
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