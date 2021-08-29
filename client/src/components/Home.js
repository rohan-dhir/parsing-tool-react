import React from 'react';
import './Styles.css';
import SearchBar from './SearchBar';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {

    const { loading, data } = useQuery(FETCH_PRODUCT_QUERY);

    //Array of regular expressions for comparisons
    const queryRegex = [];
    
    if(data) {   
        //Generate a regex for each product from the database
        for (let i = 0; i < data.getProducts.length; i++) {
            const { brand, title, model } = data.getProducts[i];
            queryRegex.push(`^(?=.*\\b${brand}\\b)(?=.*\\b${title}\\b)(?=.*\\b${model}\\b).+`);
        }
        
    } 

    return (
        <div className="main">
            <Container>
                    <Row>
                        <h1 className="label">Text Parser</h1>
                    </Row>
                    <Row>
                        <Col>
                            <p className="description">
                                Hi there! This app is designed to remove extraneous details from text input such as a product title on an e-commerce page. This works by comparing your input to a database of known products and then parsing the text as such. Give it a try!
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {loading ? (
                        <h1>Loading</h1>
                        ) :(
                            data ? (
                            <SearchBar queryRegex={queryRegex} queryResult={data} />
                            ) : (
                                <h4>Error: The database appears to be empty.</h4>
                            )
                        )
                        }
                        
                    </Row>
                
            </Container>
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