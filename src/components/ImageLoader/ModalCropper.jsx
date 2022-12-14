import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';


import { Cropper } from 'react-cropper';

import "cropperjs/dist/cropper.css";


import styled from 'styled-components';

import bg from "../../assets/images/cropper-bg.png";


const StyledPreview = styled.div`

    width: 100%;
    height: auto;

    overflow: hidden;

    background-image: url(${bg});

    & > div {
        overflow: hidden;
        width: 100%;
        height: 400px;
    }
`;


function ModalCropper({onChange}, ref){

    //* Modal
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    
    const hide = () => setVisible(false);
    

    //* Cropper
    const cropperRef = useRef(null);

    const [cropperImage, setCropperImage] = useState(null);
    
    const [fileType, setFileType] = useState(null);

    const [details, setDetails] = useState({});
    
    const save = () => {

        const cropper = cropperRef.current.cropper;

        const cropImage = cropper.getCroppedCanvas({
            minWidth: 256,
            minHeight: 256,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: 'transparent',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        }).toDataURL(fileType);

        onChange(cropImage);

        hide();
    };

    const onCrop = (e) => {

        setDetails({...e.detail});
    }

    const reset = () => {

        const cropper = cropperRef.current.cropper;

        cropper.reset();
    }


    //Exponer metodos a los Componentes Padres
    useImperativeHandle(ref, () => ({show, hide, setCropperImage, setFileType}));


    return (<div className="ModalCropper">

        <Modal show={visible} onHide={hide} backdrop="static" keyboard={false} size="xl">

            <Modal.Header closeButton>
                <Modal.Title>Cropper</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Container>
                    <Row>
                        <Col lg={7} xs={12}>
                            <Cropper src={cropperImage} ref={cropperRef} style={{height: 500, width: "100%"}} guides={false} viewMode={1} preview={'.img-preview'} crop={onCrop}/>
                        </Col>

                        <Col lg={5} xs={12}>

                            <div className="position-relative" style={{height: 500, width: "100%"}}>

                                <h3 className="text-center">Preview</h3>

                                <StyledPreview>
                                    <div className="img-preview"></div>
                                </StyledPreview>


                                <div className="w-100 p-2 position-absolute bottom-0 d-flex justify-content-evenly">

                                    <ul className="list-group list-group-horizontal-sm">
                                        <li className="list-group-item list-group-item-info">width</li>
                                        <li className="list-group-item">{Math.floor(details.width)} px</li>
                                    </ul>
        
                                    <ul className="list-group list-group-horizontal-sm">
                                        <li className="list-group-item list-group-item-info">height</li>
                                        <li className="list-group-item">{Math.floor(details.height)} px</li>
                                    </ul>

                                </div>
                            </div>


                        </Col>
                    </Row>
                </Container>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={reset}>Reset</Button>

                <Button variant="primary" onClick={save}>Save</Button>
            </Modal.Footer>
        </Modal>
 
    </div>);
};

export default forwardRef(ModalCropper);