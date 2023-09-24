import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import fetchService from '../../services/fetchService';
import { FiEdit } from 'react-icons/fi';
import OverviewCard from '../../components/Dashboard/OverviewCard';
import ProductImagesSlider from '../../components/common/ProductImagesSlider';
import { MdAddShoppingCart, MdFavoriteBorder, MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';

const ProductDetails = () => {
    const {productId} = useParams();
    const {user} = useAuth()
    const navigate = useNavigate()

    const [product, setProduct] =useState({});
    const [isFetching, setIsFetching] =useState(false);

    useEffect(()=>{
        setIsFetching(true)
        fetchService(`http://localhost:4000/api/product/${productId}` , setProduct, setIsFetching)
    },[])
    return (
        <main className="page product-details-page">
            <section className='white-bg-section flex-c-jb header-200' >
                <div>

                </div>
                <div className='f-r-c-c header-200__right'>
                <button type="button" className='header-200__button'>
                    <FiEdit style={{fontSize:'20px'}} />
                    <span>Edit</span>
                </button>
                </div>
            </section>
            <section className='overview-cards-wrapper'>
                <OverviewCard icon={<MdOutlineShoppingCart /> } label='Orders' period={``} thisData={product.ordered} isLoading={isFetching} />
                <OverviewCard icon={<MdOutlineRemoveShoppingCart /> } label='Returned' period={``} thisData={product.ordered} isLoading={isFetching} />
                <OverviewCard icon={<MdFavoriteBorder /> } label='Liked' period={``} thisData={product.liked} isLoading={isFetching} />
                <OverviewCard icon={<MdAddShoppingCart /> } label='Added to cart' period={``} thisData={product.addedToCart} isLoading={isFetching}/>
            </section>
            <section className='white-bg-section'>
                <div className="left-wrpr">
                    {product ?  <ProductImagesSlider images={product.images}/> : null}
                </div>
                <div className="right-wrpr">
                    {product ?  <PrdsInfos data={product}/> : null}
                </div>
            </section>
        </main>
    )
}

const PrdsInfos = (props) => {
    return(
      <div className="info-wrpr">
        <div className="name">
          <p>{props.data.title}</p>
        </div>
        <div className="">
          <p>{props.data.miniDescription}</p>
        </div>
        <div className="">
          <p>{props.data.sellPrice} $</p>
        </div>
      </div>
    )
  }

export default ProductDetails