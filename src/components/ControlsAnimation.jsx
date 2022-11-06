import { useState } from "react";
import { Button } from "react-bootstrap";


function ControlsAnimation({setStart, options, setOptions}) {

    const [inputs, setInputs] = useState({colorArray: [], color: '#ffffff', number: 5000, velocity: 1.5});

    const startAnimation = () => {

        setStart(true);
    }

    const stopAnimation = () => {

        setStart(false);
    }

    const changeColorArray = ({target: {value}}) => {
  
        setInputs({
            ...inputs,
            color: value,
            colorArray: [...inputs.colorArray, value]
        });
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                color: [...inputs.colorArray, value]
            }
        });
    }

    const changeColor = ({target: {value}}) => {

        setInputs({
            ...inputs,
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

        setInputs({...inputs, number: value});

        if(Number(value)< 0 || Number(value) > 5000) return;
        
        setOptions({
            ...options,
            number: Number(value)
        });
    }

    const changeVelocity = ({target: {value}}) => {

        setInputs({...inputs, velocity: value});

        if(Number(value) < 0 || Number(value) > 10) return;
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                velocity: Number(value)
            }
        });
    }

    return (<div className="ControlsAnimation">

        <div className="d-flex justify-content-evenly my-2 p-2 bg-secondary bg-gradient rounded">

            <Button variant="primary" onClick={startAnimation}>Start</Button>

            <Button variant="danger" onClick={stopAnimation}>Stop</Button>

            <div className="d-flex" style={{maxWidth: '150px'}}>  

                <input type="color" className="form-control form-control-color mx-1" onChange={changeColor} value={inputs.color} title="Color"></input>

                <input type="color" className="form-control form-control-color mx-1" onChange={changeColorArray} value={inputs.color} title="Multiples Colors"></input>
            </div>


            <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="5000" step="100" onChange={changeNumberOfParticles} value={inputs.number} title="Cantidad de Particulas"></input>

            <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="10" step="0.5" onChange={changeVelocity} value={inputs.velocity} title="Velocidad"></input>
        </div>

    </div>);
}

export default ControlsAnimation;