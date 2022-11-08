import { useState } from "react";
import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { DrawImageRain } from "../helpers/DrawImageRain";
import { MatrixAnimation } from "../helpers/MatrixAnimation";
import { SnowAnimation } from "../helpers/SnowAnimation";



const Animations = {
    SnowAnimation,
    MatrixAnimation,
    DrawImageRain
}

function SelectAnimation({onChange}) {

    
    const [values, setValues] = useState({SnowAnimation: true, MatrixAnimation: false, DrawImageRain: false});

    const handleChange = (value) => {

        console.log(value);

        let aux = {};

        for (const key in values) {

            aux = { ...aux, [key]: key === value };
        }

        setValues(aux);

        if(onChange) onChange(Animations[value]);
    }

    return (<div className="SelectAnimation">


        <Container className="py-2 text-center">

            <ToggleButtonGroup type="radio" name="options" defaultValue={'SnowAnimation'} onChange={handleChange}>

                <ToggleButton className="px-5" id="tbg-radio-1" value={'SnowAnimation'} variant={values.SnowAnimation ? 'primary' : 'secondary'}>Snow Animation</ToggleButton>

                <ToggleButton className="px-5" id="tbg-radio-2" value={'MatrixAnimation'} variant={values.MatrixAnimation ? 'primary' : 'secondary'}>Matrix Animation</ToggleButton>

                <ToggleButton className="px-5" id="tbg-radio-3" value={'DrawImageRain'} variant={values.DrawImageRain ? 'primary' : 'secondary'}>Draw Image Rain</ToggleButton>
            </ToggleButtonGroup>

        </Container>

    </div>);
}

export default SelectAnimation;