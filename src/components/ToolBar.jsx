import React from "react"

function ToolBar(props) {





  return (
    <div className="toolbar">
      <img src='/logo.png' className='logo'></img>
      <label className="color_label"> Color:</label>
      <input type='color' className="color" value={props.color} onChange={e => props.changeColor(e)} id='myColor'></input>
      <div className="container">
        <label > Line width</label>
        <input type="range" min="1" max="100" value={props.lineWidth} onChange={e => props.changeWidth(e)} className="slider" id="myRange"></input>
      </div>
      <button className={props.tool === 'brush' ? 'active' : ''} disabled={props.isSelected || props.isCopied} onClick={e => props.setTool('brush')}>Brush</button>
      <button className={props.tool === 'selection' ? 'active' : ''} onClick={e => { props.setTool('selection') }}>Selection</button>
      <button className={props.tool === 'copy' ? 'active' : ''} disabled={!props.isSelected || props.isCopied} onClick={e => { props.setTool('copy') }}>Copy</button>
      <button className={props.tool === 'crop' ? 'active' : ''} disabled={!props.isSelected || props.isCopied} onClick={e => { props.setTool('crop') }}>Crop</button>
      <button className={props.tool === 'place' ? 'active' : ''} disabled={!props.isCopied} onClick={e => { props.setTool('place') }}>Place Img</button>
      <button className={props.tool === 'rubber' ? 'active' : ''} disabled={props.isSelected || props.isCopied} onClick={e => { props.setTool('rubber') }}>Rubber</button>
    </div>
  )
}

export default ToolBar