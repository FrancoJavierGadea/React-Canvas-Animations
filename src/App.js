
import React, { useRef, useState } from 'react';


//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container } from "react-bootstrap";

import styled from "styled-components";

import blackhole from "./assets/images/blackhole.jpg";
import { getBase64 } from './helpers/ImageLoader';
import ModalCropper from './components/ModalCropper';

import CanvasAnimation from './components/CanvasAnimation';




function App() {

  const modal = useRef();

  const [image, setImage] = useState(blackhole);

  const [download, setDownload] = useState(null);

  const loadImage = (e) => {

    const file = e.target.files[0];

    const img = getBase64(file);

    img.then((value) => {

      modal.current.setFileType(file.type);

      modal.current.setCropperImage(value.base64);

      modal.current.show();
    })
    .catch((error) => {

      console.log(error);
    })
  }

  return (
    <div className="App bg-dark p-2 vh-100">
      
      <Container className="p-0 rounded">
        
        <CanvasAnimation src={image} setDownload={setDownload}></CanvasAnimation>
        
      </Container>


      <Container className="bg-light my-2 p-2 rounded d-flex justify-content-evenly">

        <label className="btn btn-primary">
          <input className="d-none" type="file" accept="image/*" id="img-input" onChange={loadImage}/>
          <i className="bi bi-upload mx-2"></i>
          Cargar Imagen
        </label>

        <Button variant="secondary" onClick={() => modal.current.show()}>Update Image</Button>

        <a className="btn btn-success" href={download} target="_blank" rel="noreferrer" download="image">
          <i className="bi bi-download mx-2"></i>
          Download
        </a>

      </Container>

      <ModalCropper ref={modal} setImage={setImage}></ModalCropper>

    </div>
  );
}

export default App;
