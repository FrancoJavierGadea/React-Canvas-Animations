import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { SnowAnimation } from "../helpers/SnowAnimation";
import { useAnimation } from "../hooks/useAnimation";


function CanvasAnimation({src}) {

    const maxWidth = 960;

    const maxHeight = 540;

    const [width, setWidth] = useState(maxWidth);

    const [height, setHeight] = useState(maxHeight);

    const canvasRef = useRef(null);


    const [id, start, setStart, animation, setAnimation] = useAnimation(null);


    useEffect(() => {

        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        const img = new Image();

        img.src = src;

        img.onload = () => {

            //* Calcular y escalar la Imagen
            let scaleX = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
    
            let scaleY = img.naturalHeight > maxHeight ? maxHeight / img.naturalHeight : 1;

            let scale = scaleX < scaleY ? scaleX : scaleY;
            
            let imgWidth = scale < 1 ? img.naturalWidth * scale : img.naturalWidth;

            let imgHeigth = scale < 1 ? img.naturalHeight * scale : img.naturalHeight;

            console.log('Image: ', {
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                scale,
                width: imgWidth,
                height: imgHeigth
            });
            
            //* Modificar el Tamaño del Canvas
            setWidth(imgWidth); setHeight(imgHeigth);


            //* Dibujar la Imagen
            ctx.clearRect(0, 0, width, height);

            ctx.drawImage(img, 0, 0, imgWidth, imgHeigth);

            setAnimation(SnowAnimation(canvasRef.current, {
                image: img
            }));
        }
        
    }, [src, width, height]);


    const startAnimation = () => {

        setStart(true);
    }

    const stopAnimation = () => {

        setStart(false);
    }

    return (<>
    
        <canvas width={width} height={height} ref={canvasRef} style={{display: 'block', margin: 'auto'}}></canvas>
    
        <div className="d-flex justify-content-evenly p-2">
            <Button variant="primary" onClick={startAnimation}>Start</Button>
            <Button variant="danger" onClick={stopAnimation}>Stop</Button>
        </div>
    </>);
}

export default CanvasAnimation;