// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import './cardItem.css'
// import kathmandu from '../../../../photos/kathmandu.jpeg'
// const CardItem01:React.FC = () => {
//   return (
   
   
//             <div className="card1_cnt"  style={{background:`url(${kathmandu})`}}>
//              <NavLink to='/places'>
//              <div className="visit-button">
//              <button>Vist</button>
//              </div>
            
//             </NavLink>
//             </div>
      
   
//   )
// }

// export default CardItem01;
import React from 'react';
import { NavLink } from 'react-router-dom';
import './CardItem01.css';
import kathmandu from '../../../../photos/kathmandu.jpeg';

const CardItem01: React.FC = () => {
  return (
    <div className="card-item" style={{ backgroundImage: `url(${kathmandu})` }}>
      <NavLink to="/places">
        <div className="visit-button">
          <button>Visit</button>
        </div>
      </NavLink>
    </div>
  );
};

export default CardItem01;
