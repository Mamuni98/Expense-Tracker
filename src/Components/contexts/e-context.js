import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth-context";
const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense: (id, expense) => {},
});
export const ExpenseProvider = (props) => {
  const auth = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(Number(0));
  const [editList, setEditList] = useState({});

  const getExpenses = useCallback(async () => {
    try {
      if (auth.IsLoggedIn) {
        const email = localStorage.getItem("email");
        if (email) {
          const userName = email.replace("@", "").replace(".", "");
          const response = await axios.get(
            `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${userName}.json`
          );
          const data = response.data;
          //console.log(data);
          if (data) {
            let allExpenses = [];
            for (let key in data) {
              allExpenses.push({ id: key, ...data[key] });
            }
            setExpenses(allExpenses);
            let price = 0;
            allExpenses.forEach((expense) => {
              price = Number(price) + expense.amount;
            });

            setTotalAmount(price);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth.IsLoggedIn]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const addExpenseHandler = async (expense) => {
    try {
      const email = localStorage.getItem("email");
      if (email) {
        const userName = email.replace("@", "").replace(".", "");
        const editArr = Object.keys(editList);
        if (editArr.length > 0) {
          const existingItemIndex = expenses.findIndex(
            (prevItem) => prevItem.id === editList.id
          );
          const existingExpenseItem = expenses[existingItemIndex];
          const updatedItem = { id: existingExpenseItem.id, ...expense };
          const updatedItems = [...expenses];
          updatedItems[existingItemIndex] = updatedItem;
          let totalPrice = 0;
          updatedItems.forEach((item) => {
            totalPrice = Number(totalPrice) + item.amount;
          });
          await axios.put(
            `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${userName}/${editList.id}.json`,
            updatedItem
          );
          setExpenses(updatedItems);
          setTotalAmount(totalPrice);
          setEditList({});
        } else {
          const response = await axios.post(
            `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${userName}.json`,
            expense
          );
          const data = response.data;
          console.log(data.name);
          const newItem = { id: data.name, ...expense };
          setExpenses((prev) => {
            return [...prev, newItem];
          });
          setTotalAmount((prevTotal) => {
            return prevTotal + expense.amount;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const existingItemIndex = expenses.findIndex((item) => item.id === id);
      const existingExpenseItem = expenses[existingItemIndex];
      const updatedItems = expenses.filter((item) => item.id !== id);

      setExpenses(updatedItems);
      setTotalAmount((prevTotal) => {
        return prevTotal - existingExpenseItem.amount;
      });
      const email = localStorage.getItem("email");
      if (email) {
        const userName = email.replace("@", "").replace(".", "");
        await axios.delete(
          `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${userName}/${id}.json`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setEditListHandler = (list) => {
    setEditList(list);
  };
  // const editExpenseHandler = (id, newExpense) => {

  // }

  const contextValue = {
    expenses: expenses,
    totalAmount: totalAmount,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editList: editList,
    setEditList: setEditListHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
//export default ExpenseContext;
