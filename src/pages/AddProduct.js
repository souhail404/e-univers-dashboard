import React, {useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik, useFormikContext} from 'formik'

import {GrFormNextLink} from 'react-icons/gr'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/common/inputs/Input'
import SelectInput from '../components/common/inputs/SelectInput'

const AddProduct = () => {
    const {user} = useAuth();
    const {token} = user;

    const [newProductId, setNewProductId]= useState('')

    const navigate= useNavigate();

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${token}`);

    const addNewProduct = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/api/product/add', {
              method: 'POST',
              headers: myheaders,
              body: data,
            });
        
            const newProduct = await response.json();
            return newProduct;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };
    const onSubmit = async()=>{
        const JSONdata = JSON.stringify(values);

        try {
            const newProduct = await addNewProduct(JSONdata);
            const id = newProduct._id;
            setNewProductId(id);
            navigate(`/product/add-variants/${id}`);
        } catch (error) {
            console.error('Error:', error);
        };
    }

    const formik = useFormik({
        initialValues:{
          title:'',
          mini_description:'',
          stock:'',
          price:'', 
          discount:'',
          category:'',
          subcategory:'',
        },
        onSubmit
    })

    const {values , errors, touched,  handleBlur , handleChange , handleSubmit} = formik;

  return (
    <div className='page add-product-page'>
        <div className="page-route">
            <Link className='route' to='../'>Products</Link> 
            <span className='slash'>/</span>
            <Link className='route'>Add product</Link>
        </div>
        <form action="" className="add-product-form form" onSubmit={handleSubmit}>  
            <div className="form-header">
                <h3>Add product info</h3>
            </div>
            <div className="form-body">
                <div className="form-line">
                    <Input  className=""
                            type="text"
                            label="What is the name of the product you want to add ?"
                            name='title'
                            placeholder="Ex: Iphone 9 ..."
                            value={values.title} 
                            formik={formik}
                    />
                </div>
                <div className="form-line">
                    <Input  className=""
                            type="text"
                            label="Provide a brief and catchy description for the product (max 50 characters)."
                            name="mini_description"
                            placeholder="Ex: Iphone 9 ..."
                            value={values.mini_description} 
                            formik={formik}
                    />
                </div>
                
                <div className="form-line">
                        <Input  label="How many units of this product are currently in stock ?"
                                type="number" 
                                name="stock" 
                                placeholder='Ex: 100' 
                                value={values.stock} 
                                formik={formik}
                        />
                </div>
                
                <div className="form-line">
                        <Input  label="What is the price of the product ?" 
                                type="number" 
                                name="price" 
                                placeholder='Ex: $499.99' 
                                value={values.price} 
                                formik={formik}
                        />
                        <Input label="What is the discount percentage ?"
                               type="number"
                               name="discount"
                               placeholder='Ex: 10%' 
                               value={values.discount}  
                               formik={formik}
                        />
                    <div className="input-wrapper info-giving">
                        <div className="about">The selling price will be</div>
                        <div className="info"> {(values.price && values.discount) ? `${values.price - (values.price * values.discount) / 100}$` : '0$' } </div>
                    </div>

                     
                </div>
                <CatAndSubCatLine formik={formik}/>
            </div>

            <div className="form-actions">
                <div className="act-el">
                    <div className="btn btn-2">
                        <p>go back</p>
                        <div className="icon">
                          
                        </div>
                    </div>
                </div>
                <div className="act-el">
                    <div className="btn" onClick={()=>{onSubmit()}}>
                        <p>next</p>
                        <div className="icon">
                          <GrFormNextLink/>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-error">
            </div>
            
        </form>
    </div>
  )
}

const CatAndSubCatLine = (props)=>{
    const formik = props.formik;
    const { values } = formik;

    const {user} = useAuth();
    const {token} = user;

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${token}`);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/category/', {
            method: 'GET',
            headers: myheaders,
            });

            const categoriesData = await response.json();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error in fetchCategories:', error);
            // Handle the error if needed
        }
        };

        fetchCategories();
    }, []);   

    useEffect(()=>{
        const fetchSubCategories = async () => {
            try {
                if(values.category){
                    const response = await fetch(`http://localhost:4000/api/category/${values.category}/subcategory`, {
                    method: 'GET',
                    headers: myheaders,
                    });
        
                    const categoriesData = await response.json();
                    setSubCategories(categoriesData);
                }
                else{
                    return
                }
                
            } catch (error) {
                console.error('Error in fetchSubCategories:', error);
                // Handle the error if needed
            }
            };
    
        fetchSubCategories();
    },[values.category])

    return(
        <div className="form-line">
            <SelectInput data={categories}
                            label="category"
                            name="category"
                            value={values.category} 
                            formik={formik} />

            <SelectInput data={subCategories} 
                            label="Sub Category"
                            name="subcategory"
                            value={values.subcategory} 
                            formik={formik} />
        </div>
    )
}



export default AddProduct