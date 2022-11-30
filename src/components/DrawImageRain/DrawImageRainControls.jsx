import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function MapColorRainControls({initialValues, onChange}) {


    const [values, setValues] = useState(initialValues);

    useEffect(() => {

        if(values !== initialValues){

            onChange(values);
        }

    }, [values]);


    const changeMapColor = ({target: {checked}}) => {

        setValues({...values, particle: {...values.particle, mapColor: checked}});
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

        <Form.Control type="number" min={0} max={10} step={0.1} value={values.particle.velocity} onChange={chageVelocity} title={'Velocidad'} style={{maxWidth: '100px'}}/>
    
        <Form.Control type="number" min={0} max={5000} step={100} value={values.number} onChange={changeNumberOfParticles} title={'Cantidad de Particulas'} style={{maxWidth: '100px'}}/>


        <div className="d-flex align-items-center" title={'Usar los colores de la Foto'}>
 
            <Form.Check type="switch" checked={values.particle.mapColor} onChange={changeMapColor} />

        </div>

        <Form.Control type="color" value={values.particle.color} onChange={chageColor} title={'Color'} disabled={values.particle.mapColor || ''}/>

    </>);
}

export default MapColorRainControls;