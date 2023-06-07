import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import NewExpense from "./NewExpense";
import axios from "axios";
import { useEffect } from "react";
const ExpenseLists = (props) => {
  const expenseList = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  let expenseItems;
  if (expenseList === undefined) {
    expenseItems = [];
  } else {
    expenseItems = expenseList;
  }
  useEffect(() => {
    const sendData = async () => {
      const useremail = localStorage.getItem("email");
      if (useremail) {
        const user = useremail.replace("@", "").replace(".", "");
        try {
          const response = await axios.put(
            `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${user}.json`,
            {
              expense: [...expenseList],
              totalExpense: totalAmount,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    sendData();
  }, [expenseList, totalAmount]);

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
          {expenseItems.map((item) => {
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
