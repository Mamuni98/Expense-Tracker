import React, { useRef, useContext, useState, useEffect } from "react";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";
import ExpenseContext from "../contexts/e-context";

const AddExpense = () => {
  const eContext = useContext(ExpenseContext);
  const catagoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const objectArr = Object.keys(eContext.editList);
    if (objectArr.length > 0) {
      catagoryRef.current.value = eContext.editList.catagory;
      descriptionRef.current.value = eContext.editList.description;
      amountRef.current.value = eContext.editList.amount;
    }
  }, [eContext.editList]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const expenseData = {
      catagory: catagoryRef.current.value,
      description: descriptionRef.current.value,
      amount: Number(amountRef.current.value),
    };
    eContext.addExpense(expenseData);
    setIsLoading(false);
    event.target.reset();
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
          marginTop: "2rem",
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
            <InputGroup>
              <InputGroup.Text>Rs.</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                ref={amountRef}
              />
            </InputGroup>
          </Form.Group>

          <div className="text-center mt-4">
            {!isLoading ? (
              <Button
                variant="info"
                type="submit"
                className="text-white mb-2"
                style={{ maxWidth: "25%", width: "100%" }}
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
