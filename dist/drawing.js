import Square from './shapes/square';
import Circle from './shapes/circle';
import Line from './shapes/line';

class Drawing {
  constructor() {
    this.cursorInRect = (mouseX, mouseY, rectX, rectY, rectW, rectH) => {
      let xLine = mouseX > rectX && mouseX < rectX + rectW;
      let yLine = mouseY > rectY && mouseY < rectY + rectH;
      return xLine && yLine;
    };

    this.drawInitialCanvas = () => {
      const {
        canvas,
        settings,
        shapes
      } = this.state;
      let context = canvas.getContext('2d');

      if (settings.canvasFillColor) {
        context.fillStyle = settings.canvasFillColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    this.redrawCanvas = () => {
      const {
        canvas,
        settings,
        shapes
      } = this.state;
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (settings.canvasFillColor) {
        context.fillStyle = settings.canvasFillColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      shapes.forEach(e => {
        if (e.instance) {
          e.instance.draw(context);
        }
      });
    };

    this.updateSettings = settings => {
      this.state.settings = { ...this.state.settings,
        ...settings
      };
      const {
        canvas
      } = this.state;
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

      if (this.state.currentShape) {
        arr.push(this.state.currentShape);
        this.state.shapes = arr;
        this.state.currentShape = null;
      }
    };

    this.eraseCanvas = () => {
      const {
        canvas
      } = this.state;
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.state.shapes = [];

      if (this.onClear) {
        this.onClear();
      }
    };

    this.handleMouseMove = e => {
      const {
        canvas,
        shapes
      } = this.state;
      var position = this.getPosition(e, canvas); // tell the browser we're handling this event

      e.preventDefault();
      e.stopPropagation();
      let arr = shapes.map(e => this.cursorInRect(position.x, position.y, e.x, e.y, e.width, e.height));

      if (!arr.every(e => e === false)) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }

      shapes.forEach(e => {
        if (e.selected) {
          e.x = position.x - e.offset.x;
          e.y = position.y - e.offset.y;
        }

        this.cursorInRect(position.x, position.y, e.x, e.y, e.edge, e.edge) ? e.active != true ? e.instance.activate() : e.active = false : e.active = false;
      });
    };

    this.handleMouseDown = mouseEvent => {
      const {
        canvas,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      var position = this.getPosition(mouseEvent, canvas);
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
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      this.redrawCanvas();
      let line = new Line(dragStartLocation, position, settings);
      line.draw(context); // context.closePath();

      this.state.currentShape = {
        type: 'line',
        start: {
          x: dragStartLocation.x,
          y: dragStartLocation.y
        },
        end: {
          x: position.x,
          y: position.y
        },
        isDragging: false,
        instance: line
      };
    };

    this.drawCircle1 = position => {
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      this.redrawCanvas(); // context.moveTo(dragStartLocation.x, dragStartLocation.y);

      var radius = Math.sqrt(Math.pow(dragStartLocation.x - position.x, 2) + Math.pow(dragStartLocation.y - position.y, 2));
      let circle = new Circle(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, settings);
      circle.draw(context); // context.closePath();

      this.state.currentShape = {
        type: 'circle',
        x: dragStartLocation.x,
        y: dragStartLocation.y,
        radius: radius,
        sAngle: 0,
        eAngle: 2 * Math.PI,
        isDragging: false,
        instance: circle
      };
    };

    this.drawRect1 = position => {
      const {
        canvas,
        dragStartLocation,
        settings,
        prevPosition
      } = this.state;
      let context = canvas.getContext('2d');
      this.redrawCanvas(); // context.moveTo(dragStartLocation.x, dragStartLocation.y);

      var w = position.x - dragStartLocation.x;
      var h = position.y - dragStartLocation.y;
      let square = new Square(dragStartLocation.x, dragStartLocation.y, w, h, settings);
      square.draw(context); // context.closePath();

      this.state.currentShape = {
        type: 'square',
        x: dragStartLocation.x,
        y: dragStartLocation.y,
        width: w,
        height: h,
        isDragging: false,
        instance: square
      };
    };

    this.finishDrawing = mouseEvent => {
      this.redrawCanvas();
      const {
        canvas,
        shapes
      } = this.state;
      let context = canvas.getContext('2d'); // draw the line to the finishing coordinates

      this.drawShape(mouseEvent, canvas, context);
      this.updatesShapesArr(); // unbind any events which could draw

      canvas.removeEventListener("mousemove", this.drawShape);
      canvas.addEventListener('mousemove', this.handleMouseMove);
      canvas.removeEventListener("mouseup", this.finishDrawing);
      canvas.removeEventListener("mouseout", this.finishDrawing);
    };

    this.addEventListeners = canvas => {
      this.state.canvas = canvas;
      canvas.addEventListener('mousedown', this.handleMouseDown);
      this.drawInitialCanvas();
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
        shape: 'line',
        //circle, square, line, ellipse, rect, polygon
        xor: false,
        polygonSides: null,
        polygonAngle: null,
        lineCap: 'round',
        textInput: '',
        fillColor: '#4c5685',
        lineWidth: 5,
        lineJoin: 'round',
        canvasFillColor: null
      }
    };
  }

}

export default Drawing;