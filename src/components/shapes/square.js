class Square {
    constructor(x, y, width, height, settings) {
    
        this.x = x
        this.y = y
        this.edge = width
        this.width = width
        this.height = height
        this.color = settings.fillColor
        this.lineWidth = settings.lineWidth
        this.selected = false
        this.active = false
        this.activeColor = settings.fillColor.replace(/,\d\d%\)/, str => str.replace(/\d\d/, str.match(/\d\d/)[0] * 0.7))
        this.activeColor2 = settings.fillColor.replace(/,\d\d%\)/, str => str.replace(/\d\d/, str.match(/\d\d/)[0] * 0.6))

    }
    draw(context) {
        // context.fillStyle = this.color
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.beginPath();
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
            // drawCoords(context, this.x, this.y, this.activeColor)
            // context.restore()
        }
        context.strokeRect(this.x, this.y, this.width, this.height)
        if (this.selected) {
            context.lineWidth = 2;
            context.strokeStyle = this.activeColor2
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
    update() {
        this.x += 0.1
    }

    select() {
        this.selected = !this.selected
    }

    activate() {
        this.active = !this.active
    }
}

export default Square;