import React,  { useEffect, useRef, useState } from "react";
import { ReactCanvas, Canvas } from './components';

function App(props){
    const canvas = useRef(null);
    const [settings, setsettings] = useState({
        shape: 'line', // line, circle, rect
        fillColor: '#4c5685',
        lineWidth: 5,
        canvasFillColor:'#fff'
    });
    const [clearFlag, setclearFlag] = useState(false)
    const [canvasInstance, setcanvasInstance] = useState(false)


    useEffect(() => {
        let canvasObj = new Canvas({
            canvas: canvas.current,
            onDrawActionEnd: onDrawActionEnd,
            onClear: onClear
        })
        setcanvasInstance(canvasObj)
    }, [])


    const clearCanvas = ()=>{
        canvasInstance.clearCanvas()
    }

    const onDrawActionEnd = () =>{
        setsettings(obj=>{
            return {...obj, shape: null}
        })
    }

    const onClear = () =>{
        setclearFlag(false)
    }

    useEffect(() => {
        if(canvasInstance){
            canvasInstance.settingsListener(settings)
        }
    }, [settings])

    return (
        <>
        <select onChange={(e)=>{
            setsettings(obj=>{
                return {...obj, shape: e.target.value}
            })
          
        }}>
            <option>line</option>
            {/* <option>square</option> */}
            <option>circle</option>
            <option>rect</option>

        </select>

        <input id='fillColor' type='color' step='1' 
            value={settings.fillColor} 
            onChange={(e)=>{
                setsettings(obj=>{
                    return {...obj, fillColor: e.target.value}
                })
            }}></input>

        <input type="range" min="1" max="100" value={settings.lineWidth} 
            class="slider" 
            id="myRange"
          onChange={(e)=>{
            setsettings(obj=>{
                return {...obj, lineWidth: e.target.value}
            })
        }}/>

        <button onClick={()=>{
            setclearFlag(true)
            clearCanvas()
        }}>Clear</button>

        <ReactCanvas 
            width={800} 
            height={1200} 
            canvasStyle={{border:'1px solid grey'}} 
            settings={{...settings}}
            onDrawActionEnd={onDrawActionEnd}
            clearFlag={clearFlag}
            onClear={onClear}
            id={"react-canvas-1"}
        />
    <div>
        <canvas ref={canvas} id="react-canvas" width={500} height={800} style={{border:'1px solid grey'}}/>
    </div>
        </>
    )
}
export default App;