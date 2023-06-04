import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense: (id, expense) => {},
});
export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [editList, setEditList] = useState({});

  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = response.data;

      if (data) {
        let allExpenses = [];
        for (let key in data) {
          allExpenses.push(data[key]);
        }
        setExpenses(allExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const addExpenseHandler = async (expense) => {
    try {
      const editArr = Object.keys(editList);
      if (editArr.length > 0) {
        const existingItemIndex = expenses.findIndex(
          (prevItem) => prevItem.id === editList.id
        );
        const existingExpenseItem = expenses[existingItemIndex];
        const updatedItem = { id: existingExpenseItem.id, ...expense };
        const updatedItems = [...expenses];
        updatedItems[existingItemIndex] = updatedItem;
        setExpenses(updatedItems);
        await axios.put(
          `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses/${editList.id}.json`,
          updatedItem
        );
        setEditList({});
      } else {
        const response = await axios.post(
          "https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses.json",
          expense
        );
        const data = response.data;
        const newItem = { id: data.name, ...expense };
        setExpenses((prev) => {
          return [...prev, newItem];
        });
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const updatedItems = expenses.filter((item) => item.id !== id);
      setExpenses(updatedItems);
      await axios.delete(
        `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
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
export default ExpenseContext;
