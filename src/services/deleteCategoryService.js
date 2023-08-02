import { toast } from 'react-toastify';

const deleteCategoryService = async(category, user) =>{
    
    const myheaders = new Headers();

    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const categoryId = category._id;

    const toastId = toast.loading(`Deleting Category : (${category.title})`);
    try {
        const res = await fetch(`http://localhost:4000/api/category/${categoryId}`, {
            method:"DELETE",
            headers:myheaders,
        })
        const response = await res.json();
        if(res.ok){
            toast.update(toastId, {render: "Category deleted Succefully", type: "success", isLoading: false, autoClose:5000});
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default deleteCategoryService;