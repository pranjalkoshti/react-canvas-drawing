import React, { useState, useRef, useEffect } from "react";
import Drawing from './drawing';

const Canvas = props => {
  // const canvas = useRef(null);
  const [DrawingController, setDrawingController] = useState(new Drawing());
  useEffect(() => {
    DrawingController.updateSettings(props.settings);
  }, [props.settings]);
  useEffect(() => {
    if (props.clearFlag == true) {
      DrawingController.eraseCanvas();
    }
  }, [props.clearFlag]);
  useEffect(() => {
    DrawingController.addEventListeners(canvas.current);
  }, []);

  if (DrawingController && props.onDrawActionEnd) {
    DrawingController.onDrawActionEnd = props.onDrawActionEnd;
  }

  if (DrawingController && props.onClear) {
    DrawingController.onClear = props.onClear;
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
    id: "react-canvas",
    width: props.width,
    height: props.height,
    style: { ...props.canvasStyle
    }
  }));
};

export default Canvas;