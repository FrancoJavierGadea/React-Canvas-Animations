import { useRef, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react";

import { SnowAnimation } from "../helpers/SnowAnimation";
import { useAnimation } from "../hooks/useAnimation";
import ControlsAnimation from "./ControlsAnimation";

import bg from "../assets/images/cropper-bg.png";
import styled from "styled-components";
import { MatrixAnimation } from "../helpers/MatrixAnimation";
import { DrawImageRain } from "../helpers/DrawImageRain";
import { getPhotoMap } from "../helpers/PhotoMap";

const StyledContainer = styled.div`

  --grid-bg-size: 15px;
  --grid-bg-color: #ffffff20;
  
  height: ${props => props.height}px;
  max-height: 700px;

  background-size: var(--grid-bg-size, 40px) var(--grid-bg-size, 40px);    
  background-image: repeating-linear-gradient(0deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px)), repeating-linear-gradient(-90deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px));

  background-image: url(${bg});

  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;


function CanvasAnimation({src, setDownload}, ref) {

    const maxWidth = 960;

    const maxHeight = 540;

    const [width, setWidth] = useState(maxWidth);

    const [height, setHeight] = useState(maxHeight);

    const [image, setImage] = useState(null);

    const canvasRef = useRef(null);


    const [id, start, setStart, animation, setAnimation, options, setOptions] = useAnimation(canvasRef, SnowAnimation);


    //Exponer metodos a los Componentes Padres
    useImperativeHandle(ref, () => ({animation, setAnimation, options, setOptions}));



    useEffect(() => {

        const img = new Image();

        img.src = src;

        img.onload = () => {

            //* Calcular y escalar la Imagen
            let scaleX = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
    
            let scaleY = img.naturalHeight > maxHeight ? maxHeight / img.naturalHeight : 1;

            let scale = scaleX < scaleY ? scaleX : scaleY;
            
            let imgWidth = scale < 1 ? img.naturalWidth * scale : img.naturalWidth;

            let imgHeigth = scale < 1 ? img.naturalHeight * scale : img.naturalHeight;

            const Image = {
                img,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                scale,
                width: imgWidth,
                height: imgHeigth
            }

            console.log('Image: ', Image);
            
            //* Modificar el Tamaño del Canvas
            setWidth(imgWidth); setHeight(imgHeigth);

            setImage(Image);

            setOptions({
                image: Image
            });
        }
        
    }, [src, animation]);


    useEffect(() => {

        if(image && image.img){

            //* Dibujar la Imagen
            const canvas = canvasRef.current;
    
            const ctx = canvas.getContext('2d');
    
            ctx.clearRect(0, 0, width, height);
    
            ctx.drawImage(image.img, 0, 0, width, height);
        }
        
    }, [image, width, height]);


    useEffect(() => {
        
        if(start === false && canvasRef.current){

            setDownload(canvasRef.current.toDataURL());
        }

    }, [start, setDownload]);

    return (<>
        <StyledContainer height={maxHeight}>
            <canvas width={width} height={height} ref={canvasRef} style={{display: 'block', margin: 'auto'}}></canvas>
        </StyledContainer>
    
        <ControlsAnimation options={options} setOptions={setOptions} setStart={setStart} animation={animation}></ControlsAnimation>
    </>);
}

export default forwardRef(CanvasAnimation);