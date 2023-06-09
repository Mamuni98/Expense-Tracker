import { Card, Container, Form, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  
  const sendRequestHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const email = emailRef.current.value;
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );
      if (response.data) {
        //console.log(response.data);
        alert(
          "Request sent to your email. Check your email and reset password."
        )
  
      }
    } catch (err) {
      console.log(err);
      alert("Request failed...Please check your email again.");
    }
    setIsLoading(false);
  };
  return (
    <Container className="w-50 mt-5">
      <div className="text-center mt-2">
        <h1 className="my-1" style={{ fontFamily: "cursive", color: "aqua" }}>
          Looks like you forgot your password
        </h1>
        <p id="text">
          Enter a valid email address to reset your password
        </p>
      </div>
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "80%",
          margin: "1rem auto",
          marginTop: "2rem",
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
          Reset Password
        </h3>
        <Form onSubmit={sendRequestHandler}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              It usually takes a minute to receive the mail. In case you don't
              find any mail inside your mail box then then the promotion and
              spam mails.
            </Form.Text>
          </Form.Group>
          <div className="text-center mt-4">
            {!isLoading ? (
              <Button
                variant="info"
                type="submit"
                className="text-white"
                style={{ maxWidth: "100%", width: "100%" }}
              >
                Send
              </Button>
            ) : (
              <p style={{ color: "rgb(10, 216, 248)" }}>Sending request...</p>
            )}
            <Link to='/logIn'><Button
                variant="link"
                type="submit"
                className="text-success mt-2"
                style={{ maxWidth: "100%", width: "100%" }}
              >
                Go to Log In
              </Button></Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default ForgotPassword;
