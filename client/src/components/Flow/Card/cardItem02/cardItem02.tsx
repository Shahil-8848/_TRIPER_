import React from 'react'
import { NavLink } from 'react-router-dom'
const cardItem:React.FC = () => {
  return (
    <div>
       <NavLink to='/places'>
            <div className="card1" ><>here</>Place 1</div>
         </NavLink>
    </div>
  )
}

export default cardItem
