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


    const [id, start, setStart, animation, setAnimation, options, setOptions] = useAnimation(canvasRef, SnowAnimation);

    
    const [inputs, setInputs] = useState({color: '#ffffff', number: 5000, velocity: 1.5});

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

            setOptions({...options, image: img});
        }
        
    }, [src, width, height]);


    const startAnimation = () => {

        setStart(true);
    }

    const stopAnimation = () => {

        setStart(false);
    }

    const changeColor = ({target: {value}}) => {

        setInputs({...inputs, color: value});

        setOptions({
            ...options,
            particle: {
                ...options.particle,
                color: value
            }
        });
    }

    const changeNumberOfParticles = ({target: {value}}) => {

        setInputs({...inputs, number: value});

        if(Number(value)< 0 || Number(value) > 5000) return;
        
        setOptions({
            ...options,
            number: Number(value)
        });
    }

    const changeVelocity = ({target: {value}}) => {

        setInputs({...inputs, velocity: value});

        if(Number(value) < 0 || Number(value) > 10) return;
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                velocity: Number(value)
            }
        });
    }

    return (<>
    
        <canvas width={width} height={height} ref={canvasRef} style={{display: 'block', margin: 'auto'}}></canvas>
    
        <div className="d-flex justify-content-evenly p-2">

            <Button variant="primary" onClick={startAnimation}>Start</Button>

            <Button variant="danger" onClick={stopAnimation}>Stop</Button>

            <input type="color" className="form-control form-control-color" title="Choose your color" onChange={changeColor} value={inputs.color}></input>
            
            <input type="number" className="form-control form-control-number" style={{maxWidth: '150px'}}  min="0" max="5000" step="100" onChange={changeNumberOfParticles} value={inputs.number}></input>

            <input type="number" className="form-control form-control-number" style={{maxWidth: '150px'}}  min="0" max="10" step="0.5" onChange={changeVelocity} value={inputs.velocity}></input>
        </div>
    </>);
}

export default CanvasAnimation;