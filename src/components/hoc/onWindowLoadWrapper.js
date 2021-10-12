import React, { useState, useEffect, useContext } from 'react';
import Observer from './observer';
// import { WindowLoadingContext } from '../context/windowLoadingContext';

const OnWindowLoadWrapper = (props) =>{

    // const WindowLoadingContextComp = useContext(WindowLoadingContext)
    
    const [contentLoading, setcontentLoading] = useState(true)
    const [observerInstance, setobserverInstance] = useState(new Observer())

    useEffect(() => {
        if(document.readyState == 'complete'){
            setcontentLoading(false)
        }
    }, [])

    const listenWindowLoadExternal = () =>{
        setcontentLoading(false)
    }

    // useEffect(() => {
    //     if(WindowLoadingContextComp){
    //         WindowLoadingContextComp.updateContentLoading(contentLoading)
    //     }
    // }, [contentLoading])

    observerInstance.listenWindowLoadExternal = listenWindowLoadExternal;

    return (
        <div>
            {
                contentLoading == true ? <div style={{padding:'20px', height:'200px'}}><p>Loading...</p></div> : props.render()
            }
        </div>
    )
}

export default OnWindowLoadWrapper;