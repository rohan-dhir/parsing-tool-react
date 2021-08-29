import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBar = (props) => {

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
                    console.log(brand + " " + title + " " + model);
                    break;
                }
            }
    }

    return (
        <>
            <Form onSubmit={filterData}>
                <div className="mr-auto ml-auto col-md">
                    <Form.Control className="form-input" type="text" placeholder="Try 'blah blah D750 blah blah Nikon something DSLR' " value={value} onChange={onInput}/>
                </div>
                <div className="mr-auto ml-auto col-md">
                    <Button type="submit" className="btn">Parse</Button>
                </div>
            </Form>
        </>
    );
}

export default SearchBar;