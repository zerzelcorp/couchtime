
import { useEffect, useState} from "react";
import { getData } from "../helpers/getData";

export const useUrl = (edp,pg,q) =>{

  const [state, setState] = useState({ res:[], error: null, loading: true });

  const base=`https://api.themoviedb.org/3`

  const url= `${process.env.REACT_APP_URL_BASE}${edp}?api_key=${process.env.REACT_APP_API_KEY}&page=${pg}&query=${q}`;

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