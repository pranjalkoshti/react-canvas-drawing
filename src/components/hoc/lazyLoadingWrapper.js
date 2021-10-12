import React, { useState, useEffect, useRef } from 'react';


import Observer from './observer';

const LazyLoadingWrapper = (props) =>{
    const elemRef = useRef(null);
    const [inViewPort, setinViewPort] = useState(false)
    const [observerInstance, setobserverInstance] = useState(new Observer({element: elemRef.current}))

    const listenWindowLoadExternal = () =>{
        setinViewPort(true)
    }
    // console.log(inViewPort)

    observerInstance.listenWindowLoadExternal = listenWindowLoadExternal;


    return (
        <div>
            {
                inViewPort == false ? <p>Loading</p> : props.render(elemRef)
            }
        </div>
    )
}

export default LazyLoadingWrapper;