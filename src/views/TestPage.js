import { Typography } from '@mui/material'
import React, { useContext,useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useUrl } from '../hooks/useUrl';

const TestPage = () => {

const { movieId } = useParams();
  
const ctx = useContext(AppContext)

const [fav, setFav] = useState(false);

// let url = `${process.env.REACT_APP_URL_BASE}/account/{account_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${ctx.user.id.data.guest_session_id}&account_id=''`;
  
const { res: data, loading, error } = useUrl(`/movie/${movieId}`,1,'');

  const handleFav = () => {
    try {
      if (ctx) {
        console.log("single page", ctx.user.id.data);
        // axios({
        //   method: "post",
        //   url: url,
        //   data: {
        //     media_type:"movie",
        //     media_id: movieId,
        //     favorite: true,
        //   },
        //   headers: { "Content-type": "application/json" },
        // }).then((res) => {
        //   console.log("axios res", res);
        // });
        // axios.post(url,{ media_type:"movie",media_id: movieId,favorite: true,},{ headers: { "Content-type": "application/json"}});
        setFav(!fav);
        console.log("added to list");
      } else {
        setFav(false);
        console.log("no tkn provided");
      }
    } catch (error) {
      console.log("you are not authenticated");
    }
  };
  console.log(data)
  return (
    <div>
      <Typography>Testing page</Typography>
    </div>
  )
}

export default TestPage
