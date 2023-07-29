import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from 'use-debounce';
import {FiEdit3, FiTrash2} from 'react-icons/fi'
import {TbError404} from 'react-icons/tb'
import Pagination from '../../components/common/Pagination';
import { Skeleton } from "@mui/material"; 


const Categories = () => {
  const navigate = useNavigate()
  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const [categoriesData, setCategoriesData] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [categoriesCount, setCategoriesCount] = useState()
  const [isFetching, setIsFetching] = useState(false)
  
  const [search, setSearch] =useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [serachValue]=useDebounce(search, 500)
  const [page, setPage] =useState(1);
  const [pageSize, setPageSize] =useState(5);

  const deleteCategory = async(elem,i) =>{
    const catId = elem._id;
    const id = toast.loading(`Deleting Category : (${elem.title})`);
    try {
      const res = await fetch(`http://localhost:4000/api/category/${catId}`, {
        method:"DELETE",
        headers:myheaders,
      })
      const response = await res.json();
      if(res.ok){
        const updatedState = [...categoriesData];
        updatedState.splice(i, 1)
        setCategoriesData(updatedState);
        toast.update(id, {render: "Subcategory deleted Succefully", type: "success", isLoading: false, autoClose:5000});
      }
      else{
        toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteClick = (category, i)=>{
    confirmAlert(
      {
        title: 'Delete Category',
        message: `Are you sure you wanna delete category (${category.title})`,
        buttons: [
          {
            label: 'Delete',
            onClick: () => {deleteCategory(category, i)}
          },
          {
            label: 'Cancel',
            onClick: () => {return}
          }
        ]
      }
    )
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleHeaderClick = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const fetchCategory= async()=>{
    try{
        setIsFetching(true)
        const res = await fetch(`http://localhost:4000/api/category?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortField}:${sortOrder}`)
        const response = await res.json();
        console.log(`http://localhost:4000/api/category?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortField}:${sortOrder}`);
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
  useEffect(()=>{
    
    fetchCategory();

  },[serachValue, sortField, sortOrder, page])
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
                <th className='sort-btn' onClick={() => handleHeaderClick('title')}> <p>names</p> </th>
                <th> <p>Descriptions</p> </th>  
                <th className='sort-btn' onClick={() => handleHeaderClick('createdAt')}> <p>Date</p> </th>  
                <th> <p>Actions</p> </th>
              </tr>
            </thead>
            <tbody>
              { isFetching ?
                <>
                  <tr>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                  </tr>
                  <tr>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                    <td><Skeleton animation='wave' /></td>
                  </tr>
                </>
                :
                (categoriesData && categoriesData.length > 0) ?
                  categoriesData.map((category,index)=>{
                    return(
                      <tr key={index}>
                        <td>{category.title}</td>
                        <td>{category.description}</td>
                        <td>{formatDate(category.createdAt)}</td>
                        <td>
                          <div className="actions-cell">
                            <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${category._id}/edit`)}><FiEdit3/></button>
                            <button className='action btn-round delete' type="button" onClick={()=>handleDeleteClick(category, index)}><FiTrash2/></button>
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
                    <div className='empty-result f-c-c-c'>
                      <div className="icon f-r-c-c"> <TbError404 /> </div>
                      <p>No such category found</p>
                    </div>
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