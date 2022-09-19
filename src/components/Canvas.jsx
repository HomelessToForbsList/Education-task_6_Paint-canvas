import React from "react"


function Canvas(props) {

  const canvasRef = React.useRef(null)
  const contextRef = React.useRef(null)


  const [isDrawing, setIsDrawing] = React.useState(false)
  const [start, setStart] = React.useState([])
  const [end, setEnd] = React.useState([])
  const [saved, setSaved] = React.useState(null)

  const [canvas, setCanvas] = React.useState(null)

  const [imgData, setImgData] = React.useState(null)
  const [restoreArr, setRestoreArr] = React.useState([])

  React.useEffect(() => {
    setCanvas(canvasRef.current)
  }, [])



  React.useEffect(() => {
    if (canvas !== null) {
      canvas.width = 1000
      canvas.height = 700
      contextRef.current = canvas.getContext('2d')
    }
  }, [canvas])

  React.useEffect(() => {
    if (contextRef.current !== null) {
      contextRef.current.lineCap = 'round'
      contextRef.current.strokeStyle = props.color
      contextRef.current.lineWidth = props.lineWidth
    }
  }, [props])

  React.useEffect(() => {
    if (props.tool === 'place') {
      setIsDrawing(true)
    }
    if (props.tool === 'copy') {
      copy()
    }
    if (props.tool === 'crop') {
      crop()
    }
  }, [props.tool])

  function startDrawing({ nativeEvent }) {
    contextRef.current.beginPath()
    setIsDrawing(true)
    nativeEvent.preventDefault()
  }

  function drawLine({ nativeEvent }) {
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

  function startErase() {
    contextRef.current.save()
    contextRef.current.strokeStyle = 'rgba(255,255,255,1)'
    contextRef.current.beginPath()
    setIsDrawing(true)
  }

  function erase({ nativeEvent }) {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  function stopErase() {
    contextRef.current.restore()
    contextRef.current.closePath()
    setIsDrawing(false)
  }


  function rectStart({ nativeEvent }) {
    contextRef.current.save()
    contextRef.current.strokeStyle = '#000'
    contextRef.current.lineWidth = 1
    contextRef.current.setLineDash([10, 20])
    const { offsetX, offsetY } = nativeEvent
    setStart([offsetX, offsetY])
    setIsDrawing(true)
    if (!props.isSelected) {
      setSaved(canvasRef.current.toDataURL())
      setRestoreArr([...restoreArr, contextRef.current.getImageData(0, 0, canvas.width, canvas.height)])
    }
  }

  function rectDraw({ nativeEvent }) {
    if (isDrawing) {
      const { offsetX, offsetY } = nativeEvent
      draw(offsetX, offsetY)
      setEnd([offsetX, offsetY])
    }
  }


  function rectEnd() {
    contextRef.current.restore()
    console.log(end)
    setIsDrawing(false)
    props.setIsSelected(true)
  }


  function draw(x, y) {
    const img = new Image()
    img.src = saved
    img.onload = () => {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
      contextRef.current.drawImage(img, 0, 0, canvas.width, canvas.height)
      contextRef.current.beginPath()
      contextRef.current.rect(start[0], start[1], x - start[0], y - start[1]);
      contextRef.current.stroke();
    }
  }



  function copy() {
    if (start.length && end.length) {
      setImgData(contextRef.current.getImageData(start[0] + 2, start[1] + 2, end[0] - start[0] - 4, end[1] - start[1] - 4))
      props.setIsSelected(false)
      props.setIsCopied(true)
    }
    else alert('No selection!')
  }

  function crop() {
    if (start.length && end.length) {
      console.log(end)
      const croppedImg = contextRef.current.getImageData(start[0] + 2, start[1] + 2, end[0] - start[0] - 4, end[1] - start[1] - 4)
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
      contextRef.current.putImageData(croppedImg, start[0] + 2, start[1] + 2)
      props.setIsSelected(false)
      props.setTool('brush')
    }
    else alert('No selection!')
  }


  function putImg({ nativeEvent }) {
    if (imgData && isDrawing) {
      const { offsetX, offsetY } = nativeEvent
      const prev = restoreArr[restoreArr.length - 1]
      contextRef.current.putImageData(prev, 0, 0)
      contextRef.current.putImageData(imgData, offsetX, offsetY)
    }
  }

  function place() {
    props.setIsSelected(false)
    props.setIsCopied(false)
    props.setTool('brush')
    setIsDrawing(false)
  }



  function mouseDownSwitcher(tool, e) {
    switch (true) {
      case tool === 'brush':
        startDrawing(e)
        break;
      case tool === 'selection':
        rectStart(e)
        break;
      case tool === 'place':
        setIsDrawing(true)
        place()
        break;
      case tool === 'rubber':
        startErase()
        break;
      default:
        break;
    }
  }

  function mouseMoveSwitcher(tool, e) {
    switch (true) {
      case tool === 'brush':
        drawLine(e)
        break;
      case tool === 'selection':
        rectDraw(e)
        break;
      case tool === 'place':
        putImg(e)
        break;
      case tool === 'rubber':
        erase(e)
        break;
      default:
        break;
    }
  }

  function mouseUpSwitcher(tool) {
    switch (true) {
      case tool === 'brush':
        stopDrawing()
        break;
      case tool === 'selection':
        rectEnd()
        break;
      case tool === 'rubber':
        stopErase()
        break;
      default:
        break;
    }
  }



  return (
    <div>
      <canvas
        id='canvas'
        style={{ width: 1000, height: 700, border: '1px solid black' }}
        ref={canvasRef}
        onMouseDown={e => mouseDownSwitcher(props.tool, e)}
        onMouseMove={e => mouseMoveSwitcher(props.tool, e)}
        onMouseUp={() => mouseUpSwitcher(props.tool)}
        onMouseLeave={stopDrawing}
      >
      </canvas>
    </div>
  )
}

export default Canvas