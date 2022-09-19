import React from 'react'
import './App.css';
import ToolBar from './components/ToolBar.jsx'
import Canvas from './components/Canvas.jsx'

function App() {

  const [tool, setTool] = React.useState('brush')
  const [color, setColor] = React.useState('#000')
  const [lineWidth, setLineWidth] = React.useState(1)
  const [isSelected, setIsSelected] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)



  function changeColor(e){
    setColor(e.target.value)
  }

  function changeWidth(e){
    setLineWidth(e.target.value)
  }



  return (
    <div className="App">
      <ToolBar
      color={color}
      changeColor={changeColor}
      lineWidth={lineWidth}
      changeWidth={changeWidth}
      tool={tool}
      setTool={setTool}
      isSelected={isSelected}
      isCopied={isCopied}
      />
      <Canvas
      color={color}
      lineWidth={lineWidth}
      tool={tool}
      setTool={setTool}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      setIsCopied={setIsCopied}
      />
    </div>
  );
}

export default App;
