import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import AlphabetControl from "./AlphabetControl";


function MatrixAnimationControls({initialValues, onChange}) {

    const [values, setValues] = useState(initialValues);

    useEffect(() => {

        if(values !== initialValues){

            onChange(values);
        }

    }, [values]);

    
    const changeDrawImage = ({target: {checked}}) => {
        
        setValues({...values, drawImage: checked});
    }
    
    const changeAlphabet = (value) => {

        setValues({...values, alphabet: value});
    }

    const changeFontSize = ({target: {value}}) => {

        if(value < 5 || value > 50) return;

        setValues({...values, particle: {...values.particle, fontSize: Number(value)}});
    }

    const chageVelocity = ({target: {value}}) => {

        if(value < 0 || value > 10) return;

        setValues({...values, particle: {...values.particle, velocity: Number(value)}});
    }

    const chageColor = ({target: {value}}) => {

        setValues({...values, particle: {...values.particle, color: value}})
    }


    return (<>

        <div className="d-flex align-items-center" title={'Pintar imagen de fondo'}>
 
            <Form.Check type="switch" checked={values.drawImage} onChange={changeDrawImage} />

        </div>

        <AlphabetControl defaultValue={values.alphabet} onChange={changeAlphabet} title={'Cambiar el Alfabeto'}/>
    
        <Form.Control type="number" min={5} max={50} step={1} value={values.particle.fontSize} onChange={changeFontSize} title={'Tamaño de fuente'} style={{maxWidth: '100px'}}/>

        <Form.Control type="number" min={0} max={10} step={0.1} value={values.particle.velocity} onChange={chageVelocity} title={'Velocidad'} style={{maxWidth: '100px'}}/>

        <Form.Control type="color" value={values.particle.color} onChange={chageColor} title={'Color'} />

    </>);
}

export default MatrixAnimationControls;