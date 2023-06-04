import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
});
export const ExpenseProvider = (props) => {
  const authCntxt = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const { IsLoggedIn } = authCntxt;

  useEffect(() => {
    if (IsLoggedIn) {
      const getExpenses = async () => {
        try {
          const response = await axios.get(
            "https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses.json"
          );
          const data = response.data;
          if (data) {
            let allExpenses = [];
            for (let key of data) {
              allExpenses.push(data[key]);
            }
            setExpenses(allExpenses);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getExpenses();
    }
  }, [IsLoggedIn]);

  const addExpenseHandler = async (expense) => {
    try {
      setExpenses((prev) => {
        return [expense, ...prev];
      });
      await axios.post(
        "https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses.json",
        expense
      );
    } catch (error) {
      console.log(error);
    }
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
