import React, { useEffect, useState } from 'react'
import { FiEdit, FiEye } from 'react-icons/fi'
import OverviewCard from '../../components/Dashboard/OverviewCard'
import { MdOutlineAttachMoney, MdOutlineLocalShipping, MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from 'react-icons/md'
import TableSkeleton from '../../components/ListingTable/TableSkeleton'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import formatDate from '../../services/formatDate'
import { toast } from 'react-toastify'
import EmptyFetchRes from '../../components/ListingTable/EmptyFetchRes'
import PageHeading from '../../components/common/PageHeading'
import SelectProduct from '../../components/Orders/SelectProduct'
import SelectState from '../../components/Orders/SelectState'
import Pagination from '../../components/ListingTable/Pagination'


const CustomerDetails = () => {
    const {customerId} = useParams();
    const {user} = useAuth()
    const navigate = useNavigate()

    const [isFetchingGeneralInfos, setIsFetchingGeneralInfos]= useState(false)
    const [isFetchingCustomerOrders, setIsFetchingCustomerOrders]= useState(false)
    const [isFetchingCustomerOrdersOverview, setIsFetchingCustomerOrdersOverview]= useState(false)
    const [customerData, setCustomerData]= useState()
    const [customerOrdersData, setCustomerOrdersData]= useState([])
    const [customerOrdersOverview, setCustomerOrdersOverview]= useState([])
    const [page, setPage] =useState(1);
    const [pageSize, setPageSize] =useState(6);
    const [totalPages, setTotalPages] = useState();
    const [ordersCount, setOrdersCount] = useState();
    const [filterProduct, setFilterProduct]= useState('');
    const [filterState, setFilterState]= useState('');
    const [customerSpending, setCustomerSpending]= useState(0);


    const fetchCustomer = async()=>{
        try{ 
            setIsFetchingGeneralInfos(true)
            const res = await fetch(`http://localhost:4000/api/user/id/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
                const {user} = response;
                setCustomerData(user);
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsFetchingGeneralInfos(false)
        }catch(err){
            console.log(err);
            setIsFetchingGeneralInfos(false)
        } 
    }

    const fetchCustomerOrdersList = async()=>{
        try{ 
            setIsFetchingCustomerOrders(true)
            const res = await fetch(`http://localhost:4000/api/order/all?page=${page}&pageSize=${pageSize}&user=${customerId}&orderState=${filterState}&product=${filterProduct}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
                const {orders, totalPages, totalOrders} = response;
                setCustomerOrdersData(orders);
                setTotalPages(totalPages)
                setOrdersCount(totalOrders)
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsFetchingCustomerOrders(false)
        }catch(err){
            console.log(err);
            setIsFetchingCustomerOrders(false)
        } 
    }

    const fetchCustomerOrders = async()=>{
        try{ 
            setIsFetchingCustomerOrdersOverview(true)
            const res = await fetch(`http://localhost:4000/api/order/all?page=${1}&pageSize=${`unlimited`}&user=${customerId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
                const {orders} = response;
                setCustomerOrdersOverview(orders);
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsFetchingCustomerOrdersOverview(false)
        }catch(err){
            console.log(err);
            setIsFetchingCustomerOrdersOverview(false)
        } 
    }

    useEffect(()=>{
        fetchCustomer()
    },[])

    useEffect(()=>{
        fetchCustomerOrders()
    },[])

    useEffect(()=>{
        fetchCustomerOrdersList()
    },[filterProduct, filterState, page])  

    useEffect(()=>{
        var total = 0 
        customerOrdersOverview.forEach((order)=>{
            total += order.total;
        })
        setCustomerSpending(total)
    },[customerOrdersOverview])

    return (
        <main className="page customer-details-page">
            <section className='white-bg-section flex-c-jb header-200' >
                <div>
                    <h1 className="l-h">Customer Details {customerData ? `(${customerData.userName})`: null}</h1>
                </div>
                <div className='f-r-c-c header-200__right'>
                <button type="button" className='header-200__button'>
                    <FiEdit style={{fontSize:'20px'}} />
                    <span>Edit</span>
                </button>
                </div>
            </section>
            <section className='overview-cards-wrapper'>
                <OverviewCard icon={<MdOutlineShoppingCart /> } label='Orders' period={``} thisData={customerOrdersOverview.length} isLoading={isFetchingCustomerOrdersOverview} />
                <OverviewCard icon={<MdOutlineLocalShipping /> } label='Delivered Orders' period={``} thisData={customerOrdersOverview.filter((order) => order.orderState === 'delivered').length} isLoading={isFetchingCustomerOrdersOverview} />
                <OverviewCard icon={<MdOutlineRemoveShoppingCart /> } label='Returned Orders' period={``} thisData={customerOrdersOverview.filter((order) => order.orderState === 'backorder').length} isLoading={isFetchingCustomerOrdersOverview} />
                <OverviewCard icon={<MdOutlineAttachMoney /> } label='Spending' period={``} thisData={customerSpending} isLoading={isFetchingCustomerOrdersOverview} unit={`$`} />
            </section>
            <section className='white-bg-section'>
                <div className="section-header">
                    <h3>Personal info </h3>
                </div>
                <table className="table-list-body">
                    <thead>
                        <tr>
                        <th><p>Full Name</p></th>
                        <th><p>Username</p></th>
                        <th> <p>Email</p> </th>  
                        <th> <p>Numer</p> </th>
                        <th> <p>Joined At</p> </th>
                        </tr>
                    </thead>
                    <tbody>
                        { isFetchingGeneralInfos ?
                        <TableSkeleton lines={1} rows={5} />
                        :
                        customerData ? <tr>
                            <td><p>{`${customerData.lastName} ${customerData.firstName}`}</p></td>
                            <td><p>{customerData.userName}</p></td>
                            <td> <p>{customerData.email}</p> </td>  
                            <td> <p>{customerData.mobile}</p> </td>  
                            <td><p>{formatDate(customerData.createdAt)}</p> </td>
                        </tr> : null
                        }
                    </tbody>
                </table>
            </section>
            <section className='white-bg-section'>
                <div className="table-list-header">
                    <PageHeading title={`Customer's Orders ${ordersCount? `(${ordersCount})` : ''}`} />
                    <div className="tlh--right">
                        <SelectProduct setFilterProduct={setFilterProduct} />
                        <SelectState setFilterState={setFilterState} />
                    </div>
                </div>
                <table className="table-list-body">
                    <thead>
                        <tr>
                        <th><p>Ordred At</p></th>
                        <th><p>Delivred/Returned At</p></th>
                        <th><p>Total</p></th>
                        <th> <p>State</p> </th>  
                        <th> <p>Actions</p> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isFetchingCustomerOrders ?
                            <TableSkeleton lines={3} rows={5} />
                            :
                            (customerOrdersData && customerOrdersData.length > 0) ?
                                customerOrdersData.map((order, index)=>{
                                return(
                                    <tr key={index}>
                                        <td> <p>{formatDate(order.createdAt)}</p> </td>
                                        <td> <p>
                                            {order.orderState==='backorder' ? `${ formatDate(order.backorderAt) }`: ``} 
                                            {order.orderState==='delivered' ? `${formatDate(order.deliveredAt)}`: ``}
                                            {order.orderState==='processing' ? `Not Yet`: ``}
                                            {order.orderState==='pending' ? `Not Yet`: ``}    
                                        </p> </td>
                                        <td> <p>{order.total} Dhs</p> </td>
                                        <td> <p className={`order-state-view ${order.orderState}`}>{order.orderState}</p> </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button className='action btn-round edit' type="button" onClick={()=>navigate(`/orders/${order._id}/details`)} ><FiEye/></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            :null   
                        }
                    </tbody>
                    {!isFetchingCustomerOrders ? <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <div className="list-footer">
                            {(customerOrdersData.length <= 0 )?
                                <EmptyFetchRes text='No order found' />
                            : (totalPages > 1) ? <Pagination totalPages={totalPages} setPage={setPage} page={page} /> : null }
                            </div>
                            
                        </td>
                    </tr>
                    </tfoot>
                    :null}
                </table>
            </section>
        </main>
    )
}

export default CustomerDetails