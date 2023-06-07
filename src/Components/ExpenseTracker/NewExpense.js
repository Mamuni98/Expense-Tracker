import { Button, Card } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";

const NewExpense = (props) => {
  const dispatch = useDispatch();
  const deleteItemHandler = (event) => {
    event.preventDefault();
    dispatch(expenseActions.deleteExpense(props.id));
  };
  const editItemHandler = (event) => {
    event.preventDefault();
    const editList = {
      id: props.id,
      catagory: props.catagory,
      description: props.description,
      amount: props.amount,
    };
    dispatch(expenseActions.setEditList(editList));
  };
  return (
    <li style={{ listStyle: "none" }}>
      <Card
        className="p-2"
        style={{
          boxShadow: "0 2px 8px rgba(16, 192, 241, 0.5)",
          backgroundColor: "whitesmoke",
          borderRadius: "20px",
          maxWidth: "98%",
          marginInline: "auto",
          marginBottom: "1rem",
        }}
      >
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="d-flex flex-column justify-content-start">
            <h3
              style={{
                color: "black",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              {props.catagory}
            </h3>
            <p
              style={{
                color: "grey",
                fontStyle: "italic",
                fontWeight: "bolder",
              }}
            >
              {props.description}
            </p>
          </div>
          <div className="d-flex flex-column">
            <h3
              style={{
                color: "aqua",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Rs.{props.amount.toFixed(2)}
            </h3>
            <div className="d-flex flex-row flex-wrap justify-content-end">
              <FiEdit
                size="40px"
                color="grey"
                onClick={editItemHandler}
                title="Edit"
              />
              <Button
                className="ml-1"
                variant="danger"
                onClick={deleteItemHandler}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};
export default NewExpense;
