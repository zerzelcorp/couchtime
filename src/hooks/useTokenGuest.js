import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTokenGuest = async (initReq=false) => {
    
  const [token, setToken] = useState({tkn:null,error:null});

  const navigate = useNavigate()
if(initReq){
    try {
      const tknreq = await axios.get(
        `${process.env.REACT_APP_URL_BASE}/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const newtoken = tknreq;
      if (newtoken ) {
        setToken({tkn:newtoken,error:null});
        navigate({ to: "/" });
      } 
    } catch (error) {
         navigate({ to: "/auth" });
        setToken({tkn:null,error:error})
    }
}
  return token
};

export default useTokenGuest;
