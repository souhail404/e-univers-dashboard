import React, { useEffect, useState } from 'react'
import { MdAdd, MdDeleteOutline, MdSave } from 'react-icons/md'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '@mui/material';
import BASE_URL from '../../APIurl';

const AddTiktokPixel = (props) => {
    const className= props.className;
    const [isFetching, setIsFetching] = useState(false);
    const [pixels, setPixels] = useState([]);
    const [newPixel, setNewPixel]= useState({script:''});

    const {user} =useAuth()

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const fetchTiktokPixels = async()=>{
        try {
            setIsFetching(true)
            const res = await fetch(`${BASE_URL}api/pixel/tiktok/get`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
                setPixels(response);
            }
            else{
                toast.error(`${response.message}`)
            }
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    const addPixel = ()=>{
        const newPixels = pixels;
        if(newPixel.script){
            newPixels.push(newPixel)
            setNewPixel({script:''})
            setPixels(newPixels)
        }
    }

    const removePixel = (index)=>{
        const updatedPixels = [...pixels];
        updatedPixels.splice(index, 1);
        setPixels(updatedPixels);
    }

    const updateTiktokPixels = async(event)=>{
        event.preventDefault();

        const toastId = toast.loading('Updating Tiktok Pixels');
        const data = JSON.stringify({pixels});
        try{
            const res = await fetch(`${BASE_URL}api/pixel/tiktok/edit`, {
                method:"POST",
                headers:myheaders,
                body:data
            })
            
            const response = await res.json();
            
            if(res.ok){
                toast.update(toastId, {render:'Tiktok pixels updated', type:'success', isLoading:false, autoClose:3000});
            }
            else{
                toast.update(toastId, {render:`${response.message}`, type:'error', isLoading:false, autoClose:3000});
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect (()=>{
        fetchTiktokPixels()
    },[])
    
    return (
        <form action="" className={`${className} form pixel-form tiktok`}>
            <div className="form-body">
                <div className="form-heading">
                    <h6>Tiktok Pixels</h6>
                    <button type="submit" className='btn save-btn' onClick={(e)=>{updateTiktokPixels(e)}}>
                        <MdSave className='icon'/> Save
                    </button>
                </div>
                <div className="form-line">
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            className='input' 
                            placeholder='Pixel script...'
                            required={true} 
                            value={newPixel.script} 
                            onChange={(e)=> setNewPixel({script:e.target.value})}  
                        />
                    </div>
                    <button type='button' className="btn add-pixel" onClick={()=>{addPixel()}}>
                        <MdAdd className='icon' /> Add
                    </button>                
                </div>
                <div className="pixels-preview">
                    {isFetching ? 
                        <>
                            <Skeleton height={50} className='form-line'/>
                        </> 
                        : 
                        pixels.map((pixel, index)=>{
                            return(
                                <div key={index} className="pixel-wrapper">
                                    <p className="script">
                                        {pixel.script}
                                    </p>
                                    <button type="button" className='delete-btn btn-round' onClick={()=>{removePixel(index)}}>
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </form>
    )
}

export default AddTiktokPixel