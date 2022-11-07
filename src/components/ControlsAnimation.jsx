
import { Button } from "react-bootstrap";
import SnowAnimationControls from "./CustomControls/SnowAnimationControls";

import { SnowAnimation } from "../helpers/SnowAnimation";
import MatrixAnimationControls from "./CustomControls/MatrixAnimationControls";
import { MatrixAnimation } from "../helpers/MatrixAnimation";


function ControlsAnimation({animation, setStart, options, setOptions}) {


    const startAnimation = () => {

        setStart(true);
    }

    const stopAnimation = () => {

        setStart(false);
    }
    
    return (<div className="ControlsAnimation">

        <div className="d-flex justify-content-evenly my-2 p-2 bg-secondary bg-gradient rounded">

            <Button variant="primary" onClick={startAnimation}>Start</Button>

            <Button variant="danger" onClick={stopAnimation}>Stop</Button>

            { animation === SnowAnimation ? <SnowAnimationControls options={options} setOptions={setOptions} /> : '' }

            { animation === MatrixAnimation ? <MatrixAnimationControls options={options} setOptions={setOptions} /> : '' }
                    
        </div>

    </div>);
}

export default ControlsAnimation;