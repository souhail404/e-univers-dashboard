
const fetchService = async(link, dispatch, state) =>{
    try {
        const response = await fetch(`${link}`)

        const data = await response.json()
        
        dispatch(data)
        state(false)
        return data

    } catch (error) {
        console.log(error);
        return error
    }
}

export default fetchService;