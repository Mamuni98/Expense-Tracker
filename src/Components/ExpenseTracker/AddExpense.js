import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";

const AddExpense = () => {
  const catagoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const editList = useSelector((state) => state.expenses.editList);
  useEffect(() => {
    const objectArr = Object.keys(editList);
    if (objectArr.length > 0) {
      catagoryRef.current.value = editList.catagory;
      descriptionRef.current.value = editList.description;
      amountRef.current.value = editList.amount;
    }
  }, [editList]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const expenseData = {
      id: Math.random().toString(),
      catagory: catagoryRef.current.value,
      description: descriptionRef.current.value,
      amount: Number(amountRef.current.value),
    };
    dispatch(expenseActions.addExpense(expenseData));
    event.target.reset();
    setIsLoading(false);
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
          marginTop: "1rem",
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
