import React, { useRef } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

const AddExpense = (props) => {
  const catagoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const expense = {
      catagory: catagoryRef.current.value,
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
    };
  };
  return (
    <Container className="w-75">
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "90%",
          margin: "1rem auto",
          marginTop: "5rem",
        }}
      >
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="catagoty" className="mb-3">
            <Form.Label>Catagoty</Form.Label>
            <Form.Select aria-label="Default select example" ref={catagoryRef}>
              <option>Food</option>
              <option>Transportation</option>
              <option>Utilities</option>
              <option>Taxes</option>
              <option>Entertainment</option>
              <option>Travel</option>
              <option>Rent</option>
              <option>Groceries</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} ref={descriptionRef} />
          </Form.Group>

          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              ref={amountRef}
            />
          </Form.Group>

          <div className="text-center mt-4">
            {!isLoading ? (
              <Button
                variant="info"
                type="submit"
                className="text-white"
                style={{ maxWidth: "100%", width: "100%" }}
              >
                Add Expense
              </Button>
            ) : (
              <p style={{ color: "rgb(10, 216, 248)" }}>Adding Expense...</p>
            )}
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default AddExpense;
