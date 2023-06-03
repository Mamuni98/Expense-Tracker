import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useNavigate();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirm = confirmPasswordRef.current.value;
      if (email.length > 0 && password.length > 0 && password === confirm) {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        );
        if (response) {
          alert("Successfully Signed Up");
        }
        history("/logIn");
      }
      else{
        alert("Unable to Sign Up. Please check the password again.")
      }
    } catch (err) {
      const alertmsg = err.response.data.error.message;
      alert(alertmsg);
    }
    setIsLoading(false);
    event.target.reset();
  };
  return (
    <Container className="w-50">
      <div className="text-center mt-2 mb-5">
        <h1 className="my-1" style={{ fontFamily: "cursive", color: "aqua" }}>
          Welcome!
        </h1>
        <p className="text-white">
          Sign Up with your email address to create an
          account.
        </p>
      </div>
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "85%",
          margin: "1rem auto",
        }}
      >
        <h3
          className="mb-4"
          style={{
            fontFamily: "cursive",
            color: "aqua",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </h3>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
            />
          </Form.Group>
          <div className="text-center mt-4">
            {!isLoading ? (
              <Button variant="info" type="submit" className="text-white" style={{maxWidth:"100%", width:"100%"}}>
                Sign Up
              </Button>
            ) : (
              <p style={{ color: "rgb(10, 216, 248)" }}>Sending request...</p>
            )}
          </div>
        </Form>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/logIn">
              <Button variant="link" className="text-info">
                Go to Log In
              </Button>
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};
export default SignUp;
