import {  useEffect, useState } from "react";
import { Form } from "react-bootstrap";


function SnowAnimationControls({initialValues, onChange}) {

    const [values, setValues] = useState(initialValues);

    useEffect(() => {

        if(values !== initialValues){

            onChange(values);
        }

    }, [values]);


    const changeDrawImage = ({target: {checked}}) => {

        setValues({...values, drawImage: checked});
    }

    const changeNumberOfParticles = ({target: {value}}) => {

        if(value < 0 || value > 5000) return;

        setValues({...values, number: Number(value)});
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
    
        <Form.Control type="number" min={0} max={5000} step={100} value={values.number} onChange={changeNumberOfParticles} title={'Cantidad de Particulas'} style={{maxWidth: '100px'}}/>

        <Form.Control type="number" min={0} max={10} step={0.1} value={values.particle.velocity} onChange={chageVelocity} title={'Velocidad'} style={{maxWidth: '100px'}}/>

        <Form.Control type="color" value={values.particle.color} onChange={chageColor} title={'Color'} />


    </>);
}

export default SnowAnimationControls;