import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = {
  expenses: [],
  totalAmount: 0,
  editList: {},
};

const expenseSlice = createSlice({
  name: "expenseLists",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
      const editArr = Object.keys(state.editList);
      let updatedItems;
      let totalPrice = 0;
      if (editArr.length > 0) {
        const existingItemIndex = state.expenses.findIndex(
          (prevItem) => prevItem.id === state.editList.id
        );
        const existingExpenseItem = state.expenses[existingItemIndex];
        const updatedItem = { id: existingExpenseItem.id, ...action.payload };
        updatedItems = [...state.expenses];
        updatedItems[existingItemIndex] = updatedItem;
        updatedItems.forEach((item) => {
          totalPrice = Number(totalPrice) + item.amount;
        });
      } else {
        updatedItems = [...state.expenses, action.payload];
        console.log(updatedItems);
        totalPrice = state.totalAmount + action.payload.amount;
      }
      state.expenses = updatedItems;
      state.totalAmount = totalPrice;
      state.editList = {};
    },
    deleteExpense(state, action) {
      const existingItemIndex = state.expenses.findIndex(
        (item) => item.id === action.payload
      );
      const existingExpenseItem = state.expenses[existingItemIndex];
      const updatedItems = state.expenses.filter(
        (item) => item.id !== action.payload
      );
      state.expenses = updatedItems;
      state.totalAmount =
        Number(state.totalAmount) - existingExpenseItem.amount;
    },
    savedFinalList(state, action) {
      console.log(action.payload);
      state.expenses = action.payload.expense;
      state.totalAmount = action.payload.totalExpense;
    },
    setEditList(state, action) {
      state.editList = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
