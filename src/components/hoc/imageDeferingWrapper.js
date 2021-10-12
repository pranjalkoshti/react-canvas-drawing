import { useRef, useEffect } from 'react'

const ImageDeferingWrapper = (props) =>{
    const elemRef = useRef(null);
    
    useEffect(() => {
        if(props.flag == true){
            if(props.delay){
                setTimeout(() => {
                  elemRef.current.setAttribute('src', elemRef.current.getAttribute('data-src'))
                }, props.delay);
            }else{
                elemRef.current.setAttribute('src', elemRef.current.getAttribute('data-src'))
            }
        }
    }, [props.flag])

    return(
        props.render(elemRef)
    )
}

export default ImageDeferingWrapper;