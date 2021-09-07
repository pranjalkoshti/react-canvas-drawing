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

    this.takeSnapShot = () => {
      const {
        canvas
      } = this.state;
      let context = canvas.getContext('2d');
      this.state.snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    };

    this.restoreSnapShot = () => {
      const {
        canvas,
        snapshot
      } = this.state;
      let context = canvas.getContext('2d');

      if (snapshot) {
        context.putImageData(snapshot, 0, 0);
      }
    };

    this.drawLine = position => {
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      context.beginPath();

      if (settings.lineWidth) {
        context.lineWidth = settings.lineWidth;
      }

      if (settings.fillColor) {
        context.strokeStyle = settings.fillColor;
      }

      context.moveTo(dragStartLocation.x, dragStartLocation.y); //this will be the first point and during mouse up the line will be drawn

      context.lineTo(position.x, position.y); //current position of x and y during mouseMove event

      context.stroke(); // The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods. So Cool!
      // context.setTransform(1,0,0,1,0,0);
    };

    this.drawCircle = position => {
      //takes position during mouse up
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      var radius = Math.sqrt(Math.pow(dragStartLocation.x - position.x, 2) + Math.pow(dragStartLocation.y - position.y, 2));
      context.beginPath();

      if (settings.lineWidth) {
        context.lineWidth = settings.lineWidth;
      }

      if (settings.fillColor) {
        context.strokeStyle = settings.fillColor;
      }

      context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI); // context.fill();

      context.stroke();
    };

    this.drawRect = position => {
      const {
        canvas,
        dragStartLocation,
        settings
      } = this.state;
      let context = canvas.getContext('2d');
      var w = position.x - dragStartLocation.x;
      var h = position.y - dragStartLocation.y;
      context.beginPath();

      if (settings.lineWidth) {
        context.lineWidth = settings.lineWidth;
      }

      if (settings.fillColor) {
        context.strokeStyle = settings.fillColor;
      }

      let p1 = dragStartLocation;
      let p2 = {
        x: position.x - h,
        y: dragStartLocation.x + w
      };
      let p3 = position;
      let p4 = {
        x: position.x - w,
        y: dragStartLocation.y - h
      };
      context.moveTo(p1.x, p1.y);
      context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
      context.stroke();
    };

    this.draw = position => {
      const {
        canvas,
        settings
      } = this.state;
      const {
        fillBox,
        shape,
        xor,
        polygonSides,
        polygonAngle,
        lineCap
      } = settings;

      if (!shape) {
        return;
      }

      let context = canvas.getContext('2d');
      const {
        dragStartLocation
      } = this.state; //global context

      context.lineCap = lineCap; //we don't need even't handlers because before drawing we are jsut taking a default value

      if (shape === "circle") {
        this.drawCircle(position);
      }

      if (shape === "square") {
        this.drawPolygon(position, 4, Math.PI / 4);
      }

      if (shape === "line") {
        this.drawLine(position);
      }

      if (shape === "ellipse") {
        this.drawEllipse(position);
      }

      if (shape === "rect") {
        this.drawRect(position);
      }

      if (shape === "polygon") {
        this.drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
      }

      if (xor) {
        context.globalCompositeOperation = "xor";
      } else {
        context.globalCompositeOperation = "source-over";
      }

      if (fillBox) {// context.fill();
      } else {
        context.stroke();
      }
    };

    this.dragStart = event => {
      this.state.dragging = true;
      this.state.dragStartLocation = this.getCanvasCoordinates(event);
      this.takeSnapShot();
    };

    this.drag = event => {
      const {
        dragging
      } = this.state;
      var position;
      position = this.getCanvasCoordinates(event);

      if (dragging === true) {
        this.restoreSnapShot(); //generic

        this.draw(position);
      }

      this.handleMouseMove(event, position);
    };

    this.dragStop = event => {
      this.state.dragging = false; //dragging stops here

      this.restoreSnapShot();
      var position = this.getCanvasCoordinates(event); //generic

      this.draw(position);

      if (this.onDrawActionEnd) {
        this.onDrawActionEnd();
      }
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

    this.writeCanvas = () => {
      const {
        canvas,
        textInput
      } = this.state;
      let context = canvas.getContext('2d');
      context.font = '55px Impact';
      context.fillText(textInput, 25, 175);
    };

    this.handleMouseMove = (e, position) => {
      const {
        canvas,
        textInput
      } = this.state;
      let context = canvas.getContext('2d');
      var cw = canvas.width;
      var ch = canvas.height; // tell the browser we're handling this event

      e.preventDefault();
      e.stopPropagation(); // test if mouse is inside any shape(s)
      // and redraw different alpha based on hovering
      // context.clearRect(0,0,cw,ch);
      // for(var i=0;i<shapes.length;i++){
      // defineshape(shapes[i]);

      if (context.isPointInStroke(position.x, position.y)) {
        context.globalAlpha = 1.00;
        document.body.style.cursor = 'pointer';
      } else {
        context.globalAlpha = 0.25;
        document.body.style.cursor = 'grab';
      } // context.fill();
      // }

    };

    this.addEventListeners = canvas => {
      this.state.canvas = canvas;
      canvas.addEventListener('mousedown', this.dragStart, false);
      canvas.addEventListener('mousemove', this.drag, false);
      canvas.addEventListener('mouseup', this.dragStop, false);
      canvas.addEventListener('mouseover', this.mouseHoverHandler, false);
    };

    this.state = {
      canvas: null,
      dragStartLocation: null,
      snapshot: null,
      dragging: false,
      settings: {
        fillBox: false,
        shape: null,
        //circle, square, line, ellipse, rect, polygon
        xor: false,
        polygonSides: null,
        polygonAngle: null,
        lineCap: true,
        textInput: '',
        fillColor: '#0367ff',
        lineWidth: 5
      }
    };
  }

}

export default Drawing;