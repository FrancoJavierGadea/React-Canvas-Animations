import { useState } from "react";



function SnowAnimationControls({options, setOptions}){

    const [values, setValues] = useState({drawImage: true, colorArray: [], color: '#ffffff', number: 5000, velocity: 1.5});


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

        setValues({...values, velocity: value});

        if(Number(value) < 0 || Number(value) > 10) return;
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                velocity: Number(value)
            }
        });
    }

    const changeDrawImage = ({target: {checked}}) => {

        setValues({
            ...values,
            drawImage: checked
        });

        setOptions({
            ...options,
            drawImage: checked
        })
    }

    return (<>

        <div className="d-flex align-items-center">

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" checked={values.drawImage} onChange={changeDrawImage} title="Pintar imagen de fondo"/>
            </div>  
            
        </div>

        <div className="d-flex" style={{maxWidth: '150px'}}>  

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColor} value={values.color} title="Color"></input>

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColorArray} value={values.color} title="Multiples Colors"></input>
        </div>

        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="5000" step="100" onChange={changeNumberOfParticles} value={values.number} title="Cantidad de Particulas"></input>

        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="10" step="0.5" onChange={changeVelocity} value={values.velocity} title="Velocidad"></input> 
    </>);
}

export default SnowAnimationControls;