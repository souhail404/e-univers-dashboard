import React, { useRef } from 'react'
import {AiOutlineRight , AiOutlineLeft } from 'react-icons/ai'

const ProductImagesSlider = ({images}) => {
    const mainImg = useRef();
    const imgsWrapper = useRef()

    const handleClick = (e) =>{
        imgsWrapper.current.childNodes.forEach(element => {
            element.childNodes[0].classList.remove('active')
        });
        mainImg.current.src = e.src;
        e.classList.add('active');
    }
    const moveRight = ()=>{
        imgsWrapper.current.scrollLeft = imgsWrapper.current.scrollLeft + 140;
    }
    const moveLeft = ()=>{
        imgsWrapper.current.scrollLeft = imgsWrapper.current.scrollLeft - 140;
    }
  return (
    <>
        <div className="img-slider-container">
            {
                images ? 
                <>
                <div className="active-img-wrpr">
                    <img ref={mainImg} src={images[0].url} alt="" />
                </div>
                <div ref={imgsWrapper} className="all-imgs-wrpr">
                    {images.map((img,i)=>{
                            if(i===0){
                                return(
                                    <div className="img" key={i} onClick={(e)=>{handleClick(e.target)}}>
                                        <img className='active' src={img.url} alt="" />
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div className="img" key={i} onClick={(e)=>{handleClick(e.target)}}>
                                        <img className='' src={img.url} alt="" />
                                    </div>
                                )
                            }
                    })}
                </div>
                <div className="move move-right" onClick={()=>{moveRight()}}> <AiOutlineRight /> </div>
                <div className="move move-left" onClick={()=>{moveLeft()}}><AiOutlineLeft /></div>
                </>
                : null
                }
            
        </div>
    </>
  )
}

export default ProductImagesSlider