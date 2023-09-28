import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/common/PageHeading'
import SelectProduct from '../../components/Orders/SelectProduct'
import SelectUser from '../../components/Orders/SelectUser'
import SelectState from '../../components/Orders/SelectState'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import SortButton from '../../components/ListingTable/SortButton'
import TableSkeleton from '../../components/ListingTable/TableSkeleton'
import { FiEye } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import EmptyFetchRes from '../../components/ListingTable/EmptyFetchRes'
import Pagination from '../../components/ListingTable/Pagination'
import formatDate from '../../services/formatDate' 

const Orders = () => {
    const {user}= useAuth()
    const navigate = useNavigate();

    const [filterUser, setFilterUser]= useState('');
    const [filterProduct, setFilterProduct]= useState('');
    const [filterState, setFilterState]= useState('');
    const [sortConf, setSortConf]= useState({sortField:'createdAt', sortOrder:'desc'});
    const [page, setPage] =useState(1);
    const [pageSize, setPageSize] =useState(12);
    const [totalPages, setTotalPages] = useState();
    const [ordersCount, setOrdersCount] = useState();
    const [isFetching, setIsFetching]= useState(false)
    const [ordersData, setOrdersData]= useState([])

    const fetchOrders = async()=>{
        try{ 
            setIsFetching(true)
            const res = await fetch(`http://localhost:4000/api/order/all?page=${page}&pageSize=${pageSize}&orderState=${filterState}&user=${filterUser}&product=${filterProduct}&sort=${sortConf.sortField}:${sortConf.sortOrder}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
  
            if(res.ok){
                const {orders, totalPages, totalOrders} = response;
                setOrdersData(orders);
                setTotalPages(totalPages)
                setOrdersCount(totalOrders)
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsFetching(false)
        }catch(err){
            console.log(err);
            setIsFetching(false)
        } 
    }

    useEffect(()=>{
        fetchOrders()
    },[filterProduct, filterState, filterUser, sortConf, page]) 

    return (
        <main className='page orders-page'>
            <section className="table-list-wrapper">
                <div className="table-list-header">
                    <PageHeading title={`Orders ${ordersCount? `(${ordersCount})` : ''}`} />
                    <div className="tlh--right">
                        <SelectProduct setFilterProduct={setFilterProduct} />
                        <SelectUser setFilterUser={setFilterUser} placeholder='Filter Customers' />
                        <SelectState setFilterState={setFilterState} />
                    </div>
                </div>
                <table className="table-list-body">
                    <thead>
                    <tr>
                        <th> <p>customer</p> </th>
                        <th> <SortButton title='total' value='total'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                        <th> <p>state</p> </th>
                        <th> <SortButton title='date' value='createdAt'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                        <th> <p>actions</p> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isFetching ?
                        <TableSkeleton lines={5} rows={5} />
                        :
                        (ordersData && ordersData.length > 0) ?
                            ordersData.map((order, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{`${order.userId.lastName} ${order.userId.firstName}`} </td>
                                    <td>{order.total} Dhs</td>
                                    <td> <p className={`order-state-view ${order.orderState}`}>{order.orderState}</p> </td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>
                                        <div className="actions-cell">
                                            <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${order._id}/details`)} ><FiEye/></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        :null   
                    }
                    </tbody>
                    {!isFetching ? <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <div className="list-footer">
                            {(ordersData.length <= 0 )?
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

export default Orders