import { toast } from 'react-toastify';

const editProductService = async(data, user, productId) =>{
    const formData = new FormData();
    const existingImages = [];
    for (let i = 0; i < data.images.length; i++) {
        if(data.images[i].isSaved===true){
            existingImages.push({url:data.images[i].url, publicId:data.images[i].publicId})
        }
        else if(data.images[i].isSaved===false){
            formData.append('images', data.images[i].file);
            existingImages.push({url:i})
        }
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
    formData.append('existingImages', JSON.stringify(existingImages)); 
    formData.append('deletedImages', JSON.stringify(data.deletedImages) );
    const variants = data.variants
    formData.append('variants', JSON.stringify(variants)); 

    const toastId = toast.loading(`Updating Product : (${data.title})`);
    try {
        const res = await fetch(`http://localhost:4000/api/product/${productId}`, {
            method:"PUT",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body:formData
        })
        const response = await res.json();
        if(res.ok){
            toast.update(toastId, {render: "product updated Successfully", type: "success", isLoading: false, autoClose:5000});
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default editProductService;