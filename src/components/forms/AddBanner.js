import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../hooks/useAuth';
import Nb from '../common/Nb'
import { AiOutlineDelete } from 'react-icons/ai';
import createBannerService from '../../services/createBannerService';

const AddBanner = () => {
    const {user} = useAuth()
    const [bannerData, setBannerData] = useState({desktopBanner:'', mobileBanner:'', link:''})

    const onDrop = (fieldName, acceptedFiles) => {
        const file = acceptedFiles[0];
        setBannerData((prevData) => ({
            ...prevData,
            [fieldName]: file,
        }));
    };

    const { getRootProps: getRootPropsDesktop, getInputProps: getInputPropsDesktop } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => onDrop('desktopBanner', acceptedFiles),
    });

    const { getRootProps: getRootPropsMobile, getInputProps: getInputPropsMobile } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => onDrop('mobileBanner', acceptedFiles),
    });

    const removeDesktopBanner = () => {
        setBannerData({...bannerData, desktopBanner:''})
    };

    const removeMobileBanner = () => {
        setBannerData({...bannerData, mobileBanner:''})
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        createBannerService(bannerData, user)
        // Do something with bannerData, like sending it to the server
    };

    return (
        <form action="" className='form form-type-2 add-banner-form'>
                  <div className="form-body">
                      <div className="form-heading">
                          <h4>Home Banners</h4>
                      </div>
                      <div className="form-line">
                          <div className="input-wrapper">
                            <label htmlFor="" className='label'>Desktop Banner :</label>
                            <div className="image-dropzone-wrapper">
                            {
                            bannerData.desktopBanner ? 
                                <ImageItem file={bannerData.desktopBanner} removeImage={removeDesktopBanner}/> 
                                :
                                <div {...getRootPropsDesktop()} className="dropzone f-r-c-c">
                                    <input {...getInputPropsDesktop()} name='desktopBanner' />
                                    <p>drop image here or click to browse</p>
                                </div>
                                
                            }
                            </div>
                            <Nb message='Must be (1200px X 400px)'/>
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="" className='label'>Mobile Banner :</label>
                            <div className="image-dropzone-wrapper">
                                {bannerData.mobileBanner ? <ImageItem file={bannerData.mobileBanner} removeImage={removeMobileBanner}/> :
                                <div {...getRootPropsMobile()} className="dropzone f-r-c-c">
                                <input {...getInputPropsMobile()} name='mobileBanner' />
                                <p>drop image here or click to browse</p>
                                </div>
                            }   
                            </div>
                            <Nb message='Must be (800px X 800px)'/> 
                          </div>
                      </div>
                      <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>link:</label>
                            <input 
                                type="text" 
                                className='input' 
                                required
                                value={bannerData.link}
                                onChange={(e)=> setBannerData({...bannerData, link:`${e.target.value}`})}
                                />
                        </div>
                      </div>
                      <div className="form-buttons">
                          <button type='submit' className="btn" onClick={(e)=>{handleAddClick(e)}}>
                            <MdAdd className='icon'/> Add
                          </button>
                      </div>
                  </div>
              </form>
    )
}

const ImageItem = ({ file, removeImage }) => {
    return (
      <div className="image-item f-r-c-c">
        <div className="image-preview-container">
          <img src={URL.createObjectURL(file)} alt="Preview" className="image-preview-img" />
  
          <div className="image-buttons">
            <button onClick={() => removeImage(file)} className="image-button f-r-c-c">
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    );
  };


export default AddBanner