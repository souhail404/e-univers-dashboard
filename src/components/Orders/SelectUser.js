import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import {useAuth} from '../../hooks/useAuth'

const SelectUser = ({setFilterUser}) => {
    const {user}= useAuth()
    const [isLoading, setIsLoading] = useState(false);
    const [usersData, setUsersData] = useState([])
    const [options, setOptions] = useState([])

    const fetchUsers = async()=>{
        try{
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/user` ,{
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
        let selectOpts = [{value:'', label:'All users'}]

        usersData.forEach(user =>{
            selectOpts.push({value:user._id, label:user.userName})
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
                placeholder='Filter Customers'
                onChange={(e)=>setFilterUser(e.value)}
            />
        </div>
        
    )
}

export default SelectUser