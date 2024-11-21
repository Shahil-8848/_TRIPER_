import {useState} from 'react'

 const  Form:React.FC=()=>{
     const [form    , setForm    ] = useState()
    return(
        <div>
           <h2>{form}</h2>

        </div>
    )
}

export default Form;