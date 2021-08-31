import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useModal } from '../util/hooks';

import ModalWindow from './ModalWindow';

var parsedText = "";

const SearchBar = (props) => {

    const { handleClose, handleShow, show } = useModal(false);

    const [value, setValue] = useState(''),
        onInput =({target:{value}}) => setValue(value),
        filterData = e => {
            
            e.preventDefault()
        
            //Search through form input to match an expression from the database
            for (let i = 0; i < props.queryRegex.length; i++) {
                const result = value.match(props.queryRegex[i]);

                //If a match is found, return a modal with the match
                if(result != null) {
                    const {brand, title, model} = props.queryResult.getProducts[i];
                    parsedText = brand + " " + title + " " + model;   
                    handleShow();
            }
        }
    }

    return (
        <>
            <Form onSubmit={filterData} className="search-bar">
                <div className="mr-auto ml-auto col-md">
                    <Form.Control className="form-input" type="text" placeholder="Try 'something something DSLR something Nikon something D850 blah blah' " value={value} onChange={onInput}/>
                </div>
                <div className="mr-auto ml-auto col-md">
                    <Button type="submit" className="btn btn-search">Parse</Button>
                </div>
            </Form>
            {PopUp (show, "Parsed Text", parsedText, handleClose)} 
        </>
    );
}

const PopUp = (show, title, description, onClose) => {
    return (
        <>
            <ModalWindow show={show} title={title} description={description} onClose={onClose} />
        </>
        );
    }

export default SearchBar;