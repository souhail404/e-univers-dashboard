
const fetchService = async(link, dispatch, setLoading) =>{
    try {
        const response = await fetch(`${link}`)

        const data = await response.json()
        
        dispatch(data)
        setLoading(false)
        return data

    } catch (error) {
        console.log(error);
        return error
    }
}

export default fetchService;