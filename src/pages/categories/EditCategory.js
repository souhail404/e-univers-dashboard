import React, { useEffect, useState } from 'react'
import Nb from '../../components/common/Nb'
import { useAuth } from '../../hooks/useAuth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {CiSaveDown2} from 'react-icons/ci'
import {AiOutlineDown, AiOutlineAppstoreAdd} from 'react-icons/ai'
import {FiEdit3, FiSave, FiTrash2} from 'react-icons/fi'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';



const EditCategory = () => {
  const {categoryId} =useParams();
  const {user} = useAuth();
  const {token} = user;
  const navigate = useNavigate();


  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const [category, setCategory] =useState()
  const [subCategories, setSubCategories]= useState([])
  const [isAddingSub, setIsAddingSub]= useState(false);
  const [isCategoryFetching, setIsCategoryFetching]= useState(false);

  useEffect(()=>{
    const fetchCategory= async()=>{
        try{
            setIsCategoryFetching(true)
            const res = await fetch(`http://localhost:4000/api/category/${categoryId}`)
            const response = await res.json();
            
            if(res.ok){
              const {category} = response;
              setCategory({...category});
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsCategoryFetching(false)
        }catch(err){
            console.log(err);
        } 
    }
    fetchCategory();

  },[])

  const handleSubmit =async(e)=>{
    const toastId = toast.loading('Updating category');
    e.preventDefault();
    const data = JSON.stringify({title:category.title, description:category.description});
    try{
      const res = await fetch(`http://localhost:4000/api/category/${categoryId}`, {
        method:"PUT",
        headers:myheaders,
        body:data
      })
      
      const response = await res.json();
      
      if(res.ok){
        toast.update(toastId, {render:'Category updated', type:'success', isLoading:false, autoClose:6000});
        navigate('/categories/')
      }
      else{
        toast.update(toastId, {render:`${response.message}`, type:'error', isLoading:false, autoClose:6000});
      }

      
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='page edit-category-page'>
      <div className="page-wrapper">
        <div className="page-header">
           <h3>Category {category? `(${category.title})`: ''} :</h3>
        </div>
        <div className="page-body">
           {isCategoryFetching ? 
            <>
              <Skeleton height={250} />
              <Skeleton height={150}/>
            </>

            :
            category ? 
              <form className='form create-product-form' action="">
                  <div className="form-haeder">
                      
                  </div>
                  <div className="form-body">
                      <div className="form-group">
                        <EditCategoryInfos category={category} setCategory={setCategory} />
                      </div>

                      <div className="form-group">
                        <EditSubCategories categoryId={categoryId}
                                          subCategories={subCategories} 
                                          setSubCategories={setSubCategories} 
                                          isAddingSub={isAddingSub} 
                                          setIsAddingSub={setIsAddingSub}
                        />
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

const EditCategoryInfos = ({category , setCategory})=>{
  
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

const EditSubCategories= ({categoryId, subCategories, isAddingSub, setIsAddingSub, setSubCategories})=>{
  const [showBody, setShowBody]=useState(true)
  const [isAdded, setIsAdded]= useState(1)
  const [isSubCatFetching, setIsSubCatFetching]= useState(false)
  
  useEffect(()=>{
      const fetchSubCategory= async()=>{
        try{
            setIsSubCatFetching(true)
            const res = await fetch(`http://localhost:4000/api/category/${categoryId}`)
            const response = await res.json();
            
            if(res.ok){
              const {subCategories} = response;
              setSubCategories([...subCategories]);
            }
            setIsSubCatFetching(false)
        }catch(err){
            console.log(err);
        } 
      }
      fetchSubCategory();

    console.log('re render sub cat fetch');
  },[isAdded])

  return(
    <>
      <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Sub Categories {`(${subCategories.length})`}</p>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="add-subcat-wrapper">
                      {
                        subCategories.map((subcat, index)=>{
                          return(
                          <div key={index} className="subcategory-row">
                            <SubCategoryBox subElem={subcat} subIndex={index} categoryId={categoryId} subCategories={subCategories} setSubCategories={setSubCategories} />
                          </div>
                          )
                        })
                      }
                      {isSubCatFetching?
                        <Skeleton animation='wave' width={100} height={60}/>
                        :null
                      }
                      {isAddingSub ? 
                          <div className="subcategory-row">
                            <NewSubCategoryBox  categoryId={categoryId} 
                                                setIsAddingSub={setIsAddingSub}
                                                setIsAdded={setIsAdded}
                            />
                          </div>
                      : null}
                      <div className="subcategory-row action">
                        <button type="button" className='f-r-c-c' onClick={()=>setIsAddingSub(true)}>
                          <span className="icon f-c-c-c"><AiOutlineAppstoreAdd/></span>
                          <p>Add</p>
                        </button>
                      </div> 
                    </div>  
                </div>
      </div>
    </>
  )
}



const SubCategoryBox = ({subElem , subIndex, categoryId , subCategories, setSubCategories})=>{
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const deleteSubCategory = async() =>{
    const subId = subElem._id;
    const id = toast.loading(`Deleting Subcategory : (${subElem.title})`);
    try {
      const res = await fetch(`http://localhost:4000/api/category/${categoryId}/subcategory/${subId}`, {
        method:"DELETE",
        headers:myheaders,
      })
      const response = await res.json();
      if(res.ok){
        const updatedSubCats = [...subCategories];
        updatedSubCats.splice(subIndex, 1)
        setSubCategories(updatedSubCats)
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
  const EditSubCategory = async() =>{
    const id = toast.loading(`Editing Subcategory : (${subElem.title})`);
    const data = JSON.stringify({...subElem})
    const subId = subElem._id;
    console.log(data);
    try {
      const res = await fetch(`http://localhost:4000/api/category/${categoryId}/subcategory/${subId}`, {
        method:"PUT",
        headers:myheaders,
        body:data
      })
      const response = await res.json();
      if(res.ok){
        toast.update(id, {render: "Subcategory Edited Succefully", type: "success", isLoading: false, autoClose:5000});
      }
      else{
        toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditClick = ()=>{
    setIsEditing(true)
  }

  const handleSaveClick = async()=>{
    await EditSubCategory(subIndex, subElem);
    setIsEditing(false)
  }

  const handleEditingChange = (e)=>{
    const updateSubCats = [...subCategories];
    updateSubCats[subIndex].title = e.target.value;
    setSubCategories(updateSubCats)
  }
  const handleDeleteClick = (e)=>{
    confirmAlert(
      {
        title: 'Delete',
        message: `Are you sure you wanna delete subcategory (${subElem.title})`,
        buttons: [
          {
            label: 'Delete',
            onClick: () => {deleteSubCategory(subElem)}
          },
          {
            label: 'Cancel',
            onClick: () => {return}
          }
        ]
      }
    )
  }

  return(
    <div className="subcategory-box">
      { isEditing ?
        <div className="box-elem edit">
          <input type="text" value={subElem.title} onChange={(e)=> handleEditingChange(e,subIndex)} autoFocus />
        </div>
      :
        <div className="box-elem title">
            <p onClick={()=>handleEditClick()}>{subElem.title}</p>
        </div>
      }
      
      <div className="actions">
        <button className='action-elem btn-round delete' type="button" onClick={(e)=>handleDeleteClick(e)}><FiTrash2/></button>
        {isEditing ? null : <button className='action-elem btn-round edit' type="button" onClick={()=>handleEditClick()}><FiEdit3/></button>}
        {isEditing ? <button className='action-elem btn-round save' type="button" onClick={()=>handleSaveClick()}><FiSave/></button> : null}
      </div>
    </div>
  )
}

const NewSubCategoryBox = ({categoryId, setIsAdded, setIsAddingSub})=>{
  const [isEditing, setIsEditing] = useState(true);
  const [newSubCat, setNewSubCat]= useState({title:''})

  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const createSubCategory = async() =>{
    const id = toast.loading(`Creating new Subcategory : (${newSubCat.title})`);
    const data = JSON.stringify(newSubCat)
    try {
      const res = await fetch(`http://localhost:4000/api/category/${categoryId}/addonesubcategory`, {
        method:"POST",
        headers:myheaders,
        body:data
      })
      const response = await res.json();
      if(res.ok){
        setIsAdded(Math.floor(Math.random() * 150))
        setIsAddingSub(false)
        setIsEditing(false)
        toast.update(id, {render: "Subcategory Created Succefully", type: "success", isLoading: false, autoClose:5000});
      }
      else{
        toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteClick = (e)=>{
    setIsAddingSub(false)
  }
  const handleSaveClick = async()=>{
    await createSubCategory();
  }
  const handleEditingChange = (e)=>{
    setNewSubCat({newSubCat, title:e.target.value})
  }
  return(
    <div className="subcategory-box">
      { isEditing ?
        <div className="box-elem edit">
          <input type="text" autoFocus placeholder='Title..' required onChange={(e)=> handleEditingChange(e)} value={newSubCat.title} />
        </div>
      :
        null
      }
      
      <div className="actions">
        <button className='action-elem btn-round delete' type="button" onClick={(e)=>handleDeleteClick(e)}><FiTrash2/></button>
        {isEditing ? null : <button className='action-elem btn-round edit' type="button"><FiEdit3/></button>}
        {isEditing ? <button className='action-elem btn-round save' type="button" onClick={(e)=>handleSaveClick()}><FiSave/></button> : null}
      </div>
    </div>
  )
}

export default EditCategory