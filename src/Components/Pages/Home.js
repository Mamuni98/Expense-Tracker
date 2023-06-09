import { Button, Badge, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import expenseForm from "../../assets/AddExpenseForm.jpg";
import editDelete from "../../assets/DeleteEdit.jpg";
import premium from "../../assets/premium.jpg";

const Home = () => {
  const userName = useSelector((state) => state.profile.name);
  let name;
  if (userName === undefined) {
    name = "";
  } else {
    name = userName;
  }
  return (
    <Container fluid>
      {name.length === 0 && (
        <div className="text-end">
          <Button variant="info">
            Your profile is incomplete.
            <Link to="/profile">
              <Badge bg="info">Complete now</Badge>
            </Link>
          </Button>
        </div>
      )}
      <div className=" mt-3 mb-2">
        <h1
          className="my-3 text-center"
          style={{ fontFamily: "cursive", color: "aqua" }}
        >
          Getting Started
        </h1>
        <h5 id="text" style={{ lineHeight: "1.8" }}>
          1. Welcome! Now you can add expenses and make a list of expenses that
          you spent. Click on the <mark>Expense</mark> link on the navbar and
          the fill up the form. In this form you can add the <b>catagory</b> of
          your expense and then add <b>describe</b> about that expense and
          finally add the <b>amount</b> you spent on that expense. Fill all the
          fields in the form and then click on the
          <mark>Add Expense</mark> button after that you can see the list and
          the total amount you spent.
        </h5>
       
        <Image src={expenseForm} style={{height:"400px", width:"100%", maxWidth:"50rem",marginLeft:"11rem" }} rounded fluid />
       
      </div>
      <div className=" mt-4 mb-2">
        <h5 id="text" style={{ lineHeight: "1.8" }}>
          2. Now that you added some expenses you can see your see you expense
          list. Each expense list has an <mark>Edit</mark> button and an{" "}
          <mark>Delete</mark> button through which you can edit your expense and
          then add it or delete it completely from the list.
        </h5>
        <Image src={editDelete}  style={{height:"400px", width:"100%", maxWidth:"50rem",marginLeft:"11rem" }} rounded fluid />
      </div>
      <div className=" mt-4 mb-2">
        <h5 id="text" style={{ lineHeight: "1.8" }}>
          3. When total expense amount is exceeds Rs.10000/- you can see a
          <mark>Premium</mark> button. On clicking that premium button you can
          see two buttons on the both side of the page. On clicking the mode
          button you can now change the mode of the website and also can
          download the list of your expenses by clicking the download button on
          csv format.
        </h5>
        <Image src={premium}  style={{height:"400px", width:"100%", maxWidth:"50rem",marginLeft:"11rem" }} rounded fluid />
      </div>
    </Container>
  );
};
export default Home;
