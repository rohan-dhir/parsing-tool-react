import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import './Styles.css'

const NewProductForm = (props) => {
    const { onHide, refetch } = props;
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        brand:'',
        title:'',
        model:''
    });

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    };

    const [addProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
        update(_, result) {
            if(result) {
                refetch();
                onHide();
            }
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
            
        },
        variables:values
    });

    const onSubmit = e => {
        e.preventDefault();
        addProduct();
    };

    return (
        <>
            {loading ? (
                
                <div className="spinner-border text-light" role="status" />
            ) : (

                <>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter brand" name="brand" value={values.brand} onChange={onChange} />
                            <Form.Text className="text-muted">
                            Example: Nintendo
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter product title" name="title" value={values.title} onChange={onChange} />
                            <Form.Text className="text-muted">
                            Example: Switch
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Enter product model" name="model" value={values.model} onChange={onChange} />
                            <Form.Text className="text-muted">
                            Example: OLED
                            </Form.Text>
                        </Form.Group>
                        
                        {Object.keys(errors).length > 0 && (
                            <Alert className="errors" variant="danger">
                                    {Object.values(errors).map(value => {
                                        return(
                                        <li key={value}>{value}</li>
                                        );
                                })}
                            </Alert>
                        )}

                        <Button variant="primary" type="submit" className="btn-submit">
                            Submit
                        </Button>
                        
                    </Form>
                    
                </>
            )
        }
    </>
    )
};

const CREATE_PRODUCT_MUTATION = gql `
    mutation addProduct(
        $brand:String!,
        $title:String!,
        $model:String!
    ) {
        addProduct(
            addProductInput: {
                brand: $brand,
                title: $title,
                model: $model
            }
        ){
            id, brand, title, model, dateAdded
        }
    }
`;

export default NewProductForm;
