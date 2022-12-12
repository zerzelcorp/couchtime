
import { useEffect, useState} from "react";
import { getData } from "../helpers/getData";

export const useUrl = (edp,pg,search='') =>{

  const [state, setState] = useState({ res:[], error: null, loading: true });

  const base=`https://api.themoviedb.org/3`

  const url= `${base}${edp}?api_key=${process.env.REACT_APP_API_KEY}&page=${pg}&search=${search}`;

  useEffect(() => {
    try {
      getData(url)
      .then( data => {
          setState({
            res:data.results?data.results:data, 
            error: null,
            loading: false});
      });
    } catch (error) {
      setState({res: null, error: error, loading: false });
    }
  }, [url]);

  return state;
}