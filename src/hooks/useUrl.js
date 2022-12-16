
import { useEffect, useState} from "react";
import { getData } from "../helpers/getData";

export const useUrl = (edp,pg=1,q='',gn='') =>{

  const [state, setState] = useState({ res:[], error: null, loading: true });

  // const url= `${process.env.REACT_APP_URL_BASE}${edp}?api_key=${process.env.REACT_APP_API_KEY}&page=${pg}&query=${q}&with_genres=${gn}`;

  useEffect(() => {
    try {
      getData(edp,pg,q,gn)
      .then( data => {
          setState({
            ...state,
            res:data.results?data.results:data, 
            error: null,
            loading: false});
      });
    } catch (error) {
      setState({res: null, error:`error in useUrl:${error}`, loading: false });
    }
  }, [state]);

  return state;
}