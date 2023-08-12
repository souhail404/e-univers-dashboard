import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import SortButton from '../ListingTable/SortButton';
import formatDate from '../../services/formatDate';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiEye } from 'react-icons/fi';
import TableSkeleton from '../ListingTable/TableSkeleton';
import EmptyFetchRes from '../ListingTable/EmptyFetchRes';
import { Pagination } from '@mui/material';

const RecentOrdersList = () => {
    const {user}= useAuth();
    const navigate = useNavigate();


    const [isFetching, setIsFetching]= useState(false)
    const [page, setPage] =useState(1);
    const [pageSize, setPageSize] =useState(8);
    const [sortConf, setSortConf]= useState({sortField:'createdAt', sortOrder:'desc'});
    const [ordersData, setOrdersData]= useState([])
    const [totalPages, setTotalPages] = useState();
    const [ordersCount, setOrdersCount] = useState();

    const fetchOrders = async()=>{
        try{ 
            setIsFetching(true)
            const res = await fetch(`http://localhost:4000/api/order/all?page=${page}&pageSize=${pageSize}&sort=${sortConf.sortField}:${sortConf.sortOrder}&recentlyAdded=true`, {
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
    },[sortConf, page]) 

    return (
        <table className='table-list-body'>
            <thead>
                <tr>
                    <th><SortButton title='total' value='total'  setSortConf={setSortConf} sortConf={sortConf}  /></th>
                    <th> <p>State</p> </th>
                    <th><SortButton title='date' value='createdAt'  setSortConf={setSortConf} sortConf={sortConf} /></th>
                    <th> <p>Actions</p> </th>
                </tr>
            </thead>
            <tbody>
            {
                isFetching ?
                <TableSkeleton lines={5} rows={4} />
                :
                (ordersData && ordersData.length > 0) ?
                    ordersData.map((order, index)=>{
                    return(
                        <tr key={index}>
                            <td>{order.total} Dhs</td>
                            <td>{order.orderState}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>
                                <div className="actions-cell">
                                    <button className='action btn-round' type="button" onClick={()=>navigate(`./${order._id}/edit`)} ><FiEye/></button>
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
                    <td colSpan={4}>
                        <div className="list-footer">
                        {(ordersData.length <= 0 )?
                            <EmptyFetchRes text='You have no new oders' />
                        : (totalPages > 1) ? <Pagination totalPages={totalPages} setPage={setPage} page={page} /> : null }
                        </div>
                        
                    </td>
                </tr>
            </tfoot>
            :null}
        </table>
    )
}

export default RecentOrdersList