import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify';
import { MdLockReset } from 'react-icons/md';

const PasswordTab = () => {
    const {user} =useAuth()
    const [passwodForm, setPasswordForm]=useState({currentPassword: '', newPassword: '', newPasswordTwo: ''});

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const handleResetPasswod= async(event)=>{
        event.preventDefault();

        const toastId = toast.loading('Reseting Password');
        const data = JSON.stringify(passwodForm);
        try{
            const res = await fetch(`http://localhost:4000/api/user/reset-password/${user.id}`, {
                method:"PUT",
                headers:myheaders,
                body:data
            })
            
            const response = await res.json();
            
            if(res.ok){
                toast.update(toastId, {render:'Password updated', type:'success', isLoading:false, autoClose:3000});
                setPasswordForm({currentPassword: '', newPassword: '', newPasswordTwo: ''})
            }
            else{
                toast.update(toastId, {render:`${response.message}`, type:'error', isLoading:false, autoClose:3000});
            }
        }
        catch(err){
            console.log(err);
        }
    }

    // useEffect(()=>{
    //     fetchUserData();
    // },[])

    return (
        <div className="selected-tab-body">
            <form action="" className='form'>
                <div className="form-body">
                    <div className="form-heading">
                        <h4>Resest Password</h4>
                    </div>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Current Password :</label>
                            <input 
                                type="password" 
                                className='input' 
                                required={true}
                                value={passwodForm.currentPassword}
                                onChange={(e)=> setPasswordForm({...passwodForm, currentPassword:`${e.target.value}`})}
                                />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>New Password :</label>
                            <input 
                                type="password" 
                                className='input' 
                                required={true}
                                value={passwodForm.newPassword}
                                onChange={(e)=> setPasswordForm({...passwodForm, newPassword:`${e.target.value}`})}
                                />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Confirm New Password :</label>
                            <input 
                                type="password" 
                                className='input' 
                                required={true}
                                value={passwodForm.newPasswordTwo}
                                onChange={(e)=> setPasswordForm({...passwodForm, newPasswordTwo:`${e.target.value}`})}
                                />
                        </div>                     
                    </div>
                    <div className="form-buttons">
                        <button type='submit' className="btn" onClick={(e)=>handleResetPasswod(e)}>
                          <MdLockReset className='icon' /> Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PasswordTab