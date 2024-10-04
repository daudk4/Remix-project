import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const InputField = ({inputValue, handleInputChange, handleSubmit}) => {

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicInput">
        <Form.Label>Contract address:</Form.Label>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your contract address.."
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};


