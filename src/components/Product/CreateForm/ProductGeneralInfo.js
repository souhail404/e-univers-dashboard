import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import Nb from '../../common/Nb';
// css 
import 'react-quill/dist/quill.snow.css';
import fetchService from '../../../services/fetchService';
import { AiOutlineDown } from 'react-icons/ai';

const ProductGeneralInfo =({formBody, setFormBody})=>{
    const modules = {
        history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
        toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image"],
            /* ["undo", "redo"],*/ 
        ],
    };

    const [showBody, setShowBody]=useState(true);
    const [categoriesRes, setCategoriesRes] = useState([])
    const [subCategoriesRes, setSubCategoriesRes] = useState([])

    useEffect(()=>{
        fetchService('http://localhost:4000/api/category/', setCategoriesRes);
    }, [])

    useEffect(()=>{
        if(formBody.category){
            fetchService(`http://localhost:4000/api/category/${formBody.category}/subcategory`, setSubCategoriesRes);  
        }
    },[formBody.category])

    return(
        <>  
            <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown /> </button>
                    </div>
                    <div className="heading">
                        <h6 className='block-header'>General Infos</h6>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Product Name :</label>
                            <input 
                                    type="text" 
                                    className='input' 
                                    placeholder='Ex: iphone 9..' 
                                    required 
                                    value={formBody.title}
                                    onChange={(e)=> setFormBody({...formBody, title:`${e.target.value}`})}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>slug :</label>
                            <input 
                                type="text" 
                                className='input' 
                                placeholder='Ex: iphone-9..' 
                                required
                                value={formBody.slugTitle}
                                onChange={(e)=> setFormBody({...formBody, slugTitle:`${e.target.value}`})}
                                />
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Brief and catchy description :</label>
                            <textarea 
                                    className='input' 
                                    placeholder='Ex: something...' 
                                    value={formBody.minDescription}
                                    onChange={(e)=> setFormBody({...formBody, miniDescription:`${e.target.value}`})}>

                            </textarea>
                            <Nb message='this is just a mini description, so for a good view its must not be more than a 50 character' /> 
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Category :</label>
                            <select name="" id="" className='input' required onChange={(e)=>{setFormBody({...formBody, category:e.target.value})}}>
                                <option value="">--</option>
                                { categoriesRes.categories ?
                                    categoriesRes.categories.map((category, index)=>{
                                        return(
                                            <option key={index} value={category._id}>{category.title}</option>
                                        )
                                    })
                                : null}
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Sub Category :</label>
                            <select name="" id="" className='input' onChange={(e)=>{setFormBody({...formBody, subcategory:e.target.value})}}>
                                <option value="">--</option>
                                { subCategoriesRes ?
                                    subCategoriesRes.map((subcat, index)=>{
                                        return(
                                            <option key={index} value={subcat._id}>{subcat.title}</option>
                                        )
                                    })
                                : null}
                            </select>
                            <Nb message='please select category first to see sub categories' /> 
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className="label">description :</label>
                            <div className="text-editor">
                            <ReactQuill
                                    value={formBody.description}
                                    onChange={(e)=> setFormBody({...formBody, description:`${e}`})}
                                    modules={modules}
                                /> 
                            </div>
                            <Nb message=' Here you can provide all the product details' />   
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductGeneralInfo