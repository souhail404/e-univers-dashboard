import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';
import { MdOutlineSave } from 'react-icons/md';

const AccountTab = () => {
    const {user} =useAuth()
    const [accountData, setAccountData]=useState();
    const [isFetching, setIsFetching]=useState();

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const fetchUserData = async()=>{
        try {
            setIsFetching(true)
            const res = await fetch(`http://localhost:4000/api/user/id/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            const response = await res.json();
            if(res.ok){
                const {user} = response;
                setAccountData(user);
            }
            else{
                toast.error(`${response.message}`)
            }
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveGeneralInfos= async(event)=>{
        event.preventDefault();

        const toastId = toast.loading('Updating your account infos');
        const data = JSON.stringify(accountData);
        try{
            const res = await fetch(`http://localhost:4000/api/user/update/${user.id}`, {
                method:"PUT",
                headers:myheaders,
                body:data
            })
            
            const response = await res.json();
            
            if(res.ok){
                toast.update(toastId, {render:'Account updated', type:'success', isLoading:false, autoClose:3000});
                // navigate('/categories/')
            }
            else{
                toast.update(toastId, {render:`${response.message}`, type:'error', isLoading:false, autoClose:3000});
            }
        }
        catch(err){
        console.log(err);
        }
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    return (
        <div className="selected-tab-body">
            <form action="" className='form form-type-2'>
                <div className="form-body">
                    <div className="form-heading">
                        <h6>Profile Infos </h6>
                    </div>
                    <div className="form-line">
                        {
                            isFetching ? 
                            <>
                                <Skeleton height={70}/>
                                <Skeleton height={70}/>
                                <Skeleton height={70}/>
                            </> 
                            :
                            <>
                                {
                                    accountData ?
                                    <>
                                        <div className="input-wrapper">
                                            <label htmlFor="" className='label'>Username :</label>
                                            <input 
                                                type="text" 
                                                className='input' 
                                                required
                                                value={accountData.userName}
                                                onChange={(e)=> setAccountData({...accountData, userName:`${e.target.value}`})}
                                                />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="" className='label'>First Name :</label>
                                            <input 
                                                type="text" 
                                                className='input' 
                                                required
                                                value={accountData.firstName}
                                                onChange={(e)=> setAccountData({...accountData, firstName:`${e.target.value}`})}
                                                />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="" className='label'>Last Name :</label>
                                            <input 
                                                type="text" 
                                                className='input' 
                                                required
                                                value={accountData.lastName}
                                                onChange={(e)=> setAccountData({...accountData, lastName:`${e.target.value}`})}
                                                />
                                        </div>
                                    </>
                                    :
                                    null
                                }
                            </>
                        }
                    </div>
                    <div className="form-line">
                        {
                            isFetching ? 
                            <>
                                <Skeleton height={70}/>
                                <Skeleton height={70}/>
                            </> 
                            :
                            <>
                                {
                                    accountData ?
                                    <>
                                        <div className="input-wrapper">
                                            <label htmlFor="" className='label'>Email :</label>
                                            <input 
                                                type="text" 
                                                className='input' 
                                                required
                                                value={accountData.email}
                                                onChange={(e)=> setAccountData({...accountData, email:`${e.target.value}`})}
                                                />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="" className='label'>Mobile :</label>
                                            <input 
                                                type="number" 
                                                className='input' 
                                                required
                                                value={accountData.mobile}
                                                onChange={(e)=> setAccountData({...accountData, mobile:`${e.target.value}`})}
                                                />
                                        </div>
                                    </>
                                    :
                                    null
                                }
                            </>
                        }
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className='type-200__button' onClick={(e)=>handleSaveGeneralInfos(e)}>
                            <MdOutlineSave style={{fontSize:'20px'}} />
                            <p>Save</p>
                        </button> 
                        {/* <button type='submit' className="btn" onClick={(e)=>handleSaveGeneralInfos(e)}>
                           <MdOutlineSave className='icon'/> Save
                        </button> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AccountTab