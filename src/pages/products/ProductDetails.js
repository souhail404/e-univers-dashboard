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
                  <h1 className="l-h">Product Details {product ? `(${product.title})`: null}</h1>
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
              <div className='product-preview-box'>
                <div className="left-wrpr">
                    {product ?  <ProductImagesSlider images={product.images}/> : null}
                </div>
                <div className="right-wrpr">
                    {product ?  <PrdsInfos product={product}/> : null}
                </div>
              </div>
                
            </section>
        </main>
    )
}

const PrdsInfos = ({product}) => {
    return(
      <>
      {
      product ?
        <div className="info-wrpr">
          <div className="el">
            <p className='category'>{`${product.category?.title} / ${product.subcategory?.title}`}</p>
          </div>
          <div className="el">
            <h4 className='name'>{product.title}</h4>
          </div>
          <div className="el ">
            <p>{product.miniDescription}</p>
          </div>
          <div className="el ">
            <p className='sell-price'>{product.sellPrice} $</p>
            <p className='compare-price'>{product.comparePrice} $</p>
          </div>
          {
            product.variants?.length > 0 ?
            <>
              {
                product.variants.map((variant, index)=> {
                  return(
                    <div key={index} className='el'>
                      <h5 className='variant'>{variant.name} :</h5>
                      {
                        variant.options?.map((option, i)=>{
                          return <p key={i} className='option'>{option.value}</p>
                        })
                      }
                    </div>
                  )
                })
              }
            </>
            : null
          }
        </div>
        :null
      }
      </>
     
      
    )
  }

export default ProductDetails