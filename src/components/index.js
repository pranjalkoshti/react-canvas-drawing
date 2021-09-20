import React,  { useState, useRef, useEffect } from "react";
import Drawing from './drawing';



export const ReactCanvas = (props)=>{
  const canvas = useRef(null);

  const [DrawingController, setDrawingController] = useState(new Drawing())

  useEffect(() => {
    DrawingController.updateSettings(props.settings)
  }, [props.settings])

  useEffect(() => {
    if(props.clearFlag == true){
      DrawingController.eraseCanvas()
    }
  }, [props.clearFlag])

  useEffect(() => {
    DrawingController.addEventListeners(canvas.current)
  }, [])



  if(DrawingController && props.onDrawActionEnd){
    DrawingController.onDrawActionEnd = props.onDrawActionEnd
  }
  if(DrawingController && props.onClear){
    DrawingController.onClear = props.onClear;
  }


  return(
 
      <canvas ref={canvas} id={props.id ? props.id : "react-canvas"} width={props.width ? props.width : 800} height={props.height ? props.height : 1200} style={{...props.canvasStyle}}/>
   
  )
}

export class Canvas {
  constructor(data){
    this.DrawingController = new Drawing()
    if(this.DrawingController && data.onDrawActionEnd){
      this.DrawingController.onDrawActionEnd = data.onDrawActionEnd
    }
    if(this.DrawingController && data.onClear){
      this.DrawingController.onClear = data.onClear;
    }
    this.DrawingController.addEventListeners(data.canvas)
  }

  updateCanvas = (canvas)=>{
    this.DrawingController.addEventListeners(canvas)
  }

  clearCanvas = () =>{
    this.DrawingController.eraseCanvas()
  }

  settingsListener=(settings) =>{
    this.DrawingController.updateSettings(settings)
  }

}


