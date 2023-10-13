import React, { useEffect, useState } from 'react'
import AddBanner from '../forms/AddBanner'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

const BannerTab = () => {
  const {user} =useAuth()
  const [bannersData, setBannersData]=useState([]);
  const [isFetching, setIsFetching]=useState();

  const fetchBanners = async()=>{
    try {
      setIsFetching(true)
      const res = await fetch(`http://localhost:4000/api/store/banner/get`)
      const response = await res.json();
      if(res.ok){
          const {banners} = response;
          setBannersData(banners);
      }
      else{
          toast.error(`${response.message}`)
      }
      setIsFetching(false)
    } catch (error) {
        console.log(error);
    }
  }

  const handleDeleteBanner = async(id, index)=>{
    try {
      const toastId = toast.loading(`Deleting Banner `);
      const res = await fetch(`http://localhost:4000/api/store/banner/delete/${id}`,{
        method:'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const response = await res.json();
      if(res.ok){
        const updatedState = [...bannersData];
        updatedState.splice(index, 1)
        setBannersData(updatedState);
        toast.update(toastId, {render: "Banner Deleted Successfully", type: "success", isLoading: false, autoClose:5000});
      }
      else{
        toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
      }
      setIsFetching(false)
    } catch (error) {
        console.log(error);
    }
  }

  const confirmDeleteBanner = async(id, index)=>{
    confirmAlert(
      {
        title: 'Delete Banner',
        message: `Are you sure you wanna delete this Banner`,
        buttons: [
          {
            label: 'Delete',
            onClick: async() => 
            {
              await handleDeleteBanner(id)
            }
          },
          {
            label: 'Cancel',
            onClick: () => {return}
          }
        ]
      }
    )
  }

  useEffect(()=>{
    fetchBanners();
  },[])

  return (
    <div className="selected-tab-body">
        <AddBanner />
        <section className="banners-preview">
          <div className="section-header">
            <h6>Existing Banners {bannersData ? `(${bannersData.length})`: ``}</h6>
          </div>
          <div className="section-body">
            {
              isFetching ? 
              <div className="banner-wrapper">
                <div className="link">
                  <Skeleton />
                </div>
                <div className="banners">
                  <div className="banner">
                    <Skeleton />
                  </div>
                  <div className="banner">
                    <Skeleton />
                  </div>
                </div>
              </div>
              :
              bannersData.length > 0 ?

              bannersData.map((banner, index)=>{
                return(
                  <div key={index} className="banner-wrapper">
                      <div className="link">
                        <p> <b>Link : </b> {banner.link ? banner.link: 'null'} </p>
                      </div>
                      <div className="banners">
                        <div className="banner">
                          <img src={banner.desktopBanner?.url} alt={`banner-desktop-preview-${index}`}/>
                        </div>
                        <div className="banner">
                          <img src={banner.mobileBanner?.url} alt={`banner-mobile-preview-${index}`}/>
                        </div>
                      </div>
                      <button type="button" className='btn-round delete-banner' onClick={()=>{confirmDeleteBanner(banner._id, index)}}>
                          <MdDelete />
                      </button>
                  </div>
                )
              })
            : null 
            }
            
          </div>
        </section>
    </div>
  )
}

export default BannerTab