import React, { useRef, useState, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import ProfileContext from "../contexts/profile-context";

const Profile = () => {
  const nameRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const numberRef = useRef();

  const [updateForm, setupdateForm] = useState(false);
  const [verified, setVerified] = useState(false);
  const profileCntxt = useContext(ProfileContext);

  const showUpdateForm = (event) => {
    event.preventDefault();
    setupdateForm(true);
  };

  const hideUpdateForm = (event) => {
    event.preventDefault();
    setupdateForm(false);
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      
        alert("Successfully verified user email");
        setVerified(true);
      
    } catch (err) {
      const alertmsg = err.response.data.error.message;
      alert(alertmsg);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    profileCntxt.updateUserName(name);
    setupdateForm(false);
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
        <div className="d-flex flex-row justify-content-around">
          <FaUserCircle size="150px" color="grey" />
          <div className="d-flex flex-column justify-content-center">
            <h2
              style={{
                fontFamily: "cursive",
                color: "aqua",
                fontWeight: "bold",
              }}
            >
              {profileCntxt.name}
            </h2>
            {!verified ? (
              <Button variant="secondary" onClick={verifyEmailHandler}>
                Verify Email
              </Button>
            ) : (
              <Button variant="success">Email Verified</Button>
            )}
            <Button variant="outline-dark" onClick={showUpdateForm}>
              Edit
            </Button>
          </div>
        </div>
      </Card>
      {updateForm && (
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
            <Button
              variant="outline-danger"
              style={{ float: "right" }}
              onClick={hideUpdateForm}
            >
              Cancel
            </Button>
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
      )}
    </Container>
  );
};
export default Profile;
