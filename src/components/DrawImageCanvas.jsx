import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import bg from "../assets/images/cropper-bg.png";

const StyledContainer = styled.div`

    --grid-bg-size: 15px;
    --grid-bg-color: #ffffff20;

    max-height: 90vh;

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

function DrawImageCanvas({image, style}) {

    const canvasRef = useRef(null);

    const [width, setWidth] = useState(500);

    const [height, setHeight] = useState(500);

    const [img, setImg] = useState(null);

    useEffect(() => {

        if(image){

            setWidth(image.width);

            setHeight(image.height);

            setImg(image.img);
        }
        
    }, [image]);

    useEffect(() => {

        if(img){

            //* Dibujar la Imagen
            const canvas = canvasRef.current;
        
            const ctx = canvas.getContext('2d');
    
            ctx.clearRect(0, 0, width, height);
    
            ctx.drawImage(img, 0, 0, width, height);
        }

    }, [img, width, height]);

    return (<div>

        <StyledContainer style={style}>
            <canvas width={width} height={height} ref={canvasRef} style={{display: 'block', margin: 'auto'}}></canvas>
        </StyledContainer>

    </div>);
}

export default DrawImageCanvas;