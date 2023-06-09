import { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpense from "../ExpenseTracker/AddExpense";
import ExpenseLists from "../ExpenseTracker/ExpenseLists";
import TotalAmount from "../ExpenseTracker/TotalAmount";
import { useSelector } from "react-redux";
import Switch from "./Switch";
const Expense = () => {
  const [showSwitch, setShowSwitch] = useState(false);
  const totalPrice = useSelector((state) => state.expenses.totalAmount);
  const eligible = totalPrice > 10000;
  //console.log(eligible);
  const showSwitchHandler = () => {
    setShowSwitch(true);
  };
 
  return (
    <>
      {eligible && showSwitch && <Switch />}
      <AddExpense />
      <ExpenseLists />
      <TotalAmount />
      {eligible && (
        <div className="text-center mb-5">
          <Button variant="success" size="lg" onClick={showSwitchHandler}>
            Activate Premium
          </Button>
        </div>
      )}
    </>
  );
};
export default Expense;
