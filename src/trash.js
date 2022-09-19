//brush

function startDrawing({ nativeEvent }) {
  contextRef.current.beginPath()
  setIsDrawing(true)
  nativeEvent.preventDefault()
}

function draw({ nativeEvent }) {
  if (!isDrawing) {
    return
  }
  const { offsetX, offsetY } = nativeEvent
  contextRef.current.lineTo(offsetX, offsetY)
  contextRef.current.stroke()
  nativeEvent.preventDefault()
}

function stopDrawing() {
  contextRef.current.closePath()
  setIsDrawing(false)
}

//Select

function rectStart({ nativeEvent }) {
  const { offsetX, offsetY } = nativeEvent
  setStart([offsetX, offsetY])
  setIsDrawing(true)
  setSaved(canvasRef.current.toDataURL())
}

function rectDraw({ nativeEvent }) {
  if (isDrawing) {
    const { offsetX, offsetY } = nativeEvent
    draw(offsetX, offsetY)
  }
}

function rectEnd() {
  setIsDrawing(false)
}


function draw(x, y){
  const img = new Image()
  img.src = saved
  img.onload = () => {
    contextRef.current.clearRect(0, 0, 500, 500)
    contextRef.current.drawImage(img, 0, 0, 500, 500)
    contextRef.current.beginPath()
    contextRef.current.rect(start[0], start[1], x - start[0], y - start[1]);
    contextRef.current.stroke();
  }
}


//Copy

function rectStart({ nativeEvent }) {
  const { offsetX, offsetY } = nativeEvent
  setStart([offsetX, offsetY])
  setIsDrawing(true)
  setSaved(canvasRef.current.toDataURL())
}

function rectDraw({ nativeEvent }) {
  if (isDrawing) {
    const { offsetX, offsetY } = nativeEvent
    draw(offsetX, offsetY)
    setImgData(contextRef.current.getImageData(start[0]+1, start[1]+1,offsetX -start[0]-3, offsetY-start[1]-2))
  }
}

console.log(imgData)

function rectEnd() {
  contextRef.current.putImageData(imgData, 0, 0)
  setIsDrawing(false)
  setStart([])
}

  // React.useEffect(()=>{
  //   if(context !== null){
  //     context.lineCap = 'round'
  //     context.strokeStyle = props.color
  //     context.lineWidth = 4
  //     context.setLineDash([10, 20])
  //   }
  // },[context])

  // React.useEffect(() => {
  //   //const canvas = canvasRef.current
  //   // obj.current = canvasRef.current
  //   // console.log(obj)
  //   //setCanvasState(setObj(canvasState, 'canvas', canvasRef.current))
  //   //console.log(canvasState)
  //   // canvas.width = 500
  //   // canvas.height = 500

  //   // const context = canvas.getContext('2d')
  //   // context.lineCap = 'round'
  //   // context.strokeStyle = props.color
  //   // context.lineWidth = 4
  //   // context.setLineDash([10, 20])
  //   // contextRef.current = context
  // }, [])