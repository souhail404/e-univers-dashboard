import React, { useEffect, useState } from 'react'
import Nb from '../../components/common/Nb'
import { useAuth } from '../../hooks/useAuth';

import {CiSaveDown2} from 'react-icons/ci'
import {AiOutlineDown, AiOutlineAppstoreAdd} from 'react-icons/ai'
import {FiTrash2} from 'react-icons/fi'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';



const EditCategory = () => {
  const {categoryId} =useParams();
  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const [category, setCategory] =useState()
  const [subCategories, setSubCategories]= useState([])
  
  useEffect(()=>{
    const fetchCategory= async()=>{
        const id = toast.loading('fetching category...')
        try{
            const res = await fetch(`http://localhost:4000/api/category/${categoryId}`)
            const response = await res.json();
            
            if(res.ok){
                const {category, subCategories} = response;
                setCategory({...category});
                setSubCategories([...subCategories]);
                toast.update(id, {render: "Category fetched", type: "success", isLoading: false, autoClose:2000});
            //   const newCategoryId = response.category._id;
            //   navigate(`../${newCategoryId}/edit`)
            }
            else{
              toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:2000});
            }
        }catch(err){
            console.log(err);
        } 
    }
    fetchCategory();
    
  },[])

  useEffect(()=>{
    console.log(category, subCategories);
  },[category])

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const data = JSON.stringify({...category, sub_categories:subCategories});
    try{
      const res = await fetch('http://localhost:4000/api/category/add', {
        method:"POST",
        headers:myheaders,
        body:data
      })

      const response = await res.json();
      console.log(response);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='page create-category-page'>
      <div className="page-wrapper">
        <div className="page-header">
           <h2>edit category</h2>
        </div>
        <div className="page-body">
           {category ? 
           <form className='form create-product-form' action="">
                <div className="form-haeder">
                    
                </div>
                <div className="form-body">
                    <div className="form-group">
                      <AddCategory category={category} setCategory={setCategory} />
                    </div>

                    <div className="form-group">
                      <AddSubCategories subCategories={subCategories} setSubCategories={setSubCategories} />
                    </div>
                </div>
                <div className="form-actions">
                    <div className="action-elem">
                        <button className="btn" onClick={(e)=>handleSubmit(e)}>
                            <div className="icon">
                                <CiSaveDown2 />
                            </div>
                            <p>Save</p>
                        </button>   
                    </div>
                </div>
           </form>
           : null}
        </div>
      </div>
    </div>
  )
}

const AddCategory= ({category , setCategory})=>{
  return(
    <>
      <div className="form-line">
          <div className="input-wrapper">
              <label htmlFor="" className='label'>Title :</label>
              <input  type="text" 
                      className='input' 
                      placeholder='Ex: smartphones, laptops..'
                      value={category.title}
                      onChange={(e)=>{
                        setCategory({...category, title:e.target.value})
                      }}/>
              <Nb message='its better to make a little general'/>
          </div>
      </div>
      <div className="form-line">
          <div className="input-wrapper">
              <label htmlFor="" className='label'>description :</label>
              <textarea name="" id="" 
                        className='input' 
                        placeholder='Ex: something..' 
                        required
                        value={category.description}
                        onChange={(e)=>{
                            setCategory({...category, description:e.target.value})
                        }}
              ></textarea>
          </div>
      </div>
    </>
  )
}

const AddSubCategories= ({subCategories, setSubCategories})=>{
  const [showBody, setShowBody]=useState(true)
  
  const handleChange = (e,index)=>{
    const updatedSubCats = [...subCategories];
    updatedSubCats[index].title = e.target.value;
    setSubCategories(updatedSubCats);
  }
  const addNewSubCategory = ()=>{
    setSubCategories([...subCategories, { title:'' }])
  }
  const deleteSubCategory = (index)=>{
    const updateSubCats = [...subCategories];
    updateSubCats.splice(index, 1);
    setSubCategories(updateSubCats);
  }

  return(
    <>
      <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Sub Categories</p>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="add-subcat-wrapper">
                      {
                        subCategories.map((subcat, index)=>{
                          return(
                          <div key={index} className="elem subcat-wrapper">
                            <div className="elem-head">
                              <p>{index + 1}</p>
                            </div>
                            <div className="input-wrapper">
                              <label htmlFor={`subCatTitle-${index}`} className="label">title :</label>
                              <input type="text" id={`subCatTitle-${index}`} name={`subCatTitle-${index}`} className="input" placeholder='Ex: ...' value={subCategories[index].title} onChange={(e)=>{handleChange(e,index)}}/>
                            </div>
                            <div className="delete-elem f-r-c-c">
                              <button type="button" className='f-r-c-c' onClick={()=>deleteSubCategory(index)}>
                                <span className="icon f-r-c-c"><FiTrash2/></span>
                              </button>
                            </div>
                          </div>
                          )
                        })
                      }
                      <div className="elem action">
                        <button type="button" className='f-c-c-c' onClick={()=>addNewSubCategory()}>
                          <span className="icon f-c-c-c"><AiOutlineAppstoreAdd/></span>
                          <p>Add sub category</p>
                        </button>
                      </div>
                    </div>  
                </div>
      </div>
    </>
  )
}
export default EditCategory