
import React, { useEffect, useRef, useState } from 'react';


//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//? Imagen de Prueba
import blackhole from "./assets/images/blackhole.jpg";

import { Container } from 'react-bootstrap';
import ImageLoaderComponent from './components/ImageLoader/ImageLoaderComponent';
import DrawImageCanvas from './components/DrawImageCanvas';


function App() {

	const [image, setImage] = useState(null);


	useEffect(() => {

		const img = new Image();

		img.src = blackhole;

		img.onload = () => {

			setImage({
				img,
				width: img.width / 2,
				height: img.height / 2
			})
		}

	}, []);


	return (<div className="App bg-dark p-2 vh-100">

		<Container>

			<ImageLoaderComponent className="p-2 d-flex justify-content-evenly" maxWidth={500} maxHeight={500} onChange={(image) => setImage(image)} />

			<DrawImageCanvas image={image} style={{overflow: 'hidden'}} />

		</Container>

	</div>);
}

export default App;
