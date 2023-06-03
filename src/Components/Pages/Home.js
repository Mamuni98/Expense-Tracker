import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2 style={{ color: "white" }}>
        {" "}
        Welcome to my expense tracker website...
      </h2>
      <div className="text-end">
        <Button variant="info">
          Your profile is incomplete.
          <Link to="/profile">
            <Badge bg="info">Complete now</Badge>
          </Link>
        </Button>
      </div>
    </>
  );
};
export default Home;
