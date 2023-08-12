import React, { useEffect, useState } from 'react'

import {MdOutlineAttachMoney, MdOutlineShoppingCart, MdPersonOutline, MdShowChart} from 'react-icons/md'
import OrdersComparisonChart from '../components/Charts/OrdersComparisonChart'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import AmountComparisonChart from '../components/Charts/AmountComparaisonChart'
import OverviewCard from '../components/common/OverviewCard'
import { Skeleton } from '@mui/material'

const Home = () => {
  const {user} = useAuth()

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
          setThisWeekOrders(thisWeekOrders);
          setPrevWeekOrders(prevWeekOrders);
          setThisWeekCustomers(thisWeekCustomers);
          setPrevWeekCustomers(prevWeekCustomers);
          setThisWeekAmount(thisWeekAmount);
          setPrevWeekAmount(prevWeekAmount);
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

  
  useEffect(()=>{
    fetchOverview()
  }, [])


  return (
    <main className='page home-page'>
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
            <OverviewCard icon={<MdOutlineShoppingCart /> } label='Orders' period={period} thisData={thisWeekOrders} prevData={prevWeekOrders}  />
            <OverviewCard icon={<MdOutlineAttachMoney /> } label='Revenue' period={period} thisData={thisWeekAmount} prevData={prevWeekAmount}  />
            <OverviewCard icon={<MdPersonOutline /> } label='New Customers' period={period} thisData={thisWeekCustomers} prevData={prevWeekCustomers}  />
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
    </main>
  )
}

export default Home