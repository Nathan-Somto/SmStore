import axios from 'axios';
import { useEffect, useState } from 'react'
type states<T> = {
    data:T | null,
    loading:boolean,
    error:boolean
}
/**
 * 
 * @param url {string} the url that you wish to get a resource from.
 * @returns 
 */
function useAxios<T>(url : string) {
    const [states,setStates]= useState<states<T>>({
        data:null,
        loading:false,
        error:false
    });
    axios.defaults.baseURL = 'https://fakestoreapi.com';
    async function getData(){
        setStates(prevStates => ({ ...prevStates, loading: true }));
        try{
            const response = await axios.get(url);
            setStates(prevStates => ({ ...prevStates, data: response.data }));
        }
        catch(err){
            setStates(prevStates => ({ ...prevStates, error: true }));
        }
        finally{
            setStates(prevStates => ({ ...prevStates, loading: false }));
        }
    }
    useEffect(()=>{
        getData();
    },[url])
  return states;
}

export default useAxios;