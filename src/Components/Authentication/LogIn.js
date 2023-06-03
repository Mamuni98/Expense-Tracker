import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/auth-context";

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCntxt = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const token = response.data.idToken;
      if (token) {
        alert("Successfully Logged In");
        authCntxt.LogIn(token);
        history("/home");
      }
    } catch (err) {
      const alertmsg = err.response.data.error.message;
      alert(alertmsg);
    }
    setIsLoading(false);
    event.target.reset();
  };

  return (
    <Container className="w-50 mt-5">
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "80%",
          margin: "1rem auto",
          marginTop: "5rem",
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
          Log In
        </h3>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
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

          <div className="text-center mt-4">
            {!isLoading ? (
              <Button
                variant="info"
                type="submit"
                className="text-white"
                style={{ maxWidth: "100%", width: "100%" }}
              >
                Log In
              </Button>
            ) : (
              <p style={{ color: "rgb(10, 216, 248)" }}>Sending request...</p>
            )}
          </div>
        </Form>
        <div className="text-center my-2">
          <Button variant="link" className="text-info">
            Forgot password
          </Button>
        </div>
        <div className="text-center">
          <p>
            New user?{" "}
            <Link to="/">
              <Button variant="link" className="text-info">
                Create an account
              </Button>
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};
export default LogIn;
