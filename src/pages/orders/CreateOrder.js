import React, { useEffect, useState } from 'react'
import SelectUser from '../../components/Orders/SelectUser'
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import PageHeading from '../../components/common/PageHeading';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SelectMultiProducts from '../../components/SelectMultiProducts';

const CreateOrder = () => {
  const {user} = useAuth()

  const [customer, setCustomer]= useState('');
  const [customerData, setCustomerData]= useState('');
  const [isFetchingCustomer, setIsFetchingCustomer]= useState('');

  const [totalPriceDef, setTotalPriceDef] = useState(0)
  const [totalOrderPrice, setTotalOrderPrice] = useState(0)
  const [selectedProducts, setSelectedProducts]= useState([]);
  const [isFetchingProducts, setIsFetchingProducts]= useState('');


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

  const incrementQuantity = (index)=>{
    if(selectedProducts[index].quantity < 10 ){
          setSelectedProducts(products => products.map((product, i) => i === index ? {...product, quantity:product.quantity+1} : product));
    }
  }

  const decrementQuantity = (index)=>{
    if(selectedProducts[index].quantity > 1 ){
      setSelectedProducts(products => products.map((product, i) => i === index ? {...product, quantity:product.quantity-1} : product));
    }
  }

  const selectOption = (variant, optI, index)=>{
      const toUpdate = [...selectedProducts[index].itemOptions]
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
      setSelectedProducts(products => products.map((product, i) => i === index ? {...product, itemOptions:toUpdate, totalPriceDef:totalPriceDef} : product));
  }

  useEffect(()=>{
    if (customer) {
      fetchCustomer()
    }
  },[customer])

  // useEffect(()=>{
  //   setTotalPriceDef(0)
  //   for (let index = 0; index < selectedProducts.length; index++) {
  //     const element = selectedProducts[index];
  //     element.itemOptions.forEach(option => {
  //       if (option.priceDef) {
  //         setTotalPriceDef(totalPriceDef => totalPriceDef + option.priceDef) 
  //       }
  //     });
  //   }
  // },[selectedProducts])

  useEffect(()=>{
    console.log(selectedProducts);
    setTotalOrderPrice(0)
    for (let index = 0; index < selectedProducts.length; index++) {
        var productPrice = (selectedProducts[index].itemPrice + selectedProducts[index].totalPriceDef) * selectedProducts[index].quantity 
        setTotalOrderPrice(totalOrderPrice => totalOrderPrice + productPrice);
    }
  },[selectedProducts])


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
      <form className='form form-type-2 bg-white shadow-5 mb1'>
        <div className="form-body">
          <div className="form-line">
            <h6>Shipping Address</h6>
          </div>
          <div className="form-line">
          
          </div>
        </div>
      </form>
      <form className='form form-type-2 bg-white shadow-5 mb1'>
        <div className="form-body">
          <div className="form-line">
            <h6>products</h6>
          </div>
          <div className="form-line">
            <SelectMultiProducts setSelectedProducts={setSelectedProducts} />
          </div>
          <div className="form-line">
            {
              selectedProducts.length > 0 ?
              <table className="table-list-body">
                <thead>
                  <tr>
                    <th><p>Name</p></th>
                    <th> <p>quantity</p> </th>  
                    <th> <p>variants</p> </th>
                    <th> <p>Price</p> </th>
                    <th> <p>Total</p> </th>
                  </tr>
                </thead>
                <tbody>
                  { isFetchingProducts ?
                    <TableSkeleton lines={2} rows={4} />
                    :
                    selectedProducts.length > 0 ? 
                    <>
                    {
                    selectedProducts.map((product, index)=>{
                      return(
                        <tr key={index}>
                          <td><p>{`${product.label}`}</p></td>
                          <td> 
                            <div>
                              <button type='button' onClick={()=>decrementQuantity(index)}>-</button>
                              <div>{product.quantity}</div>
                              <button type='button' onClick={()=>incrementQuantity(index)}>+</button>
                            </div> 
                          </td>  
                          <td> 
                            <div>
                              {
                                product.variants.length > 0 ?
                                <>
                                  {
                                    product.variants.map((variant, varI)=>{
                                      return(
                                        <div key={varI} className='flex-c-jb'>
                                          <p>{variant.name} :</p>
                                          <select name="" id="" onChange={(e)=>{selectOption(variant, e.target.value, index)}}>
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
                                <p>nothing</p>
                              }
                            </div> 
                          </td>
                          <td> <p>{product.itemPrice} $</p> </td> 
                          <td> <p>{(product.itemPrice + product.totalPriceDef) * product.quantity} $</p> </td>  
                        </tr>
                      )
                    })
                    }
                    <tr>
                      <td><h6>Total Price</h6></td>
                      <td><p>{totalOrderPrice}</p></td>
                    </tr>
                    </>
                    : null
                  }
                </tbody>
              </table>
              : null
            } 
          </div>
        </div>
      </form>
    </main>
  )
}

export default CreateOrder