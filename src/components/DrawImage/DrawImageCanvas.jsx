import { useEffect, useRef, useState } from "react";

import StyledContainer from "../Styled/StyledContainer";



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