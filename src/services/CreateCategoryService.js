import { toast } from 'react-toastify';
import BASE_URL from '../APIurl';


const createCategoryService = async(category, user) =>{
    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const id = toast.loading("Saving new category...");
    const data = JSON.stringify({...category});
    var res;
    try{
      res = await fetch(`${BASE_URL}api/category/add`, {
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
      console.log(res);
      return {res , newCategoryId}
    }catch(err){
      console.log(err);
    }
}

export default createCategoryService;