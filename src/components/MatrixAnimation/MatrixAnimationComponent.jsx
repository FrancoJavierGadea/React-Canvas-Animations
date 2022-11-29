import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAnimation } from "../../hooks/useAnimation";
import ImageLoaderComponent from "../ImageLoader/ImageLoaderComponent";
import StyledContainer from "../Styled/StyledContainer";
import { MatrixAnimation, optionsDefaultValue } from "./MatrixAnimation";
import MatrixAnimationControls from "./MatrixAnimationControls";


function MatrixAnimationComponent() {

    const maxWidth = 960;

    const maxHeight = 540;

    const canvasRef = useRef(null);

    const [width, setWidth] = useState(maxWidth);

    const [height, setHeight] = useState(maxHeight);


    const { id, start, setStart, options, setOptions } = useAnimation(canvasRef, MatrixAnimation);


    const [image, setImage] = useState(null);

    useEffect(() => {
    
        if(image !== null){

            //? Pintar la Imagen
                const ctx = canvasRef.current.getContext('2d');

                ctx.globalAlpha = 1;

                ctx.drawImage(image.img, 0, 0, image.width, image.height);
            

            //? Cambiar las opciones de la Animaticion
                setOptions({...options, image: image});
        }

    }, [image]);

    const chageImage = (image) => {

        //? Detener la animaticion
            setStart(false);

        //? Redimensionar el canvas al tamaño de la imagen
            setWidth(image.width);  setHeight(image.height);

        //? Establecer la imagen    
            setImage(image);
    }


    const changeOptions = (values) => {

        setOptions({...values, image: image});
    }

    return (<div className="MatrixAnimationComponent">

        <Container>

            <StyledContainer>
                <canvas width={width} height={height} ref={canvasRef} style={{display: 'block', margin: 'auto'}}></canvas>
            </StyledContainer>


            <Row className="Controls p-0 m-0">

                <Col className="p-2 m-0" xs={12} xl={6}>
                    <div className="p-2 rounded" style={{backgroundColor: '#456978'}}>
                        
                        <ImageLoaderComponent className="d-flex justify-content-evenly" maxWidth={maxWidth} maxHeight={maxHeight} onChange={chageImage} />
                    
                    </div>
                </Col>

                <Col className="p-2 m-0" xs={12} xl={6}>
                    <div className="p-2 rounded d-flex justify-content-evenly align-items-center" style={{backgroundColor: '#324897'}}>

                        <Button variant={start ? 'danger' : 'primary'} onClick={ () => setStart(!start) }>{start ? 'Stop' : 'Start'}</Button>

                        <MatrixAnimationControls initialValues={optionsDefaultValue} onChange={changeOptions} />
                    
                    </div>
                </Col>
            </Row>

        </Container>
    </div>);
}

export default MatrixAnimationComponent;