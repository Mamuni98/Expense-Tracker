import { Card, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useRef} from "react";
const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    
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
          marginTop:"5rem"
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
        <Form>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
          </Form.Group>

          <div className="text-center">
            <Button variant="info" type="submit" className="my-3 text-white">
              Submit
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <p>
            New user?{" "}
            <Link to="/"><Button variant="link" className="text-info">
              Create an account
            </Button></Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};
export default LogIn;
