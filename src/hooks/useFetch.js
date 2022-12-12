import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { getData } from "../helpers/getData";

export const useFetch = (endpoint) =>{
  
const urlconstruct =`https://api.themoviedb.org/3/${endpoint}api_key=e62c23c6a89f44bb94e028fd9db54528`;

console.log(urlconstruct)

  const isMounted = useRef(true);

  const [state, setState] = useState({ res:[], error: null, loading: true });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    try {
      getData(urlconstruct)
      .then( data => {
        if (isMounted.current) {
          setState({res:data, error: null, loading: false });
        }
      });
    } catch (error) {
      setState({res: null, error: error, loading: false });
    }
  }, [urlconstruct]);

  return state;
}