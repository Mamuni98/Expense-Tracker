import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useContext} from 'react';
import AuthContext from "../contexts/auth-context";

const Home = () => {
  const authCntxt = useContext(AuthContext);
  return (
    <>
      <h2 style={{ color: "white" }}>
        {" "}
        Welcome to my expense tracker website...
      </h2>
      <div className="text-end">
        {!authCntxt.userProfile && <Button variant="info">
          Your profile is incomplete.
          <Link to="/profile">
            <Badge bg="info">Complete now</Badge>
          </Link>
        </Button>}
      </div>
    </>
  );
};
export default Home;
