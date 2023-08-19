import React, { useEffect, useState } from 'react'
import { MdAdd, MdDeleteOutline, MdSave } from 'react-icons/md'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '@mui/material';

const AddFacbookPixel = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [pixels, setPixels] = useState([]);
    const [newPixel, setNewPixel]= useState({script:''});

    const {user} =useAuth()

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const fetchFacebookPixels = async()=>{
        try {
            setIsFetching(true)
            const res = await fetch(`http://localhost:4000/api/pixel/facebook/get`, {
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

    const updateFacebookPixels = async(event)=>{
        event.preventDefault();

        const toastId = toast.loading('Updating Facebook Pixels');
        const data = JSON.stringify({pixels});
        try{
            const res = await fetch(`http://localhost:4000/api/pixel/facebook/edit`, {
                method:"POST",
                headers:myheaders,
                body:data
            })
            
            const response = await res.json();
            
            if(res.ok){
                toast.update(toastId, {render:'Facebook pixels updated', type:'success', isLoading:false, autoClose:3000});
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
        fetchFacebookPixels()
    },[])

    return (
        <form action="" className='form pixel-form facebook'>
            <div className="form-body">
                <div className="form-heading">
                    <h4>Facebook Pixels</h4>
                    <button type="submit" className='btn save-btn' onClick={(e)=>{updateFacebookPixels(e)}}>
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

export default AddFacbookPixel