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
      if (editArr.length > 0) {
        const existingItemIndex = state.expenses.findIndex(
          (prevItem) => prevItem.id === state.editList.id
        );
        const existingExpenseItem = state.expenses[existingItemIndex];
        const updatedItem = { id: existingExpenseItem.id, ...action.payload };
        const updatedItems = [...state.expenses];
        updatedItems[existingItemIndex] = updatedItem;
        let totalPrice = 0;
        updatedItems.forEach((item) => {
          totalPrice = Number(totalPrice) + item.amount;
        });
        state.expenses = updatedItems;
        state.totalAmount = totalPrice;
        state.editList = {};
      } else {
        const updatedItems = [...state.expenses, action.payload];
        const totalPrice = state.totalAmount + action.payload.amount;
        state.expenses = updatedItems;
        state.totalAmount = totalPrice;
        state.editList = {};
      }
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
      state.totalAmount = state.totalAmount - existingExpenseItem.amount;
    },
    setEditList(state, action) {
      state.editList = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
