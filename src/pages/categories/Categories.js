// hooks
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from 'use-debounce';
// services
import deleteCategory from '../../services/deleteCategory'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
// components
import Pagination from '../../components/ListingTable/Pagination';
import SortButton from '../../components/ListingTable/SortButton';
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import EmptyFetchRes from '../../components/ListingTable/EmptyFetchRes';
// icons
import {FiEdit3, FiTrash2} from 'react-icons/fi'
// css
import 'react-confirm-alert/src/react-confirm-alert.css'; 


const Categories = () => {
  // states----
  const [categoriesData, setCategoriesData] = useState([]); // data
  const [sortConf, setSortConf] = useState({sortField:'createdAt', sortOrder:'desc'});
  const [search, setSearch] =useState('');
  const [page, setPage] =useState(1);
  const [pageSize, setPageSize] =useState(5);
  const [totalPages, setTotalPages] = useState();
  const [categoriesCount, setCategoriesCount] = useState();
  const [isFetching, setIsFetching] = useState(false)
  
  // hooks----
  const navigate = useNavigate();
  const {user} = useAuth();
  const [serachValue]=useDebounce(search, 500)

  // functions----
  const handleDeleteClick = async(category, index)=>{
    confirmAlert(
      {
        title: 'Delete category',
        message: `Are you sure you wanna delete this category (${category.title})`,
        buttons: [
          {
            label: 'Delete',
            onClick: async() => 
            {
              const res = await deleteCategory(category, user)
              if(res.ok){
                const updatedState = [...categoriesData];
                updatedState.splice(index, 1)
                setCategoriesData(updatedState);
              }
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const fetchCategory= async()=>{
    try{
        setIsFetching(true)
        const res = await fetch(`http://localhost:4000/api/category?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortConf.sortField}:${sortConf.sortOrder}`)
        const response = await res.json();

        if(res.ok){
          const {categories, totalPages, categoriesCount} = response;
          setCategoriesData(categories);
          setTotalPages(totalPages);
          setCategoriesCount(categoriesCount);
        }
        else{
          toast.error(`${response.message}`)
        }
        setIsFetching(false)
    }catch(err){
        console.log(err);
    } 
  }

  // useEffects
  useEffect(()=>{
    
    fetchCategory();

  },[serachValue, sortConf, page])

  // render
  return (
    <div className='page category-page'>
      <div className="list-wrapper">
          <div className="list-header">
            <div className="heading">
              <h3>Categories {categoriesCount ?`(${categoriesCount})` :null}</h3>
            </div>
            <form className="list-form">
              <div className="form-elem search">
                <input className='search' type="text" placeholder='search for category' onChange={(e)=>setSearch(e.target.value)} />
                <button type="button" className='search-btn btn'>
                  <p>search</p>
                </button>
              </div>
              <div className="form-elem">
                <button type="button" className='btn' onClick={()=>navigate('./create')}>
                    <p>new category</p>
                </button>
              </div>
            </form>
          </div>
          <table className="list-table">
            <thead>
              <tr>
                <th> 
                  <SortButton title='name' value='title' setSortConf={setSortConf} sortConf={sortConf} />
                </th>
                <th> <p>Descriptions</p> </th>  
                <th>
                  <SortButton title='date' value='createdAt' setSortConf={setSortConf} sortConf={sortConf} />
                </th>  
                <th> <p>Actions</p> </th>
              </tr>
            </thead>
            <tbody>
              { isFetching ?
                <TableSkeleton lines={5} rows={4} />
                :
                (categoriesData && categoriesData.length > 0) ?
                  categoriesData.map((category,index)=>{
                    return(
                      <tr key={index}>
                        <td>{category.title} </td>
                        <td>{category.description}</td>
                        <td>{formatDate(category.createdAt)}</td>
                        <td>
                          <div className="actions-cell">
                            <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${category._id}/edit`)}><FiEdit3/></button>
                            <button className='action btn-round delete' type="button" onClick={()=>handleDeleteClick(category,index)}><FiTrash2/></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                : null
              }
            </tbody>
            {!isFetching ? <tfoot>
            <tr>
              <td colSpan={4}>
                <div className="list-footer">
                  {(categoriesData.length <= 0 )?
                    <EmptyFetchRes text='no category found' />
                  : (totalPages > 1) ? <Pagination totalPages={totalPages} setPage={setPage} page={page} /> : null }
                </div>
                
              </td>
            </tr>
            </tfoot>
            :null}
            
          </table>
      </div>
        
    </div>
  )
}

export default Categories