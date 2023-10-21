import { toast } from 'react-toastify';
import BASE_URL from '../APIurl';


const createProductService = async(data, user) =>{
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
    }

    formData.append('title', data.title);
    formData.append('slugTitle', data.slugTitle);
    formData.append('category', data.category);
    formData.append('subcategory', data.subcategory);
    formData.append('miniDescription', data.miniDescription);
    formData.append('description', data.description);
    formData.append('sellPrice', data.sellPrice);
    formData.append('comparePrice', data.comparePrice);
    formData.append('costPrice', data.costPrice);
    const variants = data.variants
    formData.append('variants', JSON.stringify(variants)); 

    const toastId = toast.loading(`Creating Product : (${data.title})`);
    try {
        const res = await fetch(`${BASE_URL}api/product/add`, {
            method:"POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body:formData
        })
        const response = await res.json();

        if(res.ok){
            toast.update(toastId, {render: "product created Successfully", type: "success", isLoading: false, autoClose:5000});
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default createProductService;