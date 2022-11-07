import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { katakana, latin, nums } from "../../../helpers/MatrixAnimation";


function AlphabetControl({onChange}){

    const [values, setValues] = useState({numbers: true, latin: true, katakana: true, alphabet: nums + latin + katakana});

    //* Modal
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    
    const hide = () => setVisible(false);

    const save = () => {

        hide();

        onChange({value: values.alphabet});

    }

    const addAlphabet = ({target: {value, checked, name}}) => {

        setValues({
            ...values,
            [name]: checked,
            alphabet: checked ? values.alphabet.concat(value) : values.alphabet.replace(value, '')
        })
    }

    const changeAlphabet = ({target: {value}}) => {

        setValues({...values, alphabet: value})
    }

    return (<>
    
        <Button variant="primary" onClick={show}>Alphabet</Button>

        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Alphabet</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="katakana" value={katakana} checked={values.katakana} onChange={addAlphabet}/>
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Katakana</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{katakana}</span>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="numbers" value={nums} checked={values.numbers} onChange={addAlphabet}/>
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Numbers</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{nums}</span>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-text list-group-item-success">
                            <input className="form-check-input mt-0" type="checkbox" name="latin" value={latin} checked={values.latin} onChange={addAlphabet}/>
                        </div>
                        <span className="input-group-text list-group-item-info" style={{width: '100px'}}>Latin</span>
                        <span className="input-group-text text-truncate" style={{width: '320px'}}>{latin}</span>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Custom Alphabet</label>
                    <textarea className="form-control" rows="7" value={values.alphabet} onChange={changeAlphabet}></textarea>
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