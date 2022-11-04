
import React, { useState } from 'react';


//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container } from "react-bootstrap";

import styled from "styled-components";

import blackhole from "./assets/images/blackhole.jpg";
import { getBase64 } from './helpers/ImageLoader';


const StyledContainer = styled.div`

  --grid-bg-size: 15px;
  --grid-bg-color: #ffffff50;
  
  height: 80vh;

  background-size: var(--grid-bg-size, 40px) var(--grid-bg-size, 40px);    
  background-image: repeating-linear-gradient(0deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px)), repeating-linear-gradient(-90deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px));

  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

`;


function App() {

  const [image, setImage] = useState(blackhole);

  const loadImage = (e) => {

    const file = e.target.files[0];

    const img = getBase64(file);

    img.then((value) => {

      setImage(value.base64);
    })
    .catch((error) => {

      console.log(error);
    })
  }

  return (
    <div className="App bg-dark p-2 vh-100">
      
      <Container className="p-0 border border-secondary rounded">
        <StyledContainer>
          <img src={image}></img>
        </StyledContainer>
      </Container>


      <Container className="bg-light my-2 p-2 rounded d-flex justify-content-around">

        <label className="btn btn-primary">
          <input className="d-none" type="file" accept="image/*" id="img-input" onChange={loadImage}/>
          Cargar Imagen
        </label>

      </Container>

    </div>
  );
}

export default App;
