import { toast } from 'react-toastify';

const createProductService = async(data, user) =>{
    const formData = new FormData();
    // console.log(data.images);
    for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
    }

    formData.append('title', data.title);
    formData.append('slugTitle', data.slug_title);
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
        const res = await fetch(`http://localhost:4000/api/product/add`, {
            method:"POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body:formData
        })
        const response = await res.json();
        console.log(response);
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