import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageLoaderComponent from "../ImageLoader/ImageLoaderComponent";
import DrawImageCanvas from "./DrawImageCanvas";

//? Imagen de Prueba
import blackhole from "../../assets/images/blackhole.jpg";

function DrawImageComponent() {

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


    return (<div className="DrawImageComponent">

        <Container>

            <DrawImageCanvas image={image} style={{overflow: 'hidden'}} />

			<div className="mt-2 p-2 rounded" style={{backgroundColor: '#324897'}}>

            	<ImageLoaderComponent className="d-flex justify-content-evenly" maxWidth={500} maxHeight={500} onChange={(image) => setImage(image)} />

			</div>
        
		</Container>

    </div>);
}

export default DrawImageComponent;