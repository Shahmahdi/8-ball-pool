import React, { useEffect, useState } from 'react';
const mainBoard = require('./resources/background.png');

function assetLoadingLoop(callback: any, assetsStillLoading: number) {
  if (assetsStillLoading) {
    requestAnimationFrame(assetLoadingLoop(callback, assetsStillLoading) as any)
  } else {
    callback();
  }
}

const App: React.FC = () => {

  const [loading, setLoading] = useState(true);

  const canvasRef = React.useRef(null);
  let canvas: any = null;
  let ctx: any = null;

  let stickPosition = {
    x: 0,
    y: 100
  }

  let assets = {
    background: {},
    stick: {}
  };
  let assetsStillLoading = 0;

  // const assetLoadingLoop = (callback: any) => {
  //   if (assetsStillLoading) {
  //     requestAnimationFrame(assetLoadingLoop(callback))
  //   } else {
  //     callback();
  //   }
  // }

  const loadAssets = (callback: any) => {
    function loadAsset(fileName: string) {
      assetsStillLoading++;
      let image = new Image();
      image.src = require(`./resources/${fileName}`);
      image.onload = () => {
        assetsStillLoading--;
      }
      return image;
    }
    assets.background = loadAsset('background.png');
    assets.stick = loadAsset('stick.png');
    assetLoadingLoop(callback, assetsStillLoading);
    return Promise.resolve();
  }

  const gameInit = () => {

  }

  const gameStart = () => {
    gameInit();
    gameMainLoop();
  }

  const gameMainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameWorldUpdate();
    gameWorldDraw();

    requestAnimationFrame(gameMainLoop);
  }

  const gameWorldUpdate = () => {
    stickUpdate()
  }

  const gameWorldDraw = () => {
    console.log(`assets.background: `, assets.background);
    ctx.drawImage(assets.background, 0, 0, 800, 400);
    stickDraw();
  }

  const stickUpdate = () => {
    stickPosition.x++;
  }

  const stickDraw = () => {
    console.log(`stickDraw `);
    ctx.drawImage(assets.stick, stickPosition.x, stickPosition.y);
  }

  useEffect(() => {
    if (loading) {
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      loadAssets(gameStart).then(r => gameStart());
      setLoading(false);
    }
  }, [loading])

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
