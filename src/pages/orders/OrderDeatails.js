import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/common/PageHeading'
import TableSkeleton from '../../components/ListingTable/TableSkeleton'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import formatDate from '../../services/formatDate'

const OrderDeatails = () => {
  const {orderId} = useParams();
  const {user} = useAuth()

  const [isFetching, setIsFetching]= useState(false)
  const [orderData, setOrderData]= useState()
  const [orderItemsData, setOrderItemsData]= useState([])

  const fetchOrder = async()=>{
    try{ 
        setIsFetching(true)
        const res = await fetch(`http://localhost:4000/api/order/one/${orderId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        const response = await res.json();

        if(res.ok){
            const {orderItems, order} = response;
            setOrderData(order);
            setOrderItemsData(orderItems)
        }
        else{
          toast.error(`${response.message}`)
        }
        setIsFetching(false)
    }catch(err){
        console.log(err);
        setIsFetching(false)
    } 
  }

  const changeState = async(state)=>{
    try{ 
        const data= JSON.stringify({orderState:state});
        console.log(data);
        const toastId = toast.loading(`Updating State to (${state}`);
        const res = await fetch(`http://localhost:4000/api/order/update/${orderId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
            body:data,
        })
        const response = await res.json();
        if(res.ok){      
          const {order} = response;
          setOrderData(order);
          toast.update(toastId, {render: "Order State Updated", type: "success", isLoading: false, autoClose:4000});
        }
        else{
          toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:4000});
        }
    }catch(err){
        console.log(err);
    } 
  }

  useEffect(()=>{
    fetchOrder()
  },[])

  return (
    <main className='page order-details-page'>  
      <div className="page-wrapper">
        <div className="page-header">
          <h2>Order Details</h2>
        </div>
        <div className="page-body">
          <section className='white-bg-section flex-c-jb'>
            <div className="section-header">
              <h3>Change State</h3>
            </div>
            {
              orderData ?
              <form action="" className="change-state-form">
                <label className={`order-state-label ${orderData.orderState === 'pending'? 'active':''}`} htmlFor="order-state-pending">Pending</label>
                <input
                  type="radio"
                  name="order-state"
                  id="order-state-pending"
                  value="pending"
                  checked={orderData.orderState === 'pending'}
                  onChange={(e)=>changeState(e.target.value)}
                  hidden
                />

                <label className={`order-state-label ${orderData.orderState === 'processing'? 'active':''}`} htmlFor="order-state-processing">Processing</label>
                <input
                  type="radio"
                  name="order-state"
                  id="order-state-processing"
                  value="processing"
                  checked={orderData.orderState === 'processing'}
                  onChange={(e)=>changeState(e.target.value)}
                  hidden
                />

                <label className={`order-state-label ${orderData.orderState === 'delivered'? 'active':''}`} htmlFor="order-state-delivered">Delivered</label>
                <input
                  type="radio"
                  name="order-state"
                  id="order-state-delivered"
                  value="delivered"
                  checked={orderData.orderState === 'delivered'}
                  onChange={(e)=>changeState(e.target.value)}
                  hidden
                />

                <label className={`order-state-label ${orderData.orderState === 'backorder'? 'active':''}`} htmlFor="order-state-backorder">Backorder</label>
                <input
                  type="radio"
                  name="order-state"
                  id="order-state-backorder"
                  value="backorder"
                  checked={orderData.orderState === 'backorder'}
                  onChange={(e)=>changeState(e.target.value)}
                  hidden
                />
              </form> : null
            }
            
          </section>
          <section className='white-bg-section'>
            <div className="section-header">
              <h3>General infos </h3>
            </div>
            <table className="table-list-body">
              <thead>
                <tr>
                  <th><p>Ordered At</p></th>
                  <th>{orderData ? <p>{orderData.orderState==='backorder' ? `Backorder At`: `Delivered At`}</p>: <p>Delivered At</p>}</th>
                  <th> <p>total</p> </th>  
                  <th> <p>State</p> </th>
                </tr>
              </thead>
              <tbody>
                { isFetching ?
                  <TableSkeleton lines={1} rows={4} />
                  :
                  orderData ? <tr>
                    <td><p>{formatDate(orderData.createdAt)}</p></td>
                    <td><p>
                        {orderData.orderState==='backorder' ? `${ formatDate(orderData.backorderAt) }`: ``} 
                        {orderData.orderState==='delivered' ? `${formatDate(orderData.deliveredAt)}`: ``}
                        {orderData.orderState==='processing' ? `Not Yet`: ``}
                        {orderData.orderState==='pending' ? `Not Yet`: ``}
                      </p></td>
                    <td> <p>{orderData.total} Dhs</p> </td>  
                    <td> <p className={`order-state-view ${orderData.orderState}`}>{orderData.orderState}</p> </td>
                  </tr> : null
                }
              </tbody>
            </table>
          </section>
          <section className='white-bg-section'>
            <div className="section-header">
              <h3>Customer Details </h3>
            </div>
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
                { isFetching ?
                  <TableSkeleton lines={1} rows={4} />
                  :
                  orderData ? 
                  <tr>
                    <td><p>{`${orderData.userId.lastName} ${orderData.userId.firstName}`}</p></td>
                    <td> <p>{`${orderData.userId.email}`}</p> </td>  
                    <td> <p>{`${orderData.userId.mobile}`}</p> </td>
                    <td> 
                      <p>
                        {`
                        ${orderData.shippingAddress.country ? orderData.shippingAddress.country : ''}
                        ${orderData.shippingAddress.city ? orderData.shippingAddress.city : ''}
                        ${orderData.shippingAddress.street ? orderData.shippingAddress.street : ''}
                        ${orderData.shippingAddress.houseNumber ? orderData.shippingAddress.houseNumber : ''}
                        `}
                      </p> 
                    </td>
                  </tr> : null
                }
              </tbody>
            </table>
          </section>
          <section className='white-bg-section'>
            <div className="section-header">
              <h3>Ordred Products </h3>
            </div>
            <table className="table-list-body">
              <thead>
                <tr>
                  <th> <p></p> </th>  
                  <th> <p>Name</p> </th>  
                  <th> <p>Quantity</p> </th>  
                  <th> <p>Options</p> </th>
                  <th> <p>Total price</p> </th>
                </tr>
              </thead>
              <tbody>
                { isFetching ?
                  <TableSkeleton lines={3} rows={5} />
                  :
                  (orderItemsData && orderItemsData.length > 0) ? 
                    orderItemsData.map((item, index)=>{
                        return(
                          <tr key={index}>
                            <td>{<img className='image-as-icon' src={item.itemId.images[0]?.url} alt="" />} </td>
                            <td><p>{`${item.itemName}`}</p></td>
                            <td> <p>{`${item.quantity}`}</p> </td>  
                            <td>
                                { 
                                  (item.itemOptions && item.itemOptions.length > 0) ? 
                                  item.itemOptions.map((opt, i)=>{
                                    return(
                                      <p key={i}> <b>{`${opt.variant}`}</b> :  {`${opt.option}`} </p>
                                    )
                                  })
                                  :null
                                }
                            </td>
                            <td> <p>{`${item.itemTotalPrice}`} Dhs</p> </td>
                          </tr> 
                        )
                    })
                  : null
                }
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  )
}

export default OrderDeatails 