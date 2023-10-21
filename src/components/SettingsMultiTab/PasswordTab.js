import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify';
import { MdLockReset } from 'react-icons/md';
import BASE_URL from '../../APIurl';

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
            const res = await fetch(`${BASE_URL}api/user/reset-password/${user.id}`, {
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

    return (
        <div className="selected-tab-body">
            <form action="" className='form form-type-2'>
                <div className="form-body">
                    <div className="form-heading">
                        <h6>Resest Password</h6>
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
                        <button type="submit" className='type-200__button'  onClick={(e)=>handleResetPasswod(e)}>
                            <MdLockReset style={{fontSize:'20px'}} />
                            <p>Reset</p>
                        </button> 
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PasswordTab