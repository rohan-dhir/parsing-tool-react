import React from 'react';
import './Styles.css';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Home = () => {
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
                        <div className="mr-auto ml-auto col-md">
                            <Form.Control className="form-input" type="text" placeholder="Try 'blah blah D750 blah blah Nikon something DSLR' " />
                        </div>
                        <div className="mr-auto ml-auto col-md">
                            <Button className="btn">Parse</Button>
                        </div>
                    </Row>
                
            </Container>
        </div>
    );
}

export default Home;