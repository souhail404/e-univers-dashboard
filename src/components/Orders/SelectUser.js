import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import {useAuth} from '../../hooks/useAuth'
import BASE_URL from '../../APIurl';

const SelectUser = ({setFilterUser, placeholder}) => {
    const {user}= useAuth()
    const [isLoading, setIsLoading] = useState(false);
    const [usersData, setUsersData] = useState([])
    const [options, setOptions] = useState([])

    const fetchUsers = async()=>{ 
        try{
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}api/user` ,{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })

            const response = await res.json();
            if(res.ok){
              const {users} = response;
              setUsersData(users);
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsLoading(false)
        }catch(err){
            console.log(err);
            setIsLoading(false)
        } 
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    useEffect(()=>{
        let selectOpts = [{value:'', label:'None'}]

        usersData.forEach(user =>{
            selectOpts.push({value:user._id, label:`${user.lastName} ${user.firstName}`})
        })
        setOptions(selectOpts)
    },[usersData])

    return (
        <div className='tlh-right--elem'>
            <Select
                className="basic-single-select"
                classNamePrefix="select Product"
                isLoading={isLoading}
                name="products"
                options={options}
                placeholder={placeholder}
                onChange={(e)=>setFilterUser(e.value)}
            />
        </div>
        
    )
}

export default SelectUser