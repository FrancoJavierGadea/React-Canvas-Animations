import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { getBase64 } from "../../helpers/ImageLoader";
import ModalCropper from "./ModalCropper";


function ImageLoaderComponent({onChange, maxWidth, maxHeight, className, style}) {

    const modalRef = useRef();

    const [src, setSrc] = useState(null);


    useEffect(() => {
        
        if(src){

            const image = new Image();

            image.src = src;

            image.onload = () => {

                let scaleX = 1;
                let scaleY = 1;
                let scale = 1;
                let width = image.naturalWidth;
                let height = image.naturalHeight;

                //* Calcular y escalar la Imagen
                if(maxWidth && maxHeight){

                    scaleX = image.naturalWidth > maxWidth ? maxWidth / image.naturalWidth : 1;
            
                    scaleY = image.naturalHeight > maxHeight ? maxHeight / image.naturalHeight : 1;
    
                    scale = scaleX < scaleY ? scaleX : scaleY;
                    
                    width = scale < 1 ? image.naturalWidth * scale : image.naturalWidth;
    
                    height = scale < 1 ? image.naturalHeight * scale : image.naturalHeight;
                }


                onChange({
                    img: image,
                    naturalWidth: image.naturalWidth,
                    naturalHeight: image.naturalHeight,
                    scale,
                    width,
                    height
                });
            }
        }

    }, [src]);


    const loadImage = (e) => {

        const file = e.target.files[0];

        const image = getBase64(file);

        image.then((value) => {

            modalRef.current.setFileType(file.type);

            modalRef.current.setCropperImage(value.base64);

            modalRef.current.show();
        })
        .catch((error) => {

            console.log(error);
        })
    }


    const cropperOnChange = (value) => {

        setSrc(value);
    }


    return (<div>

        <ModalCropper ref={modalRef} onChange={cropperOnChange}></ModalCropper>

        <div className={className} style={style}>

            <label className="btn btn-primary">

                <input className="d-none" type="file" accept="image/*" id="image-input" onChange={loadImage}/>

                <i className="bi bi-upload mx-2"></i>

                Cargar Imagen
            </label>

            <Button variant="secondary" onClick={() => modalRef.current.show()}>Update Image</Button>

            <a className="btn btn-success" href={src} target="_blank" rel="noreferrer" download="image">
                <i className="bi bi-download mx-2"></i>
                Descargar Imagen
            </a>

        </div>


    </div>);
}

export default ImageLoaderComponent;