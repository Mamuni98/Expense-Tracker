import { Card } from "react-bootstrap";

const NewExpense = (props) => {
  return (
    <li style={{ listStyle: "none" }}>
      <Card
        className="p-2"
        style={{
          boxShadow: "0 2px 8px rgba(16, 192, 241, 0.5)",
          backgroundColor: "whitesmoke",
          borderRadius: "20px",
          maxWidth: "98%",
          marginInline:"auto",
          marginBottom:"1rem"
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
          <div>
            <h3
              style={{
                color: "aqua",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Rs.{props.amount.toFixed(2)}
            </h3>
          </div>
        </div>
      </Card>
    </li>
  );
};
export default NewExpense;
