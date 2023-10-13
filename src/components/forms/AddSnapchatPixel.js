import React, { useEffect, useState } from 'react'
import { MdAdd, MdDelete, MdDeleteOutline, MdSave } from 'react-icons/md'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '@mui/material';

const AddSnapchatPixel = (props) => {
    const className= props.className;
    const [isFetching, setIsFetching] = useState(false);
    const [pixels, setPixels] = useState([]);
    const [newPixel, setNewPixel]= useState({script:''});

    const {user} =useAuth()

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const fetchSnapchatPixels = async()=>{
        try {
            setIsFetching(true)
            const res = await fetch(`http://localhost:4000/api/pixel/snapchat/get`, {
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

    const updateSnapchatPixels = async(event)=>{
        event.preventDefault();

        const toastId = toast.loading('Updating Tiktok Pixels');
        const data = JSON.stringify({pixels});
        try{
            const res = await fetch(`http://localhost:4000/api/pixel/snapchat/edit`, {
                method:"POST",
                headers:myheaders,
                body:data
            })
            
            const response = await res.json();
            
            if(res.ok){
                toast.update(toastId, {render:'Snapchat pixels updated', type:'success', isLoading:false, autoClose:3000});
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
        fetchSnapchatPixels()
    },[])


    return (
        <form action="" className={`${className} form pixel-form snapchat`}>
            <div className="form-body">
                <div className="form-heading">
                    <h6>Snapchat Pixels</h6>
                    <button type="submit" className='btn save-btn' onClick={(e)=>{updateSnapchatPixels(e)}}>
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

export default AddSnapchatPixel