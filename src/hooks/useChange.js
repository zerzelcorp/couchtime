import React,{useState} from 'react'

const useChange = (initState={}) => {

  const [formval,setForm]=useState(initState)

  const handleNameChange = (e) => {
    e.preventDefault();
    setForm({ ...formval,name: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setForm({ ...formval,password: e.target.value });
  };

  return {handleNameChange,handlePasswordChange}

}


export default useChange
