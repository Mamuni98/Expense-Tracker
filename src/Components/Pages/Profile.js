import React, { useRef, useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const nameRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const numberRef = useRef();
  const [userDisplay, setUserDisplay] = useState("");
  const [updateForm, setupdateForm] = useState(false);
  const [verified, setVerified] = useState(false);

  const idtoken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
          {
            idToken: idtoken,
          }
        );
        console.log(response.data);
        if (response.data) {
          const name = response.data.users[0].displayName;
          setUserDisplay(name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetail();
  });

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
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      if (response) {
        alert("Successfully verified user email");
        setVerified(true);
      }
    } catch (err) {
      const alertmsg = err.response.data.error.message;
      alert(alertmsg);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      setUserDisplay(name);
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          idToken: idtoken,
          displayName: name,
          returnSecureToken: true,
        }
      );
      console.log(response.data);
      if (response) {
        alert("Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
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
              {userDisplay}
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
