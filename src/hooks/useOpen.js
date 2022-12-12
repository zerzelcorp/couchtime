import { useState } from 'react'

const useOpen = (init=false) => {
const [open, setOpen] = useState(init)

const handleOpen = () => setOpen(true)
const handleClose=  ()=>setOpen(init)

  return {open,handleOpen,handleClose}

}

export default useOpen
