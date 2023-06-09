import React, { useRef, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../store/profile";

const Profile = () => {
  const nameRef = useRef();
  const [updateForm, setupdateForm] = useState(false);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.profile.name);
  const idtoken = useSelector((state) => state.auth.token);
  let profileName;
  if(userName === undefined){
    profileName = "";
  }
  else{
    profileName = userName;
  }
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          idToken: idtoken,
          displayName: name,
          returnSecureToken: true,
        }
      );
      dispatch(profileActions.addUserName(name));
      setupdateForm(false);
    } catch (error) {
      console.log(error);
    }
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
              {profileName.length > 0 ? profileName : ""}
            </h2>
            {!verified ? (
              <Button variant="secondary" onClick={verifyEmailHandler}>
                Verify Email
              </Button>
            ) : (
              <Button variant="success">Email Verified</Button>
            )}
            <Button variant="outline-info" onClick={showUpdateForm}>
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
              User Detail
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
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                ref={nameRef}
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
