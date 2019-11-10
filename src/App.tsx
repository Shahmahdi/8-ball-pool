import React, { useEffect } from 'react';
const mainBoard = require('./resources/spr_background4.png');

const App: React.FC = () => {

  const canvasRef = React.useRef(null);

  useEffect(() => {
    let canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let image = new Image();
    image.src = mainBoard;
    
    setTimeout(() => {
      ctx.drawImage(image, 0, 0, 800, 400);
    }, 1000);
  }, [])

  return (
    <div>
      <canvas 
        ref={canvasRef}
        width='800'
        height='400'
      />
    </div>
  );
}

export default App;
