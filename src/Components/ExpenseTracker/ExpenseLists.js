import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import NewExpense from "./NewExpense";

const ExpenseLists = (props) => {
  const expenseList = useSelector((state) => state.expenses.expenses);

  return (
    <Container className="w-75">
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "90%",
          margin: "auto",
        }}
      >
        <ul style={{ listStyle: "none" }}>
          {expenseList.map((item) => {
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
