import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddExpense from "../ExpenseTracker/AddExpense";
import ExpenseLists from "../ExpenseTracker/ExpenseLists";
import TotalAmount from "../ExpenseTracker/TotalAmount";
import { useSelector } from "react-redux";
const Expense = () => {
  const totalPrice = useSelector((state) => state.expenses.totalAmount);
  return (
    <>
      <div className="text-end">
        <Button variant="info">
          Your profile is incomplete.
          <Link to="/profile">
            <Badge bg="info">Complete now</Badge>
          </Link>
        </Button>
      </div>
      <AddExpense />
      <ExpenseLists />
      <TotalAmount />
      <div className="text-center">
        {totalPrice > 10000 ? <Button variant="success" size="lg">Activate Premium</Button> : ""}
      </div>
    </>
  );
};
export default Expense;
