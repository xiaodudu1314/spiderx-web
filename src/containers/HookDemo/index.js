
import React, {useEffect, useState} from 'react';
export default function DataDemo(){
     const [count,setCount] = useState([1,2,3,4,5,])

     useEffect(()=>{
         setCount(count.slice(1,1))
         console.log(count)
     })
    return(
      <div>
          {
              count.map((item,index)=>{
                                   return(
                                       <span>
                                           {item}
                                       </span>
                                   )
                               })
          }
      </div>
    );

}