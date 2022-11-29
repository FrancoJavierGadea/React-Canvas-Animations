import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { katakana, latin, nums } from "./MatrixAnimation";


function AlphabetControl({title, defaultValue = '', onChange}){

    const [alphabet, setAlphabet] = useState(defaultValue);

    const [values, setValues] = useState({numbers: true, latin: true, katakana: true});

    useEffect(() => {

        setValues({

            numbers: alphabet.includes(nums),

            latin: alphabet.includes(latin),

            katakana: alphabet.includes(katakana)
        });


    }, [alphabet]);


    //* Modal
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    
    const hide = () => setVisible(false);

    const save = () => {

        hide();

        onChange(alphabet);
    }


    const addAlphabet = ({target: {name, value}}) => {

        if(values[name]){

            setAlphabet(alphabet.replace(value, ''));
        }
        else {
        
            setAlphabet(alphabet.concat(value));
        }
    }

    const changeAlphabet = ({target: {value}}) => {

        setAlphabet(value);
    }

    return (<>
    
        <Button variant="secondary" onClick={show} title={title}>Alphabet</Button>

        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Alphabet</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="katakana" value={katakana} checked={values.katakana} onChange={addAlphabet} />
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Katakana</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{katakana}</span>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="numbers" value={nums} checked={values.numbers} onChange={addAlphabet} />
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Numbers</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{nums}</span>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="latin" value={latin} checked={values.latin} onChange={addAlphabet} />
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Latin</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{latin}</span>
                    </div>
                </div>

                <div className="mb-3">
                    <Form.Control as="textarea" rows={7} value={alphabet} onChange={changeAlphabet}/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>

                <Button variant="primary" onClick={save}>Save</Button>
            </Modal.Footer>
      </Modal>
    
    </>);
}

export default AlphabetControl;