import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import {FiTrash2} from 'react-icons/fi'
import pluralize from 'pluralize';
import { AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

import {AiOutlineDown} from 'react-icons/ai'
import Nb from '../components/common/Nb';
const CreateProduct = () => {

  return (
    <div className='page create-product-page'>
        <div className="page-wrapper">
            <div className="page-header">
                <h2>Create new product</h2>
            </div>
            <div className="page-body">
                <form className='form create-product-form' action="">
                    <div className="form-haeder">
                        
                    </div>
                    <div className="form-body">
                        <div className="form-group">
                            <PrdGeneralInfos />
                        </div>

                        <div className="form-group">
                            <PrdPrice />
                        </div>
                        <div className="form-group">
                            <PrdImages />
                        </div>
                        <div className="form-group">
                            <PrdVariants/>
                        </div>
                    </div>
                    <div className="form-actions">
                        <div className="form-action">
                            <button className="btn">
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

const PrdGeneralInfos =(props)=>{
    const [description, setDescription] = useState('');

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
    
        input.onchange = async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
    
          // Here, you can handle the image upload to your backend and get the image URL
          // For example:
          // const response = await fetch('your_image_upload_url', { method: 'POST', body: formData });
          // const imageUrl = await response.json();
    
          // Then, insert the image in the editor at the current cursor position
          // editorRef is a reference to the ReactQuill editor instance
        //   const range = editorRef.getSelection(true);
        //   editorRef.insertEmbed(range.index, 'image', 'your_image_url_here');
        };
      };

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

    return(
        <>
            <div className="form-line">
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>Product Name :</label>
                    <input type="text" className='input' placeholder='Ex: iphone 9..' />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>slug :</label>
                    <input type="text" className='input' placeholder='Ex: iphone-9..' />
                </div>
            </div>
            <div className="form-line">
                <div className="input-wrapper">
                    <Nb message='this is just a mini description, so for a good view its must not be more than a 50 character' />
                    <label htmlFor="" className='label'>Brief and catchy description :</label>
                    <textarea className='input' placeholder='Ex: something...'></textarea>
                </div>
            </div>
            <div className="form-line">
                <div className="input-wrapper">
                    <Nb message=' Here you can provide all the product details' />
                    <label htmlFor="" className="label">description :</label>
                    <div className="text-editor">
                       <ReactQuill
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                        /> 
                    </div>
                    
                </div>
            </div>
        </>
    )
}

const PrdPrice = ()=>{
    const [showBody, setShowBody]=useState(false);
    return(
        <>  
            <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Pricing</p>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Selling Price :</label>
                            <input type="number" className='input' placeholder='Ex: iphone 9..' />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Comparing Price :</label>
                            <input type="text" className='input' placeholder='Ex: iphone-9..' />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Cost Price :</label>
                            <input type="text" className='input' placeholder='Ex: iphone-9..' />
                        </div>
                    </div>  
                </div>
            </div>
        </>  
    )
    
}

const PrdImages = ()=>{
    const [showBody, setShowBody]=useState(false);
    const [images, setImages] = useState([]);

    const onDrop = (acceptedFiles) => {
        setImages([...images, ...acceptedFiles]);
    };

    const removeImage = (e,index) => {
        e.preventDefault()
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const moveImageUp = (e,index) => {
        e.preventDefault()
        if (index === 0) return;
        const updatedImages = [...images];
        const imageToMove = updatedImages[index];
        updatedImages.splice(index, 1);
        updatedImages.splice(index - 1, 0, imageToMove);
        setImages(updatedImages);
    };

    const moveImageDown = (e,index) => {
        e.preventDefault()
        if (index === images.length - 1) return;
        const updatedImages = [...images];
        const imageToMove = updatedImages[index];
        updatedImages.splice(index, 1);
        updatedImages.splice(index + 1, 0, imageToMove);
        setImages(updatedImages);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    const handleSubmit = () => {
        // Handle the submission of images here
        console.log(images);
    };

    return(
        <>  
            <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Images</p>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="form-line">
                        <div className="image-dropzone-wrapper">
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                <p>Drag and drop images here or click to browse</p>
                            </div>
                            <div className="image-preview">
                                {images.map((file, index) => (
                                <ImageItem
                                    key={index}
                                    index={index}
                                    file={file}
                                    removeImage={removeImage}
                                    moveImageUp={moveImageUp}
                                    moveImageDown={moveImageDown}
                                />
                                ))}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>  
    )
    
}

const PrdVariants = ()=>{
    const [showBody, setShowBody]=useState(false);

    const { productId } = useParams();
    const {user} = useAuth();
    const {token} = user;
    const [product , setProduct] = useState({});

    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState([
        {   name: '', 
            options: [
                {
                  value:'', 
                  price_def:'',
                  image:'',
                  available:true 
                }
            ] 
        }]);

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', options: [{value:'',price_def:'',image:'',available:true}] }]);
    };
    
    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleAddOption = (index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].options.push({value:'',price_def:'',image:'',available:true});
        setVariants(updatedVariants);
    };

    const handleRemoveOption = (variantIndex, optionIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].options.splice(optionIndex, 1);
        setVariants(updatedVariants);
    };

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${token}`);
    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const response = await fetch(`http://localhost:4000/api/product/${productId}`, {
                    method: 'GET',
                    headers: myheaders
                });

                const data = await response.json()
                setProduct(data);
            }
            catch(err){
                console.log(err);
            }
        }

        fetchProduct();
    },[])

    const handleSubmit = async() => {
        try{
            console.log(JSON.stringify({variants:variants}));
            const response = await fetch(`http://localhost:4000/api/product/${productId}/variants/add/`, {
                method: 'POST',
                headers: myheaders,
                body:JSON.stringify({variants:variants})
            });

            const data = await response.json()
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    };

    
    return(
        <>  
            <div className="outer-block">
                <Nb message='if the product has different variants (like Colrs, Sizes, Storage... ) please enable this field and add them.' />
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Variants</p>
                        <div className='block-actions'>
                            <div className="action">
                                <label htmlFor="has-variants" className='toggle-switcher'>
                                    <input type="checkbox" name="has-variants" id="has-variants" onChange={()=>{setHasVariants(!hasVariants)}} />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                        {hasVariants ? 
                            <>
                            {
                                variants.map((variant, varIndex)=>{
                                    return(
                                        <div key={varIndex} className="variant-wrapper">
                                            <div className='variant-elem variant-name'>
                                                <div className="input-wrapper">
                                                    <label htmlFor={`variantName-${varIndex}`} className="label">Variant name :</label>
                                                    <input type="text" className="input" id={`variantName-${varIndex}`} name={`variantName-${varIndex}`} placeholder='Ex: Colors, Size, Storage...' 
                                                        onChange={(e)=>{
                                                            const updatedVariants = [...variants];
                                                            updatedVariants[varIndex].name = e.target.value;
                                                            setVariants(updatedVariants);
                                                    }}/> 
                                                </div>
                                            </div>
                                            <div className='variant-elem variant-options'>
                                            {
                                                variant.options.map((opt , optIndex)=>{
                                                    return(
                                                        <div key={optIndex} className="option-wrapper">
                                                            <div className="opt opt-header">
                                                                <p>{variant.name ? `${pluralize.singular(variant.name.trim())} ${optIndex+1}` : `Option ${optIndex+1}`}</p>
                                                            </div>
                                                            <div className="opt opt-body">
                                                                <div className="input-wrapper">
                                                                    <label htmlFor={`optVal-${optIndex}`} className="label">value :</label>
                                                                    <input type="text" id={`optVal-${optIndex}`} name={`optVal-${optIndex}`} className="input" placeholder='Ex: Red'
                                                                            onChange={(e) =>{
                                                                                const updatedVariants = [...variants];
                                                                                updatedVariants[varIndex].options[optIndex].value = e.target.value;
                                                                                setVariants(updatedVariants);
                                                                            }}/> 
                                                                </div>    
                                                                <div className="input-wrapper">
                                                                    <label htmlFor={`optPrice-${optIndex}`} className="label">price :</label>
                                                                    <input type="number" className="input" placeholder='Ex: +3$' id={`optPrice-${optIndex}`} name={`optPrice-${optIndex}`}
                                                                            onChange={(e)=>{
                                                                                const updatedVariants = [...variants];
                                                                                updatedVariants[varIndex].options[optIndex].price_def = e.target.value;
                                                                                setVariants(updatedVariants);
                                                                            }} /> 
                                                                </div>    
                                                                <div className="input-wrapper">
                                                                    <label htmlFor={`optImg-${optIndex}`} className="label">image:</label>
                                                                    <input type="file" className="input" id={`optImg-${optIndex}`} name={`optImg-${optIndex}`}
                                                                            onChange={(e)=>{
                                                                                const updatedVariants = [...variants];
                                                                                updatedVariants[varIndex].options[optIndex].image = e.target.value;
                                                                                setVariants(updatedVariants);
                                                                            }} /> 
                                                                </div>
                                                                <div className="input-wrapper">
                                                                    <label htmlFor={`available-${optIndex}`} className="label">available in stock?</label>
                                                                    <select className='input' name={`available-${optIndex}`} id={`available-${optIndex}`} 
                                                                        onChange={(e)=>{
                                                                            const updatedVariants = [...variants];
                                                                            updatedVariants[varIndex].options[optIndex].available = e.target.value;
                                                                            setVariants(updatedVariants);
                                                                        }}
                                                                        >
                                                                        <option value={true}>Yes</option>
                                                                        <option value={false}>No</option>
                                                                    </select>
                                                                </div>
                                                                <div className="option-action">
                                                                    <button type='button' className='btn delete' onClick={()=>{handleRemoveOption(varIndex,optIndex)}}><FiTrash2 /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }  
                                            <button type='button' className='add-option-btn' onClick={()=>handleAddOption(varIndex)}>+ add option</button>
                                            </div>
                                            <button type='button' className='btn remove-variant-btn' onClick={()=>handleRemoveVariant(varIndex)}><div className="icon"><FiTrash2/></div>Remove Variant</button>
                                        </div>
                                    ) 
                                })
                            }
                            <button type="button" className='btn add-variant-btn' onClick={()=>{handleAddVariant()}}>Add another variant</button>
                            </>
                        : null}
                </div>
            </div>
        </>  
    )
    
}

const ImageItem = ({ index, file, removeImage, moveImageUp, moveImageDown }) => {
    const [previewURL, setPreviewURL] = useState('');
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  
    return (
      <div className="image-item">
        <div className="image-preview-container">
          <img src={previewURL} alt={`Image ${index + 1}`} className="image-preview-img" />
  
          <div className="image-buttons">
            <button onClick={(e) => removeImage(e,index)} className="image-button">
              <AiOutlineDelete />
            </button>
            <button onClick={(e) => moveImageUp(e,index)} className="image-button">
              <AiOutlineArrowUp />
            </button>
            <button onClick={(e) => moveImageDown(e,index)} className="image-button">
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    );
};

export default CreateProduct