import React from 'react'
import { Row, Col, Jumbotron } from 'reactstrap'

export default function Title() {
    return(
        <Row>
            <Col xs="12">
                <Jumbotron>
                    <h1>Todo App</h1>
                    <p className="lead"> React js + Firebase</p>
                </Jumbotron>
            </Col>
        </Row>
    )
}