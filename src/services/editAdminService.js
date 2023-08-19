import { toast } from 'react-toastify';

const editAdminService = async(data, user, adminId) =>{
    const myheaders = new Headers();

    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    const jsonData = JSON.stringify(data)
    const toastId = toast.loading(`Updating Profile Infos`);
    try {
        const res = await fetch(`http://localhost:4000/api/user/update/${adminId}`, {
            method:"PUT",
            headers:myheaders,
            body:jsonData
        })
        const response = await res.json();
        if(res.ok){
            toast.update(toastId, {render: "Profile Updated Successfully", type: "success", isLoading: false, autoClose:5000});
            
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default editAdminService;