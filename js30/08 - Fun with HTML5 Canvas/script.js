const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.strokeStyle = `'#BADA55'`
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 1
let hue = "rgb(0,0,0,1)"
const currentColor = document.querySelector('#currentColor')
const brushSizeSelector = document.querySelector('#brushSize')
const brushSizeLabel = document.querySelector('#brushSizeLabel')
const opacitySelector = document.querySelector('#opacity')
const opacityLabel = document.querySelector('#opacityLabel')
const backgroundFillBtn = document.querySelector('#backgroundFill')
const magicColorBtn = document.querySelector("#magicColor")
const magicWidthBtn = document.querySelector("#magicWidth")
let magicColorBool = false
let magicWidthBool = false

function rgbaToHsla(r, g, b, a = 1) {
    console.log("rgba", r,g,b,a)
  // 1. Normalize RGB values to the 0-1 range
  r /= 255;
  g /= 255;
  b /= 255;

  // 2. Find the maximum and minimum channel values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  // 3. Calculate Hue and Saturation if it's not a shade of gray
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h /= 6;
  }

  // 4. Convert values to standard CSS degrees and percentages
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100), Number(a)]
}

function hslToRgba(h, s, l, a) {
  // Normalize parameters
  s = s / 100;
  l = l / 100;

  // Calculate chroma
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  // Convert to 0-255 range and format as a string
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  console.log(`rgba(${r}, ${g}, ${b}, ${a})`)
  return `rgba(${r}, ${g}, ${b}, ${Number(a)})`;
}

function initColorPicker() {
  var canvas = document.getElementById('colorCanvas');
  var canvasContext = canvas.getContext('2d');

  let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop(0, '#ff0000')
  gradient.addColorStop(1 / 6, '#ffff00')
  gradient.addColorStop((1 / 6) * 2, '#00ff00')
  gradient.addColorStop((1 / 6) * 3, '#00ffff')
  gradient.addColorStop((1 / 6) * 4, '#0000ff')
  gradient.addColorStop((1 / 6) * 5, '#ff00ff')
  gradient.addColorStop(1, '#ff0000')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

  gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

  gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)


  canvas.onclick = function(e) {
    var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1)
    var rgba = imgData.data;
    var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + (opacitySelector.value) + ")";
    console.log("%c" + color, "color:" + color)
    hue = color
    currentColor.style.backgroundColor = color
  }
}
initColorPicker()

brushSizeSelector.value = brushSizeSelector.getAttribute('value'); 
function setBrushSize(value) {
    brushSizeLabel.textContent = `Brush Size: ${value}`
    ctx.lineWidth = value
    brushSizeSelector.value = value
}
setBrushSize(50)

function get_rgba() {
    console.log("HUE", hue)
    let array = hue.split(',')
    let i0 = array[0].indexOf("(") +1
    array[0] = array[0].substring(i0)
    let i3 = array[3].indexOf(")")
    array[3] = array[3].substring(0,i3)
    return array
}

function increment_rgba() {
    console.log(hue)
    let array = rgbaToHsla(...get_rgba())
    console.log(array[0])
    if (array[0] >= 359) {
        array[0] = 0
    } else {
        array[0]++
    }
    console.log(array, hslToRgba(...array))

    return  hslToRgba(...array)

    //return "rgba(" + array.join(",") + ")"
}

opacitySelector.value = opacitySelector.getAttribute('value'); 
function setOpacity(value) {
    let array = get_rgba()
    array[3] = value
    opacityLabel.textContent = `Opacity: ${value}`
    hue = "rgba(" + array.join(",") + ")"
    console.log("opacity change", hue)
    opacitySelector.value = value
}
setOpacity(1)

let isDrawing = false
let lastX = 0
let lastY = 0
let direction = true

function draw(e) {
    if (!isDrawing) return
    //ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    //console.log(hue)
    ctx.strokeStyle = hue
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    lastX = e.offsetX
    lastY = e.offsetY
    if (magicColorBool) {
        hue = increment_rgba()
    }

    if (magicWidthBool) {
        if (ctx.lineWidth > 100 || ctx.lineWidth <= 1) direction = !direction
        console.log(ctx.lineWidth, direction)
        ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth - 1
    }
    
}

magicColorBtn.addEventListener('click', (e) => {
    magicColorBool = !magicColorBool
    magicColorBtn.setAttribute('aria-pressed', magicColorBool.toString())
    magicColorBtn.classList.toggle('active')
})
magicWidthBtn.addEventListener('click', (e) => {
    magicWidthBool = !magicWidthBool
    magicWidthBtn.setAttribute('aria-pressed', magicWidthBool.toString())
    magicWidthBtn.classList.toggle('active')
})
brushSizeSelector.addEventListener('input', (e) => setBrushSize(brushSizeSelector.value))
opacitySelector.addEventListener('input', (e) => setOpacity(opacitySelector.value))
backgroundFillBtn.addEventListener('click', (e) => {
    canvas.style.backgroundColor = hue
})


canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
})
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)




/*
TODO
Create Magic Color button
Create Magic Width button
Create Opacity feature
*/