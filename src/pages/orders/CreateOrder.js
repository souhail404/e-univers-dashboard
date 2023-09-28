import React, { useEffect, useState } from 'react'
import SelectUser from '../../components/Orders/SelectUser'
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const CreateOrder = () => {
  const {user} = useAuth()

  const [customer, setCustomer]= useState('');
  const [customerData, setCustomerData]= useState('');
  const [isFetchingCustomer, setIsFetchingCustomer]= useState('');

  const fetchCustomer = async()=>{
    try{ 
        setIsFetchingCustomer(true)
        const res = await fetch(`http://localhost:4000/api/user/id/${customer}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        const response = await res.json();
        if(res.ok){
            const {user} = response;
            setCustomerData(user);
        }
        else{
          toast.error(`${response.message}`)
        }
        setIsFetchingCustomer(false)
    }catch(err){
        console.log(err);
        setIsFetchingCustomer(false)
    } 
  }

  useEffect(()=>{
    if (customer) {
      fetchCustomer()
    }
  },[customer])

  return (
    <main className="page create-order-page">
      <section className='white-bg-section flex-c-jb header-200' >
        <div>
          <h3>Create Order</h3>
        </div>
      </section>
      <form action="" className='form form-type-2 bg-white shadow-5'>
        <div className="form-body">
          <div className="form-line">
            <h5 className='s-h'>Customer</h5>
          </div>
          <div className="form-line">
            <div>
              <SelectUser setFilterUser={setCustomer} placeholder='Select Customer' />
            </div>
          </div>
          <div className="form-line">
            {
              customer ?
              <table className="table-list-body">
                <thead>
                  <tr>
                    <th><p>Full Name</p></th>
                    <th> <p>Email</p> </th>  
                    <th> <p>Mobile</p> </th>
                    <th> <p>Shipping Address</p> </th>
                  </tr>
                </thead>
                <tbody>
                  { isFetchingCustomer ?
                    <TableSkeleton lines={1} rows={4} />
                    :
                    customerData ? 
                    <tr>
                      <td><p>{`${customerData.lastName} ${customerData.firstName}`}</p></td>
                      <td> <p>{`${customerData.email}`}</p> </td>  
                      <td> <p>{`${customerData.mobile}`}</p> </td>
                      <td> 
                        <p>
                          {/* {`
                          ${customerData.addre.country ? customerData.shippingAddress.country : ''}
                          ${customerData.shippingAddress.city ? customerData.shippingAddress.city : ''}
                          ${customerData.shippingAddress.street ? customerData.shippingAddress.street : ''}
                          ${customerData.shippingAddress.houseNumber ? customerData.shippingAddress.houseNumber : ''}
                          `} */}
                        </p> 
                      </td>
                    </tr> : null
                  }
                </tbody>
              </table>
              : null
            } 
          </div>
        </div>
      </form>
      <form className='form form-type-2 bg-white shadow-5'>
        <div className="form-body">
          <div className="form-line">
            <h5 className='s-h'>Shipping Address</h5>
          </div>
          <div className="form-line">
          
          </div>
        </div>
      </form>
    </main>
  )
}

export default CreateOrder