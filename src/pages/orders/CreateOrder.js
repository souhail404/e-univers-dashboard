import React, { useEffect, useState } from 'react'
import SelectUser from '../../components/Orders/SelectUser'
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import PageHeading from '../../components/common/PageHeading';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SelectMultiProducts from '../../components/SelectMultiProducts';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineSave } from 'react-icons/md';
import BASE_URL from '../../APIurl';

const CreateOrder = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const [orderData, setOrderData] = useState(
    {
      items:[

      ],
      userId:"",
      shippingAddress:{
        country:"",
        city:"",
        zip:"",
        street:"",
        houseNumber:""
      }
    }
  )

  const [customer, setCustomer]= useState('');
  const [customerData, setCustomerData]= useState('');
  const [isFetchingCustomer, setIsFetchingCustomer]= useState('');

  const [totalOrderPrice, setTotalOrderPrice] = useState(0)
  const [selectedProduct, setSelectedProduct]= useState();
  const [products, setProducts]= useState([]);
  const [isFetchingProducts, setIsFetchingProducts]= useState(false);
  const [showAddAddress, setShowAddAddress]= useState(false);
  
  const fetchCustomer = async()=>{
    try{ 
        setIsFetchingCustomer(true)
        const res = await fetch(`${BASE_URL}api/user/id/${customer}`, {
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

  const incrementQuantity = (index)=>{
    if(products[index].quantity < 10 ){
          setProducts(products => products.map((product, i) => i === index ? {...product, quantity:product.quantity+1} : product));
    }
  }

  const decrementQuantity = (index)=>{
    if(products[index].quantity > 1 ){
      setProducts(products => products.map((product, i) => i === index ? {...product, quantity:product.quantity-1} : product));
    }
  }

  const selectOption = (variant, optI, index)=>{
      const toUpdate = [...products[index].itemOptions]
      const indexA = toUpdate.findIndex((obj => obj.variantId === variant._id))
      if (indexA === -1 ) {
        return
      }
      toUpdate[indexA] = {variantId: variant._id, optionId:variant.options[optI]._id, priceDef: variant.options[optI].priceDef}
      
      var totalPriceDef = 0;
      toUpdate.forEach(opt => {
        if (opt.priceDef) {
          totalPriceDef += opt.priceDef;
        }
      });
      setProducts(products => products.map((product, i) => i === index ? {...product, itemOptions:toUpdate, totalPriceDef:totalPriceDef} : product));
  }

  const removeProduct = (index)=>{
    const updated = [...products]
    updated.splice(index, 1)
    setProducts(updated)
  }

  const handleSelectAddress = (val)=>{
    setShowAddAddress(false)
    setOrderData(
      {
        ...orderData, 
        shippingAddress:{
          country:"",
          city:"",
          zip:"",
          street:"",
          houseNumber:""
        }
      })
    if (val === "addOtherAddress") {
      setShowAddAddress(true)
      return
    }

    setOrderData(
      {
        ...orderData, 
        shippingAddress:{
          country:customerData.addresses[val].country,
          city:customerData.addresses[val].city,
          zip:customerData.addresses[val].zip,
          street:customerData.addresses[val].street,
          houseNumber:customerData.addresses[val].houseNumber
        }
      })
  }

  const createOrder = async()=>{
      const myheaders = new Headers();
      myheaders.append('Content-Type', 'application/json');
      myheaders.append('Authorization', `Bearer ${user.token}`);

      const id = toast.loading("Creating new order...");
      const data = JSON.stringify({...orderData});
      var res;
      try{
        res = await fetch(`${BASE_URL}api/order/create`, {
          method:"POST",
          headers:myheaders,
          body:data
        })
        const response = await res.json();
        
        if(res.ok){
          toast.update(id, {render: "Order Created Succefully", type: "success", isLoading: false, autoClose:8000});
          navigate(`/orders/${response.order._id}/details`)
        }
        else{
          toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:8000});
        }
      }catch(err){
        console.log(err);
      }
  }

  const handleSaveClick = ()=>{
    createOrder()
  }

  useEffect(()=>{
    if (customer) {
      fetchCustomer()
    }
  },[customer])
  
  useEffect(()=>{
    setTotalOrderPrice(0)
    for (let index = 0; index < products.length; index++) {
        setTotalOrderPrice(totalOrderPrice => totalOrderPrice + ((products[index].itemPrice + products[index].totalPriceDef) * products[index].quantity))
    }

    if (products.length > 0) {
      const items = []
      products.forEach(product=>{
        items.push({itemId:product.itemId, itemPrice:product.itemPrice, itemOptions:product.itemOptions, quantity:product.quantity})
      })
      setOrderData({...orderData, items})
    }
  },[products])

  useEffect(()=>{
    const a = [...products]
    if (selectedProduct) {
      a.push(selectedProduct)
      setProducts(a)
    }
    setSelectedProduct()  
  },[selectedProduct])

  useEffect(()=>{
    if(customerData){
      setOrderData({...orderData, userId:customerData._id})
    }
  },[customerData])


  return (
    <main className="page create-order-page">
      <section className='white-bg-section flex-c-jb header-200 mb1' >
        <PageHeading title={`Create order`} />
        <div className='f-r-c-c header-200__right'>
            <Link to={`/orders`} className='type-200__button'>
                <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                <p>Back</p>
            </Link> 
        </div>
      </section>
      <form action="" className='form form-type-2 bg-white shadow-5 mb1'>
        <div className="form-body">
          <div className="form-line">
            <h6 className='s-h'>Customer</h6>
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
                        <div>
                          {
                            customerData.addresses?.length > 0 ?
                            <>
                            <div className='flex-c-jb intable-address'>
                              <select className='intable-address-select' name="" id="" onChange={(e)=>{handleSelectAddress(e.target.value)}}>
                                <option value="">Select Address</option>
                                <>
                                  {
                                    customerData.addresses.map((address, index)=>{
                                        return <option key={index} value={index}>{address.city} {address.street}</option>  
                                    })
                                  }
                                </> 
                                <option value="addOtherAddress">+ Another Address</option>
                              </select>
                            </div>
                            </> 
                            :
                            <div>
                              <p>No Address Registred</p>
                              <button type="button" onClick={()=>setShowAddAddress(true)}>+ Add Address</button>
                            </div>                            
                            }
                        </div> 
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
      { 
        showAddAddress ? 
        <form className='form form-type-2 bg-white shadow-5 mb1'>
          <div className="form-body">
            <div className="form-line">
              <h6>Shipping Address</h6>
            </div>
            <div className="form-line">
              <div className="input-wrapper">
                  <label htmlFor="" className='label'>Country :</label>
                  <input 
                    type="text" 
                    className='input' 
                    placeholder='Ex: USA...' 
                    required 
                    value={orderData.shippingAddress.country}
                    onChange={(e)=>{
                      setOrderData({
                        ...orderData, 
                        shippingAddress: {
                          country:e.target.value, 
                          city:orderData.shippingAddress.city, 
                          zip:orderData.shippingAddress.zip,
                          street:orderData.shippingAddress.street, 
                          houseNumber:orderData.shippingAddress.houseNumber
                        }
                      })
                    }}
                  />
              </div>
              <div className="input-wrapper">
                  <label htmlFor="" className='label'>City :</label>
                  <input 
                    type="text" 
                    className='input' 
                    placeholder='Ex: Cityville...' 
                    required 
                    value={orderData.shippingAddress.city}
                    onChange={(e)=>{
                      setOrderData({
                        ...orderData, 
                        shippingAddress: {
                          city:e.target.value, 
                          country:orderData.shippingAddress.country, 
                          zip:orderData.shippingAddress.zip,
                          street:orderData.shippingAddress.street, 
                          houseNumber:orderData.shippingAddress.houseNumber
                        }
                      })
                    }}
                  />
              </div>
            </div>
            <div className="form-line">
              <div className="input-wrapper">
                  <label htmlFor="" className='label'>Street :</label>
                  <input 
                    type="text" 
                    className='input' 
                    placeholder='Ex: 123 Main Street Apartment 4B...' 
                    required 
                    value={orderData.shippingAddress.street}
                    onChange={(e)=>{
                      setOrderData({
                        ...orderData, 
                        shippingAddress: {
                          street:e.target.value, 
                          country:orderData.shippingAddress.country, 
                          zip:orderData.shippingAddress.zip,
                          city:orderData.shippingAddress.city, 
                          houseNumber:orderData.shippingAddress.houseNumber
                        }
                      })
                    }}
                  />
              </div>
              <div className="input-wrapper">
                  <label htmlFor="" className='label'>Zip code :</label>
                  <input 
                    type="text" 
                    className='input' 
                    placeholder='Ex: 50400...' 
                    required 
                    value={orderData.shippingAddress.zip}
                    onChange={(e)=>{
                      setOrderData({
                        ...orderData, 
                        shippingAddress: {
                          zip:e.target.value, 
                          country:orderData.shippingAddress.country, 
                          street:orderData.shippingAddress.street,
                          city:orderData.shippingAddress.city, 
                          houseNumber:orderData.shippingAddress.houseNumber
                        }
                      })
                    }}
                  />
              </div>
              <div className="input-wrapper">
                  <label htmlFor="" className='label'>House Number :</label>
                  <input 
                    type="text" 
                    className='input' 
                    placeholder='Ex: 365...' 
                    required 
                    value={orderData.shippingAddress.houseNumber}
                    onChange={(e)=>{
                      setOrderData({
                        ...orderData, 
                        shippingAddress: {
                          houseNumber:e.target.value, 
                          country:orderData.shippingAddress.country, 
                          zip:orderData.shippingAddress.zip,
                          city:orderData.shippingAddress.city, 
                          street:orderData.shippingAddress.street
                        }
                      })
                    }}
                  />
              </div>
            </div>
          </div>
        </form>
        : null
      }
      <form className='form form-type-2 bg-white shadow-5 mb1'>
        <div className="form-body">
          <div className="form-line">
            <h6>products</h6>   
          </div>
          <div className="form-line">
            <SelectMultiProducts setSelectedProduct={setSelectedProduct} />
          </div>
          <div className="form-line">
            {
              products.length > 0 ?
              <table className="table-list-body">
                <thead>
                  <tr>
                    <th><p>Name</p></th>
                    <th> <p>quantity</p> </th>  
                    <th> <p>variants</p> </th>
                    <th> <p>Price</p> </th>
                    <th> <p>Total</p> </th>
                    <th> <p></p> </th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    products.length > 0 ? 
                    <>
                    {
                    products.map((p, index)=>{
                      return(
                        <tr key={index}>
                          <td><p>{`${p.label}`}</p></td>
                          <td> 
                            <div className='quantity-input'>
                              <button type='button' onClick={()=>decrementQuantity(index)}>-</button>
                              <div className='value-body'>{p.quantity}</div>
                              <button type='button' onClick={()=>incrementQuantity(index)}>+</button>
                            </div> 
                          </td>  
                          <td> 
                            <div>
                              {
                                p.variants.length > 0 ?
                                <>
                                  {
                                    p.variants.map((variant, varI)=>{
                                      return(
                                        <div key={varI} className='flex-c-jb intable-var'>
                                          <p className='intable-var-title'>{variant.name} :</p>
                                          <select className='intable-var-select' name="" id="" onChange={(e)=>{selectOption(variant, e.target.value, index)}}>
                                            <option value="">--</option>
                                            <>
                                              {
                                                variant.options.map((option, optI)=>{
                                                  if (option.available) {
                                                    return <option key={optI} value={optI}>{option.value} {option.priceDef > 0 ? `+${option.priceDef}$` : ''}</option>  
                                                  }
                                                })
                                              }
                                            </> 
                                          </select>
                                        </div>
                                      )
                                    })
                                  }
                                </> :
                                <p>No Variants</p>
                              }
                            </div> 
                          </td>
                          <td> <p>{p.itemPrice} $</p> </td> 
                          <td> <p>{(p.itemPrice + p.totalPriceDef) * p.quantity} $</p> </td>  
                          <td> 
                            <div className="actions-cell">
                              <button className='action btn-round' type="button" onClick={()=>{removeProduct(index)}} ><FiTrash/></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                    }
                    </>
                    : null
                  }
                </tbody>
                {products.length > 0  ? <tfoot>
                  <tr>
                    <td colSpan={4}><h6>Total Price</h6></td>
                    <td colSpan={2}><h6>{totalOrderPrice} $</h6></td>
                  </tr>
                </tfoot>
                :null}
              </table>
              : null
            } 
          </div>
        </div>
      </form>
      <div className="form-buttons white-bg-section flex-c-jb">
          <div></div>
          <div>
              <button type='submit' className='type-200__button' onClick={(e)=>{handleSaveClick()}}>
                  <MdOutlineSave style={{fontSize:'20px'}} /> 
                  <p>save</p>
              </button>
          </div>
      </div>
    </main>
  )
}

export default CreateOrder