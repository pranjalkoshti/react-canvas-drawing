### React Drawing Canvas


You can install the module via npm:

 `npm install react-drawing-canvas --save`


### Usage

There are two ways - Drawing on React Canvas Component and Drawing on Existing Html Canvas by passing a reference  

```
import React,  { useEffect, useRef, useState } from "react";
import { Canvas } from 'react-drawing-canvas';
 
const App = () =>{
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

  return(
    <>
      <select onChange={(e)=>{
            setsettings(obj=>{
                return {...obj, shape: e.target.value}
            })
          
        }}>
            <option>line</option>
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

// Using React Canvas Component----
        <ReactCanvas 
          width={800} 
          height={1200} 
          canvasStyle={{border:'1px solid grey'}} 
          settings={{
            shape: 'line', // line, circle, rect
            fillColor: '#4c5685',
            lineWidth: 5,
            canvasFillColor:'#fff'
          }}
          onDrawActionEnd={onDrawActionEnd}
          clearFlag={clearFlag} //boolean
          onClear={onClear}
      />

// Using HTML Canvas --------
      <canvas ref={canvas} id="react-canvas" width={500} height={800} style={{border:'1px solid grey'}}/>
      </>
    />
  )
}
export default App;
```

### Props

| Name  | Type | Default |
| ------------- | ------------- | ------------- | 
| height  | integer  | undefined |
| width | integer | undefined | 
| canvasStyle | style Object | undefined | 
| settings | Object | undefined | 
| clearFlag | Boolean | false |
| onClear | Function | undefined | 
| id | string | 'react-canvas' |

