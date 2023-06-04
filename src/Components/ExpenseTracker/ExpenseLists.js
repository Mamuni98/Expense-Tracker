import { Container, Card } from "react-bootstrap";
import { useContext } from "react";
import ExpenseContext from "../contexts/e-context";
import NewExpense from "./NewExpense";
const ExpenseLists = (props) => {
  const eContext = useContext(ExpenseContext);

  return (
    <Container className="w-75">
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "90%",
          margin:"auto"
        }}
      >
        <ul style={{listStyle:"none"}}>
          {eContext.expenses.map((item) => {
            return (
              <NewExpense
                key={item.id}
                id={item.id}
                catagory={item.catagory}
                description={item.description}
                amount={Number(item.amount)}
              />
            );
          })}
        </ul>
      </Card>
    </Container>
  );
};
export default ExpenseLists;
