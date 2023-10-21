import React, { useEffect, useState } from 'react'
import PageHeading from '../common/PageHeading'
import EmptyFetchRes from '../ListingTable/EmptyFetchRes'
import TableSkeleton from '../ListingTable/TableSkeleton'
import formatDate from '../../services/formatDate'
import { FiEdit3, FiEye, FiTrash, FiTrash2 } from 'react-icons/fi'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import SortButton from '../ListingTable/SortButton'
import Pagination from '../ListingTable/Pagination'
import { toast } from 'react-toastify'
import { MdAdd } from 'react-icons/md'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert'
import BASE_URL from '../../APIurl'

const AdminsTable = () => {
    const [adminsData, setAdminsData] = useState([]); // data
    const [sortConf, setSortConf] = useState({sortField:'createdAt', sortOrder:'desc'});
    const [search, setSearch] =useState('');
    const [page, setPage] =useState(1);
    const [pageSize, setPageSize] =useState(6);
    const [totalPages, setTotalPages] = useState();
    const [adminsCount, setAdminsCount] = useState();
    const [isFetching, setIsFetching] = useState(false)
    
    const [serachValue]=useDebounce(search, 500) 
    const navigate = useNavigate();
    const {user} = useAuth()

    const deleteAdmin = async(admin, index)=>{
        const myheaders = new Headers();

        myheaders.append('Content-Type', 'application/json');
        myheaders.append('Authorization', `Bearer ${user.token}`);
    
        const adminId = admin._id;
    
        const toastId = toast.loading(`Deleting Admin : (${admin.lastName} ${admin.firstName})`);
        try {
            const res = await fetch(`${BASE_URL}api/user/${adminId}`, {
                method:"DELETE",
                headers:myheaders,
            })
            const response = await res.json();
            if(res.ok){
                const updatedState = [...adminsData];
                updatedState.splice(index, 1)
                setAdminsData(updatedState);
                toast.update(toastId, {render: "Admin deleted Succefully", type: "success", isLoading: false, autoClose:5000});
            }
            else{
                toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});        
            }
            return res
        } catch (error) {
          console.log(error);
        }
    }

    const handleDeleteClick = async(admin, index)=>{
        confirmAlert(
          {
            title: 'Delete Admin',
            message: `Are you sure you wanna delete this Admin (${admin.lastName} ${admin.firstName})`,
            buttons: [
              {
                label: 'Delete',
                onClick: async() => 
                {
                await deleteAdmin(admin , index)
                }
              },
              {
                label: 'Cancel',
                onClick: () => {return}
              }
            ]
          }
        )
    };

    const fetchAdmins = async()=>{
        try{
            setIsFetching(true)
            const res = await fetch(`${BASE_URL}api/user/admins?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortConf.sortField}:${sortConf.sortOrder}`,{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
              const {admins, totalPages, totalAdmins} = response;
              setAdminsData(admins);
              setTotalPages(totalPages);
              setAdminsCount(totalAdmins);
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsFetching(false)
        }catch(err){
            console.log(err);
        } 
      }
    
    useEffect(()=>{
        fetchAdmins()
    },[serachValue, sortConf, page])

    return (
        <div className="selected-tab-body">
            <div className="table-list-header">
                <h6>Current Admins</h6>
                <div className="tlh--right">
                    <form className="tlh-right--elem search-filter">
                        <input className='search-field' type="text" placeholder='Search For Admin' onChange={(e)=>setSearch(e.target.value)}/>
                        <button type="button" className='search-btn btn'>
                            <AiOutlineSearch />
                        </button>
                    </form>
                    <button type='button' className="type-200__button" onClick={()=>navigate('/admins/create')}>
                        <AiOutlinePlus style={{fontSize:'20px'}} />
                        <p>Add Admin</p>  
                    </button>
                </div>
            </div>
            <table className="table-list-body">
                <thead>
                    <tr>
                        <th> <p>username</p> </th>
                        <th> <p>Full name</p></th>
                        <th> <p>Actions</p> </th>
                    </tr>
                </thead>
                <tbody>
                {
                    isFetching ?
                    <TableSkeleton lines={3} rows={3} />
                    :
                    (adminsData && adminsData.length > 0) ?
                        adminsData.map((admin, index)=>{
                        return(
                            <tr key={index}>
                                <td>{admin.userName} </td>
                                <td>{`${admin.lastName} ${admin.firstName}`} </td>
                                <td>
                                    <div className="actions-cell">
                                    <button className='action btn-round edit' type="button" onClick={()=>navigate(`/admins/${admin._id}/details`)} ><FiEye/></button>
                                    <button className='action btn-round edit' type="button" onClick={()=>navigate(`/admins/${admin._id}/edit`)} ><FiEdit3/></button>
                                    <button className='action btn-round edit' type="button" onClick={()=>handleDeleteClick(admin, index)} ><FiTrash/></button>
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
                    <td colSpan={3}>
                        <div className="list-footer">
                        {(adminsData.length <= 0 )?
                            <EmptyFetchRes text='No Admin Found' />
                        : (totalPages > 1) ? <Pagination totalPages={totalPages} setPage={setPage} page={page} /> : null }
                        </div>
                        
                    </td>
                    </tr>
                </tfoot> : null}
        </table>
        </div>
    )
}

export default AdminsTable