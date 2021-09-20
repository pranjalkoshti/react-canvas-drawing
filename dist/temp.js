let hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;

let drawCoords = (ctx, x, y, color = "green") => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.fillRect(-45, -7, 30, 14);
  ctx.fillStyle = 'white';
  ctx.fillText(Math.floor(x), -30, 0);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = color;
  ctx.fillRect(-45, -7, 30, 14);
  ctx.fillStyle = 'white';
  ctx.fillText(Math.floor(y), -30, 0);
  ctx.restore();
};

let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth * 0.9;
let h = canvas.height = window.innerHeight * 0.9;
canvas.style.backgroundColor = 'transparent';
ctx.lineWidth = 2;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '10px Arial';

class Square {
  constructor(x, y, edge, color) {
    this.x = x;
    this.y = y;
    this.edge = edge;
    this.color = color;
    this.selected = false;
    this.active = false;
    this.activeColor = color.replace(/,\d\d%\)/, str => str.replace(/\d\d/, str.match(/\d\d/)[0] * 0.7));
    this.activeColor2 = color.replace(/,\d\d%\)/, str => str.replace(/\d\d/, str.match(/\d\d/)[0] * 0.6));
  }

  draw(context) {
    context.fillStyle = this.color;

    if (this.active) {
      // context.fillStyle = this.activeColor;
      // context.save()
      // context.setLineDash([10, 5, 30, 5])
      // context.beginPath()
      // context.moveTo(this.x, this.y)
      // context.lineTo(0, this.y)
      // context.moveTo(this.x, this.y)
      // context.lineTo(this.x, 0)
      // context.moveTo(this.x, this.y)
      // context.closePath()
      // context.lineWidth = 0.5
      // context.strokeStyle = this.activeColor
      // context.stroke()
      drawCoords(context, this.x, this.y, this.activeColor);
      context.restore();
    }

    context.fillRect(this.x, this.y, this.edge, this.edge);

    if (this.selected) {
      context.lineWidth = 2;
      context.strokeStyle = this.activeColor2;
      context.strokeRect(this.x, this.y, this.edge, this.edge);
    }
  }

  update() {
    this.x += 0.1;
  }

  select() {
    this.selected = !this.selected;
  }

  activate() {
    this.active = !this.active;
  }

}

let prtcls = new Array(10).fill().map(() => new Square(Math.random() * w, Math.random() * h, 60, hsl(Math.floor(Math.random() * 360), 100, 50)));

let getMouseCoords = (canvas, event) => {
  let canvasCoords = canvas.getBoundingClientRect();
  return {
    x: event.pageX - canvasCoords.left,
    y: event.pageY - canvasCoords.top
  };
};

let getOffsetCoords = (mouse, rect) => {
  return {
    x: mouse.x - rect.x,
    y: mouse.y - rect.y
  };
};

let arr = new Array(40).fill('empty').map(() => Math.floor(Math.random() * 100));

let cursorInRect = (mouseX, mouseY, rectX, rectY, rectW, rectH) => {
  let xLine = mouseX > rectX && mouseX < rectX + rectW;
  let yLine = mouseY > rectY && mouseY < rectY + rectH;
  return xLine && yLine;
};

canvas.addEventListener('click', e => {
  let mouse = getMouseCoords(canvas, e);
});
canvas.addEventListener('mousemove', e => {
  let mouse = getMouseCoords(canvas, e);
  let arr = prtcls.map(e => cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge));
  !arr.every(e => e === false) ? canvas.classList.add('pointer') : canvas.classList.remove('pointer');
  prtcls.forEach(e => {
    if (e.selected) {
      e.x = mouse.x - e.offset.x;
      e.y = mouse.y - e.offset.y;
    }

    cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge) ? e.active != true ? e.activate() : false : e.active = false;
  });
});
canvas.addEventListener('mousedown', e => {
  let mouse = getMouseCoords(canvas, e);
  prtcls.forEach(e => {
    if (cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge)) {
      e.selected = true;
      e.offset = getOffsetCoords(mouse, e);
    } else {
      e.selected = false;
    }
  });
});
canvas.addEventListener('mouseup', e => {
  prtcls.forEach(e => e.selected = false);
});

function animate() {
  ctx.clearRect(0, 0, w, ctx.canvas.height);
  ctx.fillStyle = 'white';
  prtcls.forEach(e => {
    e.draw(ctx);
  });
  window.requestAnimationFrame(animate);
}

animate();