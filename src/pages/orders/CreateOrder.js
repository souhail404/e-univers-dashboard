import React, { useEffect, useState } from 'react'
import SelectUser from '../../components/Orders/SelectUser'
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import PageHeading from '../../components/common/PageHeading';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SelectMultiProducts from '../../components/SelectMultiProducts';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineSave } from 'react-icons/md';

const CreateOrder = () => {
  const {user} = useAuth()

  const [customer, setCustomer]= useState('');
  const [customerData, setCustomerData]= useState('');
  const [isFetchingCustomer, setIsFetchingCustomer]= useState('');

  const [totalPriceDef, setTotalPriceDef] = useState(0)
  const [totalOrderPrice, setTotalOrderPrice] = useState(0)
  const [selectedProduct, setSelectedProduct]= useState();
  const [products, setProducts]= useState([]);
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

  useEffect(()=>{
    
    if (customer) {
      fetchCustomer()
    }
  },[customer])

  useEffect(()=>{
    console.log(customerData);
  },[customerData])
  
  
  useEffect(()=>{
    setTotalOrderPrice(0)
    for (let index = 0; index < products.length; index++) {
        setTotalOrderPrice(totalOrderPrice => totalOrderPrice + ((products[index].itemPrice + products[index].totalPriceDef) * products[index].quantity))
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
                  { isFetchingProducts ?
                    <TableSkeleton lines={2} rows={4} />
                    :
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
              <button type='submit' className='type-200__button' onClick={(e)=>{}}>
                  <MdOutlineSave style={{fontSize:'20px'}} /> 
                  <p>save</p>
              </button>
          </div>
      </div>
    </main>
  )
}

export default CreateOrder