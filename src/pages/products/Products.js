import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import deleteProductService from '../../services/deleteProductService';
import { useAuth } from '../../hooks/useAuth';
 
// components
import PageHeading from '../../components/common/PageHeading';
import SortButton from '../../components/ListingTable/SortButton';
import TableSkeleton from '../../components/ListingTable/TableSkeleton';
import EmptyFetchRes from '../../components/ListingTable/EmptyFetchRes';
import Pagination from '../../components/ListingTable/Pagination';

import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import SelectCategory from '../../components/Product/SelectCategory';
import { AiOutlineSearch } from 'react-icons/ai';
import formatDate from '../../services/formatDate';
 
const Products = () => {
  const [productsData, setProductsData] = useState([]); // data
  const [categoriesData, setCategoriesData] = useState([]); // data
  const [sortConf, setSortConf] = useState({sortField:'createdAt', sortOrder:'desc'});
  const [search, setSearch] =useState('');
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] =useState(1);
  const [pageSize, setPageSize] =useState(12);
  const [totalPages, setTotalPages] = useState();
  const [productsCount, setProductsCount] = useState();
  const [isFetching, setIsFetching] = useState(false)

  const [serachValue]=useDebounce(search, 500) 
  const navigate = useNavigate();
  const {user} = useAuth()


  const handleDeleteClick = async(product, index)=>{
    confirmAlert(
      {
        title: 'Delete product',
        message: `Are you sure you wanna delete this product (${product.title})`,
        buttons: [
          {
            label: 'Delete',
            onClick: async() => 
            {
              const res = await deleteProductService(product, user)
              if(res.ok){
                const updatedState = [...productsData];
                updatedState.splice(index, 1)
                setProductsData(updatedState);
              }
            }
          },
          {
            label: 'Cancel',
            onClick: () => {return}
          }
        ]
      }
    )
  };

  const fetchProducts = async()=>{
    try{
        setIsFetching(true)
        const res = await fetch(`http://localhost:4000/api/product?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sortConf.sortField}:${sortConf.sortOrder}&category=${filterCategory}`)
        const response = await res.json();
        if(res.ok){
          const {products, totalPages, totalProducts} = response;
          setProductsData(products);
          setTotalPages(totalPages);
          setProductsCount(totalProducts);
        }
        else{
          toast.error(`${response.message}`)
        }
        setIsFetching(false)
    }catch(err){
        console.log(err);
    } 
  }

  useEffect(()=>{
    fetchProducts()
  },[serachValue, sortConf, page, filterCategory])

  return (
    <div className='page products-page'>
      <div className="table-list-wrapper">
        <div className="table-list-header">
          <PageHeading title={`products ${productsCount ? `(${productsCount})` : ''} `} />
          <div className="tlh--right">
            <SelectCategory setFilterCategory={setFilterCategory} />
            <form className="tlh-right--elem search-filter">
                <input className='search-field' type="text" placeholder='Search For Product' onChange={(e)=>setSearch(e.target.value)}/>
                <button type="button" className='search-btn btn'>
                    <AiOutlineSearch />
                </button>
            </form>
            <button type='button' className="tlh-right--elem nav-link" onClick={()=>navigate('./create')}>
              + new product
            </button>
          </div>
        </div>
        <table className="table-list-body">
            <thead>
              <tr>
                <th></th>
                <th><SortButton title='name' value='title'  setSortConf={setSortConf} sortConf={sortConf} /></th>
                <th> <p>category</p> </th>
                <th> <SortButton title='price' value='price'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                <th> <SortButton title='orders' value='ordered'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                <th> <SortButton title='date' value='createdAt'  setSortConf={setSortConf} sortConf={sortConf} /> </th>
                <th> <p>actions</p> </th>
              </tr>
            </thead>
            <tbody>
              {
                isFetching ?
                <TableSkeleton lines={5} rows={7} />
                :
                (productsData && productsData.length > 0) ?
                    productsData.map((product, index)=>{
                      return(
                        <tr key={index}>
                          <td>{<img className='image-as-icon' src={product.images[0]?.url} alt="" />} </td>
                          <td>{product.title} </td>
                          <td>{product.category? product.category.title : ''} </td>
                          <td>{product.sellPrice} Dhs</td>
                          <td>{product.ordered}</td>
                          <td>{formatDate(product.createdAt)}</td>
                          <td>
                            <div className="actions-cell">
                              <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${product._id}/edit`)} ><FiEdit3/></button>
                              <button className='action btn-round edit' type="button" onClick={()=>navigate(`./${product._id}/details`)} ><FiEye/></button>
                              <button className='action btn-round delete' type="button" onClick={()=>handleDeleteClick(product,index)}><FiTrash2/></button>
                            </div>
                          </td>
                        </tr>
                      )
                  })
                :null   
              }
            </tbody>
            {!isFetching ? <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="list-footer">
                  {(productsData.length <= 0 )?
                    <EmptyFetchRes text='no product found' />
                  : (totalPages > 1) ? <Pagination totalPages={totalPages} setPage={setPage} page={page} /> : null }
                </div>
                
              </td>
            </tr>
            </tfoot>
            :null}
        </table>

      </div>
    </div>
  )
}

export default Products