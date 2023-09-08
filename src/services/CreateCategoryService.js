import { toast } from 'react-toastify';

const createCategoryService = async(category, user) =>{
    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const id = toast.loading("Saving new category...");
    const data = JSON.stringify({...category});
    try{
      const res = await fetch('http://localhost:4000/api/category/add', {
        method:"POST",
        headers:myheaders,
        body:data
      })
      const response = await res.json();
      
      if(res.ok){
        toast.update(id, {render: "Category Saved Succefully", type: "success", isLoading: false, autoClose:8000});
        var newCategoryId = response.category._id;
      }
      else{
        toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:8000});
      }
      return {res , newCategoryId}
    }catch(err){
      console.log(err);
    }
}

export default createCategoryService;