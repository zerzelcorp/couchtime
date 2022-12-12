
import { useEffect, useState} from "react";
import { getData } from "../helpers/getData";

export const useUrl = (edp,pg) =>{

  const [state, setState] = useState({ res:[], error: null, loading: true });

  const base=`https://api.themoviedb.org/3`

  const apiKey=`e62c23c6a89f44bb94e028fd9db54528`;

  const url= `${base}${edp}?api_key=${apiKey}&page=${pg}&page_size=18`;

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