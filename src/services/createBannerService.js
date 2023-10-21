import { toast } from 'react-toastify';
import BASE_URL from '../APIurl';


const createBannerService = async(data, user) =>{
    const formData = new FormData();

    formData.append('link', data.link); // Assuming your form has an input with name="title"
    formData.append('desktopBanner', data.desktopBanner); // Assuming data.desktopBanner is a file object
    formData.append('mobileBanner', data.mobileBanner); // Assuming data.mobileBanner is a file object
    for (const entry of formData.entries()) {
        console.log('Form Data Entry:', entry[0], entry[1]);
    }

    const toastId = toast.loading(`Adding Banner `);
    try {
        const res = await fetch(`${BASE_URL}api/store/banner/create`, {
            method:"POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body:formData
        })
        const response = await res.json();

        if(res.ok){
            toast.update(toastId, {render: "Banner Added Successfully", type: "success", isLoading: false, autoClose:5000});
        }
        else{
            toast.update(toastId, {render: `${response.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        return res
    } catch (error) {
      console.log(error);
    }

}

export default createBannerService;