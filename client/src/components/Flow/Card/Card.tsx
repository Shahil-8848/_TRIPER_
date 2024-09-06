import React from 'react'
import './Card.css'

import CardItem from './cardItem01/CardItem01'
const Card :React.FC= () => {
  return (
    <div className='card-cnt'>

        <div className="card-box">
            <div className='card-grid'>
                 <div className="card1">
                 <CardItem></CardItem>
                 </div>
                
               
                <div className="card2">
                    <div className="card2-box"> 
                    <div className="card2_1">Place 2</div>
                    <div className="card2_2">place 3</div>
                    </div>
                   
                </div>
                <div className="card3">Place 4</div>
                <div className="card4">
                    <div className="card4-box">
                    <div className="card4_1">Place 5</div>
                    <div className="card4_2">Place 6</div>
                    </div>
                   
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Card
