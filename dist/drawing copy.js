class Drawing {
  constructor() {
    this.updateSettings = settings => {
      this.state.settings = { ...this.state.settings,
        ...settings
      };
      const {
        canvas
      } = this.state;
    };

    this.getCanvasCoordinates = event => {
      const {
        canvas
      } = this.state;
      var x = event.clientX - canvas.getBoundingClientRect().left;
      var y = event.clientY - canvas.getBoundingClientRect().top; //return object where x is x and y is y

      return {
        x: x,
        y: y
      };
    };

    this.getPosition = mouseEvent => {
      const {
        canvas
      } = this.state;
      var rect = canvas.getBoundingClientRect();
      let factorX = rect.width / canvas.width;
      let factorY = rect.height / canvas.height;
      return {
        x: (mouseEvent.clientX - rect.left) / factorX,
        y: (mouseEvent.clientY - rect.top) / factorY
      };
    };

    this.updatesShapesArr = () => {
      let arr = [...this.state.shapes];
      arr.push(this.state.currentShape);
      this.state.shapes = arr;
      this.state.currentShape = null;
    };

    this.eraseCanvas = () => {
      const {
        canvas
      } = this.state;
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (this.onClear) {
        this.onClear();
      }
    };

    this.clearSelectedShape = () => {
      const {
        canvas
      } = this.state;
      let context = canvas.getContext('2d'); // context.clearRect(0, 0, WIDTH, HEIGHT);
    };

    this.redrawShapeOnMove = () => {
      this.clear();
      const {
        shapes
      } = this.state; // redraw each shape in the shapes[] array

      for (var i = 0; i < shapes.length; i++) {
        // decide if the shape is a rect or circle
        // (it's a rect if it has a width property)
        console.log(shapes[i]);

        if (shapes[i].width) {// rect(shapes[i]);
        } else {// circle(shapes[i]);
          }

        ;
      }
    };

    this.handleMouseMove = e => {
      const {
        canvas,
        shapes
      } = this.state;
      let context = canvas.getContext('2d');
      var position = this.getPosition(e, canvas);
      this.setDragging(position); // tell the browser we're handling this event

      e.preventDefault();
      e.stopPropagation(); // test if mouse is inside any shape(s)
      // and redraw different alpha based on hovering
      // context.clearRect(0,0,cw,ch);
      // console.log('in', position)

      if (context.isPointInStroke(position.x, position.y)) {
        // var mx=position.x;
        // var my=position.y;
        //     for(var i=0;i<shapes.length;i++){
        //         var s=shapes[i];
        //        if(s){
        //            // decide if the shape is a rect or circle               
        //            if(s.type == 'square'){
        //             console.log('in1',s.x)
        //              // test if the mouse is inside this rect
        //              if(mx>s.x && mx<s.x+s.width && my>s.y && my<s.y+s.height){
        //                // if yes, set that rects isDragging=true
        //                // dragok=true;
        //                console.log('in',s.x)
        //                s.isDragging=true;
        //              }
        //            }else if(s.type == 'circle'){
        //              var dx=s.x-mx;
        //              var dy=s.y-my;
        //              // test if the mouse is inside this circle
        //              if(dx*dx+dy*dy<s.r*s.r){
        //                // dragok=true;
        //                s.isDragging=true;
        //              }
        //            }
        //        }
        //     }
        // context.globalAlpha=1.00;
        document.body.style.cursor = 'pointer';
      } else {
        // context.globalAlpha=0.25;
        document.body.style.cursor = 'grab';
      } // context.fill();

    };

    this.setDragging = (x, y) => {
      const {
        shapes
      } = this.state;

      for (var i = 0; i < shapes.length; i++) {
        var item = shapes[i]; // if x/y hit this item, set it’s isDragging flag

        if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
          item.isDragging = true;
        }
      }
    };

    this.handleMouseDown = mouseEvent => {
      const {
        canvas
      } = this.state;
      let context = canvas.getContext('2d');
      var position = this.getPosition(mouseEvent, canvas); // context.moveTo(position.X, position.Y);

      context.beginPath();
      this.state.dragStartLocation = position; // attach event handlers

      canvas.addEventListener('mousemove', this.drawShape);
      canvas.addEventListener('mouseup', this.finishDrawing);
      canvas.addEventListener('mouseout', this.finishDrawing);
    };

    this.drawShape = mouseEvent => {
      const {
        canvas,
        settings
      } = this.state;
      const {
        fillBox,
        shape,
        xor,
        lineWidth,
        fillColor,
        polygonSides,
        polygonAngle,
        lineCap
      } = settings;
      let context = canvas.getContext('2d');
      var position = this.getPosition(mouseEvent, canvas);

      if (!shape) {
        return;
      }

      if (lineWidth) {
        context.lineWidth = lineWidth;
      }

      if (fillColor) {
        context.strokeStyle = fillColor;
      }

      if (lineCap) {
        context.lineCap = lineCap;
      }

      if (shape == 'freehand') {
        this.drawLine1(position);
      }

      if (shape == 'line') {
        this.drawLine1(position);
      }

      if (shape == 'circle') {
        this.drawCircle1(position);
      }

      if (shape == 'rect') {
        this.drawRect1(position);
      }
    };

    this.drawLine1 = position => {
      const {
        canvas,
        dragStartLocation
      } = this.state;
      let context = canvas.getContext('2d');
      context.lineTo(position.x, position.y);
      context.stroke();
      this.state.currentShape = {
        type: 'line',
        start: {
          x: dragStartLocation.x,
          y: dragStartLocation.y
        },
        end: {
          x: position.x,
          y: position.y,
          isDragging: false
        }
      };
    };

    this.drawCircle1 = position => {
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      var radius = Math.sqrt(Math.pow(dragStartLocation.x - position.x, 2) + Math.pow(dragStartLocation.y - position.y, 2));
      context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI); // context.fill();

      context.stroke();
      this.state.currentShape = {
        type: 'circle',
        x: dragStartLocation.x,
        y: dragStartLocation.y,
        radius: radius,
        sAngle: 0,
        eAngle: 2 * Math.PI,
        isDragging: false
      };
    };

    this.drawRect1 = position => {
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      var w = position.x - dragStartLocation.x;
      var h = position.y - dragStartLocation.y;
      context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
      context.stroke();
      this.state.currentShape = {
        type: 'square',
        x: dragStartLocation.x,
        y: dragStartLocation.y,
        width: w,
        height: h,
        isDragging: false
      };
    };

    this.finishDrawing = mouseEvent => {
      const {
        canvas,
        shapes
      } = this.state;
      let context = canvas.getContext('2d'); // draw the line to the finishing coordinates

      this.drawShape(mouseEvent, canvas, context);
      context.closePath();
      this.updatesShapesArr(); // unbind any events which could draw

      canvas.removeEventListener("mousemove", this.drawShape); // canvas.addEventListener('mousemove', this.handleMouseMove)

      canvas.removeEventListener("mouseup", this.finishDrawing);
      canvas.removeEventListener("mouseout", this.finishDrawing);
    };

    this.addEventListeners = canvas => {
      this.state.canvas = canvas;
      canvas.addEventListener('mousedown', this.handleMouseDown); // canvas.addEventListener('mousedown', this.dragStart, false);
      // canvas.addEventListener('mousemove', this.drag, false);
      // canvas.addEventListener('mouseup', this.dragStop, false);
      // canvas.addEventListener('mouseover', this.mouseHoverHandler, false);
    };

    this.state = {
      canvas: null,
      dragStartLocation: null,
      snapshot: null,
      dragging: false,
      shapes: [],
      currentShape: null,
      is_touch_device: 'ontouchstart' in document.documentElement,
      settings: {
        fillBox: false,
        shape: null,
        //circle, square, line, ellipse, rect, polygon
        xor: false,
        polygonSides: null,
        polygonAngle: null,
        lineCap: 'round',
        textInput: '',
        fillColor: '#0367ff',
        lineWidth: 5,
        lineJoin: 'round'
      }
    };
  }

}

export default Drawing;