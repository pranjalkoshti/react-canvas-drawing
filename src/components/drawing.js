



class Drawing {
    constructor() {
        this.state = {
            canvas: null,
            dragStartLocation: null,
            snapshot: null,
            dragging: false,
            shapes:[],
            currentShape:null,
            is_touch_device : 'ontouchstart' in document.documentElement,
            settings: {
                fillBox: false,
                shape: null, //circle, square, line, ellipse, rect, polygon
                xor: false,
                polygonSides: null,
                polygonAngle: null,
                lineCap: 'round',
                textInput: '',
                fillColor: '#0367ff',
                lineWidth: 5,
                lineJoin: 'round'
            }
        }
    }

    updateSettings = (settings) => {
        this.state.settings = { ...this.state.settings, ...settings }
        const { canvas } = this.state;
    }

    //define mouse coordinates
    getCanvasCoordinates = (event) => {
        const { canvas } = this.state;
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;

        //return object where x is x and y is y
        return { x: x, y: y };
    }

    //get mouse position
    getPosition=(mouseEvent)=> {
        const { canvas } = this.state;
        var rect = canvas.getBoundingClientRect();
        let factorX = rect.width / canvas.width
        let factorY = rect.height / canvas.height
        return {
            x: (mouseEvent.clientX - rect.left) / factorX,
            y: (mouseEvent.clientY - rect.top) / factorY
        };
    }

    // //this avoids dragging the image
    // //The getImageData() method returns an ImageData object that copies the pixel data for the specified rectangle on a canvas.
    // takeSnapShot = () => {
    //     const { canvas } = this.state;
    //     let context = canvas.getContext('2d');
    //     this.state.snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    // }
    // //These must be added to dragStart()
    // restoreSnapShot = () => {
    //     const { canvas, snapshot } = this.state;
    //     let context = canvas.getContext('2d');
    //     if(snapshot){
    //         context.putImageData(snapshot, 0, 0);
    //     }
    // }

    // drawLine = (position) => {
    //     const { canvas, dragStartLocation, settings } = this.state;
    //     let context = canvas.getContext('2d');
    //     context.beginPath();
    //     if (settings.lineWidth) {
    //         context.lineWidth = settings.lineWidth;
    //     }
    //     if (settings.fillColor) {
    //         context.strokeStyle = settings.fillColor;
    //     }
    //     context.moveTo(dragStartLocation.x, dragStartLocation.y);//this will be the first point and during mouse up the line will be drawn
    //     context.lineTo(position.x, position.y); //current position of x and y during mouseMove event
    //     context.stroke(); // The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods. So Cool!

    //     this.state.currentShape = {type:'line', start:{x: dragStartLocation.x, y: dragStartLocation.y}, end: { x: position.x, y: position.y, isDragging: false }}
 
    // }

    // //The arc() method creates an arc/curve (used to create circles, or parts of circles). To create a circles set start angle to 0 and end angle to 2*Math.PI
    // drawCircle = (position) => { //takes position during mouse up
    //     const { canvas, dragStartLocation, settings } = this.state;
    //     let context = canvas.getContext('2d');
    //     var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    //     context.beginPath();
    //     if (settings.lineWidth) {
    //         context.lineWidth = settings.lineWidth;
    //     }
    //     if (settings.fillColor) {
    //         context.strokeStyle = settings.fillColor;
    //     }
    //     context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI);
    //     // context.fill();
    //     context.stroke();

   
    //     this.state.currentShape = {type:'circle', x: dragStartLocation.x, y: dragStartLocation.y, radius: radius, sAngle: 0, eAngle: 2*Math.PI, isDragging: false}
 
    // }


    // // drawEllipse=(position)=> {
    // //     const { canvas, dragStartLocation } = this.state;
    // //     let context = canvas.getContext('2d');
    // //     var w = position.x - dragStartLocation.x ;
    // //     var h = position.y - dragStartLocation.y ;
    // //     var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    // //     context.beginPath();
    // //     //Used the .ellipse method instead of arc to give an extra radius, radius x and radius
    // //     var cw = (dragStartLocation.x > position.x) ? true : false;
    // //     context.ellipse(dragStartLocation.x, dragStartLocation.y, Math.abs(w), Math.abs(h), 0, 2 * Math.PI, false);
    // // }


    // drawRect = (position) => {
    //     const { canvas, dragStartLocation, settings } = this.state;
    //     let context = canvas.getContext('2d');
    //     var w = position.x - dragStartLocation.x;
    //     var h = position.y - dragStartLocation.y;
    //     context.beginPath();
    //     if (settings.lineWidth) {
    //         context.lineWidth = settings.lineWidth;
    //     }
    //     if (settings.fillColor) {
    //         context.strokeStyle = settings.fillColor;
    //     }
    //     let p1 = dragStartLocation;
    //     let p2 = { x: position.x - h, y: dragStartLocation.x + w }
    //     let p3 = position
    //     let p4 = { x: position.x - w, y: dragStartLocation.y - h }
    //     context.moveTo(p1.x, p1.y);
    //     context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
    //     context.stroke();

    //     this.state.currentShape = {type:'square', x: dragStartLocation.x, y: dragStartLocation.y, width: w, height: h, isDragging: false }

    // }


    // // drawPolygon = (position, sides, angle) => {
    // //     const { canvas, dragStartLocation } = this.state;
    // //     let context = canvas.getContext('2d');
    // //     var coordinates = [],
    // //         radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
    // //         index = 0;

    // //     for (index; index < sides; index++) {
    // //         coordinates.push({
    // //             x: dragStartLocation.x + radius * Math.cos(angle),
    // //             y: dragStartLocation.y - radius * Math.sin(angle)
    // //         })
    // //         angle += (2 * Math.PI) / sides;
    // //     }


    // //     context.beginPath();
    // //     context.moveTo(coordinates[0].x, coordinates[0].y);

    // //     for (index = 0; index < sides; index++) {
    // //         context.lineTo(coordinates[index].x, coordinates[index].y);
    // //     }

    // //     context.closePath();
    // //     // context.fill();
    // // }

    // draw = (position) => {
    //     const { canvas, settings } = this.state;
    //     const { fillBox, shape, xor, polygonSides, polygonAngle, lineCap } = settings;

    //     if(!shape){
    //         return
    //     }

    //     let context = canvas.getContext('2d');
    //     const { dragStartLocation } = this.state

    //     //global context
    //     context.lineCap = lineCap;

    //     //we don't need even't handlers because before drawing we are jsut taking a default value

    //     if (shape === "circle") {
    //         this.drawCircle(position);
    //     }
    //     if (shape === "square") {
    //         this.drawPolygon(position, 4, Math.PI / 4);
    //     }
    //     if (shape === "line") {
    //         this.drawLine(position);
    //     }
    //     if (shape === "ellipse") {
    //         this.drawEllipse(position);
    //     }
    //     if (shape === "rect") {
    //         this.drawRect(position);
    //     }
    //     if (shape === "polygon") {
    //         this.drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
    //     }
    //     if (xor) {
    //         context.globalCompositeOperation = "xor";
    //     } else {
    //         context.globalCompositeOperation = "source-over";
    //     }
    //     if (fillBox) {
    //         // context.fill();
    //     } else {
    //         context.stroke();
    //     }
    // }

    // //define dragstart, drag and dragStop
    // dragStart = (event) => {
    //     this.state.dragging = true;
    //     this.state.dragStartLocation = this.getCanvasCoordinates(event);
    //     // this.takeSnapShot();
    // }

    // // calculateAngle = (start, current) => {
    // //     var angle = 360 - Math.atan2(current.y - start.y, current.x - start.x) * 180 / Math.PI;
    // //     return angle;
    // // }

    // drag = (event) => {
    //     const { dragging } = this.state;
    //     var position;
    //     position = this.getCanvasCoordinates(event);
    //     if (dragging === true) {
    //         // this.restoreSnapShot();
    //         //generic
    //         this.draw(position);
    //     }
    //     this.handleMouseMove(event, position)
    // }

    // //Drag Stop
    // dragStop = (event) => {
    //     this.state.dragging = false; //dragging stops here
    //     // this.restoreSnapShot();
    //     var position = this.getCanvasCoordinates(event);
    //     //generic
    //     this.draw(position);
   
    //     if(this.onDrawActionEnd){
    //         this.onDrawActionEnd()
    //     }
    //     this.updatesShapesArr()
    // }


    updatesShapesArr=()=>{
        let arr = [...this.state.shapes]
        arr.push(this.state.currentShape)
        this.state.shapes = arr;
        this.state.currentShape = null
    }

    eraseCanvas = () => {
        const { canvas } = this.state;
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(this.onClear){
            this.onClear()
        }
    }

    // // write on canvas
    // writeCanvas = () => {
    //     const { canvas, textInput } = this.state;
    //     let context = canvas.getContext('2d');
    //     context.font = '55px Impact';
    //     context.fillText(textInput, 25, 175);
    // }

    clearSelectedShape = ()=> {
        const { canvas } = this.state;
        let context = canvas.getContext('2d');
        // context.clearRect(0, 0, WIDTH, HEIGHT);
    }
      
      // redraw the scene
      redrawShapeOnMove = () => {
        this.clear();
        const { shapes } = this.state;

        // redraw each shape in the shapes[] array
        for(var i=0;i<shapes.length;i++){
          // decide if the shape is a rect or circle
          // (it's a rect if it has a width property)
          console.log(shapes[i])
          if(shapes[i].width){
            // rect(shapes[i]);
          }else{
            // circle(shapes[i]);
          };
        }
      }
   
    handleMouseMove=(e)=>{
        const { canvas, shapes } = this.state;
        let context = canvas.getContext('2d');
    
        var position = this.getPosition(e, canvas);
        this.setDragging(position)
 
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();

        // test if mouse is inside any shape(s)
        // and redraw different alpha based on hovering
        // context.clearRect(0,0,cw,ch);
   
  
        // console.log('in', position)
        if(context.isPointInStroke(position.x,position.y)){
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
                document.body.style.cursor = 'pointer'
            }else{
                // context.globalAlpha=0.25;
                document.body.style.cursor = 'grab'
            }
            // context.fill();
    }

    setDragging=(x,y)=>{
        const { shapes } = this.state;
        for(var i=0;i<shapes.length;i++){
            var item=shapes[i];
    
            // if x/y hit this item, set it’s isDragging flag
            if(x>=item.x && x<=item.x+item.width && y>=item.y && y<=item.y+item.height){
                item.isDragging=true;
            }
        }
    }

    handleMouseDown=(mouseEvent)=>{
        const { canvas,  } = this.state;
        let context = canvas.getContext('2d');
        var position = this.getPosition(mouseEvent, canvas);

        // context.moveTo(position.X, position.Y);
        context.beginPath();

        this.state.dragStartLocation = position;

        // attach event handlers
        canvas.addEventListener('mousemove', this.drawShape)
        canvas.addEventListener('mouseup', this.finishDrawing)
        canvas.addEventListener('mouseout', this.finishDrawing)

    }

    drawShape=(mouseEvent)=>{
        const { canvas, settings } = this.state;
        const { fillBox, shape, xor,lineWidth,fillColor, polygonSides, polygonAngle, lineCap } = settings;
        let context = canvas.getContext('2d');
        var position = this.getPosition(mouseEvent, canvas);
        if(!shape){
            return
        }
        if (lineWidth) {
            context.lineWidth = lineWidth;
        }
        if (fillColor) {
            context.strokeStyle = fillColor;
        }
        if(lineCap){
            context.lineCap = lineCap;
        }
        if(shape == 'freehand'){
            this.drawLine1(position)
        }
        if(shape == 'line'){
            this.drawLine1(position)
        }
        if(shape == 'circle'){
            this.drawCircle1(position)
        }
        if(shape == 'rect'){
            this.drawRect1(position)
        }
    }

    drawLine1=(position)=>{
        const { canvas, dragStartLocation } = this.state;
        let context = canvas.getContext('2d');
        context.lineTo(position.x, position.y);
        context.stroke();
        this.state.currentShape = {type:'line', start:{x: dragStartLocation.x, y: dragStartLocation.y}, end: { x: position.x, y: position.y, isDragging: false }}
    }

    drawCircle1=(position)=>{
        const { canvas, dragStartLocation, settings } = this.state;
        let context = canvas.getContext('2d');
        var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI);
        // context.fill();
        context.stroke();
        this.state.currentShape = {type:'circle', x: dragStartLocation.x, y: dragStartLocation.y, radius: radius, sAngle: 0, eAngle: 2*Math.PI, isDragging: false}
    }

    drawRect1=(position)=>{
        const { canvas, dragStartLocation, settings } = this.state;
        let context = canvas.getContext('2d');

        var w = position.x - dragStartLocation.x;
        var h = position.y - dragStartLocation.y;

        context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
        context.stroke();
        this.state.currentShape = {type:'square', x: dragStartLocation.x, y: dragStartLocation.y, width: w, height: h, isDragging: false }
    }

    finishDrawing=(mouseEvent)=> {
        const { canvas, shapes } = this.state;
        let context = canvas.getContext('2d');

        // draw the line to the finishing coordinates
        this.drawShape(mouseEvent, canvas, context);

        context.closePath();
        this.updatesShapesArr()

        // unbind any events which could draw
        canvas.removeEventListener("mousemove", this.drawShape);
        // canvas.addEventListener('mousemove', this.handleMouseMove)
        canvas.removeEventListener("mouseup", this.finishDrawing);
        canvas.removeEventListener("mouseout", this.finishDrawing);
    }


    addEventListeners = (canvas) => {
        this.state.canvas = canvas;
        canvas.addEventListener('mousedown', this.handleMouseDown)
      
   
        // canvas.addEventListener('mousedown', this.dragStart, false);
        // canvas.addEventListener('mousemove', this.drag, false);
        // canvas.addEventListener('mouseup', this.dragStop, false);
        // canvas.addEventListener('mouseover', this.mouseHoverHandler, false);

    }
}

export default Drawing