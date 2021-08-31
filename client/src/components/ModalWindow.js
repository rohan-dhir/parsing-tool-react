import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import "./Styles.css";

const ModalWindow = props => {
    const { show, title, description, onClose } = props;
    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {description}
                </Modal.Body>

                <Modal.Footer>
                    <br/>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ModalWindow;