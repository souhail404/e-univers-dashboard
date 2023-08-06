import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeading from '../components/common/PageHeading';
import SortButton from '../components/ListingTable/SortButton';
import EmptyFetchRes from '../components/ListingTable/EmptyFetchRes';
import { Pagination } from '@mui/material';
import TableSkeleton from '../components/ListingTable/TableSkeleton';
import { FiEdit3 } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';

const Customers = () => {
    const {user}= useAuth()
    const navigate = useNavigate();
    

    const [search, setSearch] =useState('');  
    const [sortConf, setSortConf]= useState({sortField:'createdAt', sortOrder:'desc'});
    const [page, setPage] =useState(1);
    const [pageSize, setPageSize] =useState(12);
    const [totalPages, setTotalPages] = useState();
    const [customersCount, setCustomersCount] = useState();
    const [isFetching, setIsFetching]= useState(false)
    const [customersData, setCustomersData]= useState([])
    const [serachValue]=useDebounce(search, 500)  
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }; 

    const fetchCustomers = async()=>{
      try{
          setIsFetching(true)
          const res = await fetch(`http://localhost:4000/api/user/customers?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortConf.sortField}:${sortConf.sortOrder}`, {
              headers: {
                  Authorization: `Bearer ${user.token}`,
              },
          })
          const response = await res.json();

          if(res.ok){
              const {customers, totalPages, totalCustomers} = response;
              setCustomersData(customers);
              setTotalPages(totalPages)
              setCustomersCount(totalCustomers)
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
      fetchCustomers()
    },[sortConf, page, serachValue])

    return (
      <main className='page customers-page'>
          <section className="table-list-wrapper">
              <div className="table-list-header">
                  <PageHeading title={`Customers ${customersCount? `(${customersCount})` : ''}`} />
                  <div className="tlh--right">
                    <form className="tlh-right--elem search-filter">
                      <input className='search-field' type="text" placeholder='search for product' onChange={(e)=>setSearch(e.target.value)}/>
                      <button type="button" className='search-btn btn'>
                          search
                      </button>
                    </form>
                  </div>
              </div>
              <table className="table-list-body">
                  <thead>
                  <tr>
                    <th> <SortButton title='username' value='userName'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                    <th> <p>Mobile</p> </th>
                    <th> <p>Email</p> </th>
                    <th> <p>orders</p> </th>
                    <th> <SortButton title='date' value='createdAt'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                    <th> <p>actions</p> </th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      isFetching ?
                      <TableSkeleton lines={5} rows={6} />
                      :
                      (customersData && customersData.length > 0) ?
                          customersData.map((customer, index)=>{
                          return(
                              <tr key={index}>
                                  <td>{customer.userName} </td>
                                  <td>{customer.mobile} </td>
                                  <td>{customer.email}</td>
                                  <td>{customer.orders?.length}</td>
                                  <td>{formatDate(customer.createdAt)}</td>
                                  <td>
                                      <div className="actions-cell">
                                          <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${customer._id}/edit`)} ><FiEdit3/></button>
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
                      <td colSpan={6}>
                          <div className="list-footer">
                          {(customersData.length <= 0 )?
                              <EmptyFetchRes text='No customer found' />
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

export default Customers