
import React, { useRef, useState } from 'react';


//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container } from "react-bootstrap";

import blackhole from "./assets/images/blackhole.jpg";
import { getBase64 } from './helpers/ImageLoader';
import ModalCropper from './components/ModalCropper';

import CanvasAnimation from './components/CanvasAnimation';
import SelectAnimation from './components/SelectAnimation';




function App() {

  const modalRef = useRef();

  const canvasRef = useRef();

  const [image, setImage] = useState(blackhole);

  const [download, setDownload] = useState(null);

  const loadImage = (e) => {

    const file = e.target.files[0];

    const img = getBase64(file);

    img.then((value) => {

      modalRef.current.setFileType(file.type);

      modalRef.current.setCropperImage(value.base64);

      modalRef.current.show();
    })
    .catch((error) => {

      console.log(error);
    })
  }

  const selectAnimation = (animation) => {

    canvasRef.current.setOptions({});
    
    canvasRef.current.setAnimation(() => animation);

  }

  return (
    <div className="App bg-dark p-2 vh-100">

      <SelectAnimation onChange={selectAnimation}></SelectAnimation>
      
      <Container className="p-0 rounded">
        
        <CanvasAnimation src={image} setDownload={setDownload} ref={canvasRef}></CanvasAnimation>
        
      </Container>


      <Container className="bg-light my-2 p-2 rounded d-flex justify-content-evenly">

        <label className="btn btn-primary">
          <input className="d-none" type="file" accept="image/*" id="img-input" onChange={loadImage}/>
          <i className="bi bi-upload mx-2"></i>
          Cargar Imagen
        </label>

        <Button variant="secondary" onClick={() => modalRef.current.show()}>Update Image</Button>

        <a className="btn btn-success" href={download} target="_blank" rel="noreferrer" download="image">
          <i className="bi bi-download mx-2"></i>
          Download
        </a>

      </Container>

      <ModalCropper ref={modalRef} setImage={setImage}></ModalCropper>

    </div>
  );
}

export default App;
