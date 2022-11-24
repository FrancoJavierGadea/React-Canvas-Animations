import { useEffect, useState } from "react";

const initialValue = { imageColor: false, colorArray: [], color: '#ffffff', number: 5000, velocity: 1.5 };

function DrawImageRainControls({options, setOptions}) {

    const [values, setValues] = useState(initialValue);

    useEffect(() => {
        
        const aux = { ...initialValue }

        if(options.particle && options.particle.mapColor) aux.imageColor = options.particle.mapColor;

        if(options.number) aux.number = options.number;

        if(options.particle && options.particle.color){

            let { particle: {color}} = options;

            if(Array.isArray(color)){

                aux.colorArray = color;

                aux.color = color[color.length - 1];
            }

            if(typeof color === "string"){

                aux.color = color
            }
        }

        if(options.particle && options.particle.velocity !== undefined) aux.velocity = options.particle.velocity;

        setValues(aux);

    }, [options]);



    const activateImageColor = ({target: {checked}}) => {

        setValues({
            ...values,
            imageColor: checked
        });

        setOptions({
            ...options,
            particle: {
                ...options.particle,
                mapColor: checked
            }
        });
    }

    const changeColorArray = ({target: {value}}) => {
  
        setValues({
            ...values,
            color: value,
            colorArray: [...values.colorArray, value]
        });
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                color: [...values.colorArray, value]
            }
        });
    }


    const changeColor = ({target: {value}}) => {

        setValues({
            ...values,
            color: value,
            colorArray: []
        }); 
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                color: value
            }
        });
    }


    const changeNumberOfParticles = ({target: {value}}) => {

        setValues({...values, number: value});

        if(Number(value)< 0 || Number(value) > 5000) return;
        
        setOptions({
            ...options,
            number: Number(value)
        });
    }


    const changeVelocity = ({target: {value}}) => {

        if(Number(value) < 0 || Number(value) > 10) return;

        setValues({...values, velocity: value});

        setOptions({
            ...options,
            particle: {
                ...options.particle,
                velocity: Number(value)
            }
        });
    }

    return (<>
        <div className="d-flex align-items-center" style={{maxWidth: '300px'}}>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" checked={values.imageColor} onChange={activateImageColor} title="Usar los colores de la Imagen"/>
            </div>  

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColor} value={values.color} title="Color" disabled={values.imageColor || ''}></input>

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColorArray} value={values.color} title="Multiples Colors" disabled={values.imageColor || ''}></input>
        </div>

        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="5000" step="100" onChange={changeNumberOfParticles} value={values.number} title="Cantidad de Particulas"></input>

        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="10" step="0.5" onChange={changeVelocity} value={values.velocity} title="Velocidad"></input> 
    </>);
}

export default DrawImageRainControls;