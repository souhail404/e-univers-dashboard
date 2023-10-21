import { toast } from 'react-toastify';
import BASE_URL from '../APIurl';

const deleteUserService = async(customer, user) =>{
    
    const myheaders = new Headers();

    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const customerId = customer._id;

    const toastId = toast.loading(`Deleting user : (${customer.userName})`);
    try {
        const res = await fetch(`${BASE_URL}api/user/${customerId}`, {
            method:"DELETE",
            headers:myheaders,
        })
        const response = await res.json();
        if(res.ok){
            toast.update(toastId, {render: "User deleted Succefully", type: "success", isLoading: false, autoClose:5000});
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default deleteUserService;