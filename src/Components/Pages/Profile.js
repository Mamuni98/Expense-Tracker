import React, { useRef, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/auth-context";

const Profile = () => {
  const authCntxt = useContext(AuthContext);
  const nameRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const numberRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const details = {
        name: name,
        gender: genderRef.current.value,
        dob: dobRef.current.value,
        number: numberRef.current.value,
      };
      console.log(details);
      console.log(authCntxt.token);
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          idToken: authCntxt.token,
          displayName: name,
          returnSecureToken: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
          maxWidth: "70%",
          margin: "1rem auto",
        }}
      >
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <h2
            style={{
              fontFamily: "cursive",
              color: "aqua",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            User Details
          </h2>
          <Link to="/home">
            <Button variant="outline-danger" style={{ float: "right" }}>
              Cancel
            </Button>
          </Link>
        </div>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="name" className="mb-4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group controlId="gender" className="mb-4">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example" ref={genderRef}>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="dob" className="mb-4">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="dd/mm/yyyy" ref={dobRef} />
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-4">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter phone number"
              ref={numberRef}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="info"
              type="submit"
              className="text-white my-3"
              style={{ maxWidth: "100%", width: "100%" }}
            >
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default Profile;
