class Cell {
    constructor(element) {
        this.selected = false
        this.element = element
    }

    toggle_select() {
        this.selected = !this.selected
        if (this.selected) {this.draw_circle()}
        else {this.remove_circle()}
    }

    draw_circle() {
        const canvas = document.createElement("canvas");
        canvas.width='40'
        canvas.height='40'
        const ctx = canvas.getContext("2d");
        const padding = 5;
        const centerX = 20
        const centerY = 20
        const radius = 20 - padding;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Full circle
        ctx.strokeStyle = "white"; // Outline color
        ctx.lineWidth = 3;        // Thickness of the outline
        ctx.stroke();
        this.element.appendChild(canvas)
    }

    remove_circle() {
        this.element.replaceChildren()
    }

    update_element(element) {
        this.element = element
    }
}







module.exports = Cell
