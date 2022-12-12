import {useState} from 'react'

export const useCounter = (initVal=1) => {

const [count, setCount] = useState(initVal)

const incCount=()=>{
    setCount(count + 1)
window.scrollTo({
    top:0,
    behavior:"smooth"
})
}

const pageChange = (event, value) => {
    setCount(value);
  }

const decCount= ()=>{
if(count > 1 ){
    setCount(count - 1)
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}
}

  return {count,incCount,decCount,pageChange}
}
