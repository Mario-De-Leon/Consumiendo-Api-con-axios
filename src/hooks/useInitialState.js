import { useState, useEffect } from 'react';
import axios from 'axios';

const useInitialState = (API) => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios(API)
            setProductos(response.data)
        }
        fetchMyAPI()
    }, [])

    return productos;
};

export default useInitialState;


