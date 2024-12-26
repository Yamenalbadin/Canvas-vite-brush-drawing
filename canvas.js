import { randomIntFromRange, randomColor, distance } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const eraseBtn = document.querySelector(".erase-btn")
const brushSize = document.querySelector(".brush-size")
const saturationControl = document.querySelector(".saturation")
const lightnessControl = document.querySelector(".lightness")
console.log(saturationControl.value)
const dpr = 2
let canvasWidth = 0
let canvasHeight = 0
const text = 'mag'
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
  handleMouseMove(event)
})

addEventListener('resize', () => {
  setCanvasDimensions()
  init()
})


const setCanvasDimensions = () => {
  canvasWidth = innerWidth
  canvasHeight = innerHeight
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  canvas.style.width = canvasWidth + "px"
  canvas.style.height = canvasHeight + "px"
  c.scale(dpr, dpr);
}
setCanvasDimensions()

c.strokeStyle = colors[1]
c.lineJoin = "round"
c.lineCap = "round"
c.lineWidth = brushSize.value

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let saturation = saturationControl.value
let lightness = lightnessControl.value
let direction = true

const draw = (e) => {
  if(!isDrawing) return
  c.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  c.beginPath();
  c.moveTo(lastX, lastY)
  c.lineTo(e.offsetX, e.offsetY)
  c.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]
  hue++
  if(hue >= 360){
    hue = 0
  }
}

const clearCnavas = () => {
  c.clearRect(0, 0, canvas.width, canvas.height)
}

brushSize.addEventListener("change", () => {
  c.lineWidth = brushSize.value
})
saturationControl.addEventListener("change", () => {
  saturation = saturationControl.value
})
lightnessControl.addEventListener("change", () => {
  lightness = lightnessControl.value
})

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]
})

canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", () => {
  isDrawing= false
  // clearCnavas()
})

eraseBtn.addEventListener("click", () => {
  isDrawing= false
  clearCnavas()
})


// const circle = new Circle(canvas.width/2, canvas.height/2, canvas.height/2, colors[1])
// circle.draw()


// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

const handleMouseMove = (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()

// animate()
