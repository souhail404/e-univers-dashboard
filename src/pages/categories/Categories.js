import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from 'use-debounce';
import {FiEdit3, FiTrash2} from 'react-icons/fi'

const Categories = () => {
  const navigate = useNavigate()
  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const [categoriesData, setCategoriesData] = useState([])
  const [search, setSearch] =useState('');
  const [serachValue]=useDebounce(search, 500)
  const [page, setPage] =useState('');
  const [pageSize, setPageSize] =useState(10);

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
  const fetchCategory= async()=>{
    try{
        const res = await fetch(`http://localhost:4000/api/category?page=${page}&pageSize=${pageSize}&search=${search}`)
        const response = await res.json();
        console.log(response);
        if(res.ok){
          const {categories} = response;
          setCategoriesData(categories);
        }
        else{
          toast.error(`${response.message}`)
        }
    }catch(err){
        console.log(err);
    } 
  }
  useEffect(()=>{
    
    fetchCategory();

  },[serachValue])
  return (
    <div className='page category-page'>
      <div className="list-wrapper">
          <div className="list-header">
            <div className="heading">
              <h3>Categories {`(${categoriesData.length})`}</h3>
            </div>
            <form className="list-form">
              <div className="form-elem search">
                <input className='search' type="text" placeholder='search for category' onChange={(e)=>setSearch(e.target.value)} />
                <button type="button" className='search-btn btn'>
                  search
                </button>
              </div>
              <div className="form-elem sort">
                <select name="" id="">
                  <option value="">--</option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </form>
          </div>
          <table className="list-table">
            <thead>
              <tr>
                <th> <p>names</p> </th>
                <th> <p>Descriptions</p> </th>  
                <th> <p>Actions</p> </th>
              </tr>
            </thead>
            <tbody>
              {
                categoriesData ?
                  categoriesData.map((category,index)=>{
                    return(
                      <tr key={index}>
                        <td>{category.title}</td>
                        <td>{category.description}</td>
                        <td>
                          <div className="actions-cell">
                            <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${category._id}/edit`)}><FiEdit3/></button>
                            <button className='action btn-round delete' type="button" onClick={()=>handleDeleteClick(category, index)}><FiTrash2/></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                :null
              }
            </tbody>
            
          </table>
      </div>
        
    </div>
  )
}

export default Categories