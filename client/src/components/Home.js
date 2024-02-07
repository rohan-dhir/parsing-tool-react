import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Styles.css';

import SearchBar from './SearchBar';
import ModalWindow from './ModalWindow';
import NewProductForm from './NewProductForm';

import { useModal } from '../util/hooks';

const Home = () => {

    const { loading, data, refetch } = useQuery(FETCH_PRODUCT_QUERY);
    const { handleClose, handleShow, show } = useModal(false);

    //Array of regular expressions for comparisons
    const queryRegex = [];
    
    if(data) {   
        //Generate a regex for each product from the database
        for (let i = 0; i < data.getProducts.length; i++) {
            const { brand, title, model } = data.getProducts[i];
            queryRegex.push(`^(?=.*\\b${brand}\\b)(?=.*\\b${title}\\b)(?=.*\\b${model}\\b).+`);
        }
    } 

    const onClick = () => {
        handleShow();
    }

    return (
        <div className="main">
            <Container>
                    <Row>
                        <h1 className="label primary-header">Text Parser</h1>
                    </Row>
                    <Row>
                        <Col>
                            <p className="description primary-desc">
                                Hi there! This app is designed to remove extraneous details from text input such as a product title on an e-commerce page. This works by comparing your input to a database of known products and then parsing the text as such. Give it a try!
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {loading ? (
                            <div className="spinner spinner-border text-light" role="status" />
                        ) : (
                            <SearchBar queryRegex={queryRegex} queryResult={data} />
                        )
                        }
                        
                    </Row>
                    <Row>
                        <h2 className="label secondary-header">Not parsing your text?</h2>
                    </Row>
                    <Row>
                        <Col>
                            <p className="description secondary-desc">
                                Maybe the product you're looking for is not in the database. Try adding a new product.
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button type="submit" className="btn btn-newProduct" onClick={onClick}>Add New Product</Button>
                    </Row>    
            </Container>

            <ModalWindow 
                show={show} 
                title="Add New Product" 
                description={<NewProductForm onHide={handleClose} refetch={refetch} />} 
                onClose={handleClose} 
            />
        </div>
    );
}

const FETCH_PRODUCT_QUERY = gql`
    {
        getProducts {
            id
            brand
            title
            model
        }
    }
`

export default Home;