import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Nb from '../../common/Nb';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineDelete, AiOutlineDown } from 'react-icons/ai';

const ProductImages = ({formBody , setFormBody})=>{
    const [showBody, setShowBody]=useState(true);

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            isSaved: false,
            file: file,
        }));
        setFormBody({...formBody, images:[...formBody.images, ...newImages]});
    };

    const removeImage = (e,index) => {
        e.preventDefault()
        const updatedImages = formBody.images.filter((_, i) => i !== index);
        setFormBody({...formBody, images:updatedImages});
    };

    const moveImageUp = (e,index) => {
        e.preventDefault()
        if (index === 0) return;
        const updatedImages = [...formBody.images];
        const imageToMove = updatedImages[index];
        updatedImages.splice(index, 1);
        updatedImages.splice(index - 1, 0, imageToMove);
        setFormBody({...formBody, images:updatedImages});
    };

    const moveImageDown = (e,index) => {
        e.preventDefault()
        if (index === formBody.images.length - 1) return;
        const updatedImages = [...formBody.images];
        const imageToMove = updatedImages[index];
        updatedImages.splice(index, 1);
        updatedImages.splice(index + 1, 0, imageToMove);
        setFormBody({...formBody, images:updatedImages});
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {'image/*': []},
        onDrop,
    });

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
                    <Nb message='For best visual appearance, use a product image with a size of 800x800.' />
                    <div className="form-line">
                        <div className="image-dropzone-wrapper">
                            <div {...getRootProps()} className="dropzone f-r-c-c">
                                <input {...getInputProps()} />
                                <p>Drag and drop images here or click to browse</p>
                            </div>
                            <div className="image-preview">
                                {
                                    formBody.images.map((file, index) =>{
                                        if(file.isSaved){
                                            return(
                                                <SavedImageItem
                                                    key={index}
                                                    index={index}
                                                    url={file.url}
                                                    removeImage={removeImage}
                                                    moveImageUp={moveImageUp}
                                                    moveImageDown={moveImageDown}
                                                />
                                        )
                                        }
                                        if(!file.isSaved){
                                            return(
                                                <ImageItem
                                                    key={index}
                                                    index={index}
                                                    file={file.file}
                                                    removeImage={removeImage}
                                                    moveImageUp={moveImageUp}
                                                    moveImageDown={moveImageDown}
                                                />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>  
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
      <div className="image-item f-r-c-c">
        <div className="image-preview-container">
          <img src={previewURL} alt={`Image ${index + 1}`} className="image-preview-img" />
  
          <div className="image-buttons">
            <button onClick={(e) => removeImage(e,index)} className="image-button f-r-c-c">
              <AiOutlineDelete />
            </button>
            <button onClick={(e) => moveImageUp(e,index)} className="image-button f-r-c-c">
              <AiOutlineArrowUp />
            </button>
            <button onClick={(e) => moveImageDown(e,index)} className="image-button f-r-c-c">
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    );
};

const SavedImageItem = ({ index, url, removeImage, moveImageUp, moveImageDown }) => {
    return (
      <div className="image-item f-r-c-c">
        <div className="image-preview-container">
          <img src={url} alt={`saved-img ${index + 1}`} className="image-preview-img" />
  
          <div className="image-buttons">
            <button onClick={(e) => removeImage(e,index)} className="image-button f-r-c-c">
              <AiOutlineDelete />
            </button>
            <button onClick={(e) => moveImageUp(e,index)} className="image-button f-r-c-c">
              <AiOutlineArrowUp />
            </button>
            <button onClick={(e) => moveImageDown(e,index)} className="image-button f-r-c-c">
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductImages