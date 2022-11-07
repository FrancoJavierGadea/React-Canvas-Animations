import { useState } from "react";
import AlphabetControl from "./AlphabetControl";


function MatrixAnimationControls({options, setOptions}){

    const [values, setValues] = useState({colorArray: [], color: '#00ff00', velocity: 1.5, fontSize: 16});


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


    const changeVelocity = ({target: {value}}) => {

        setValues({...values, velocity: value});

        if(Number(value) < 0 || Number(value) > 5) return;
        
        setOptions({
            ...options,
            particle: {
                ...options.particle,
                velocity: Number(value)
            }
        });
    }

    const changeAlphabet = ({value}) => {

        setOptions({
            ...options,
            alphabet: value
        });
    }

    const changeFontSize = ({target: {value}}) => {

        setValues({...values, fontSize: value});

        if(Number(value) < 5 || Number(value) > 30) return;

        setOptions({
            ...options,
            particle: {
                ...options.particle,
                fontSize: Number(value)
            }
        });
    }

    return (<>
        
        <div className="d-flex" style={{maxWidth: '150px'}}>  

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColor} value={values.color} title="Color"></input>

            <input type="color" className="form-control form-control-color mx-1" onChange={changeColorArray} value={values.color} title="Multiples Colors"></input>
        </div>

        <AlphabetControl  onChange={changeAlphabet}/>

        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="5" max="30" step="1" onChange={changeFontSize} value={values.fontSize} title="Tamaño de Fuente"></input> 
    
        <input type="number" className="form-control form-control-number" style={{maxWidth: '100px'}}  min="0" max="5" step="0.1" onChange={changeVelocity} value={values.velocity} title="Velocidad"></input> 
    </>);
}



export default MatrixAnimationControls;