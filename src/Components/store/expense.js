import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = {
  expenses: [],
  totalAmount: 0,
  editList: {},
  changed: false,
};

const expenseSlice = createSlice({
  name: "expenseLists",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
      const editArr = Object.keys(state.editList);
      let totalPrice = 0;
      if (editArr.length > 0) {
        const existingItemIndex = state.expenses.findIndex(
          (prevItem) => prevItem.id === state.editList.id
        );
        const existingExpenseItem = state.expenses[existingItemIndex];
        const updatedItem = { id: existingExpenseItem.id, ...action.payload };
        state.expenses[existingItemIndex] = updatedItem;
        state.expenses.forEach((item) => {
          totalPrice = Number(totalPrice) + item.amount;
        });
        
      } else {
        state.expenses.push(action.payload);
        totalPrice = state.totalAmount + action.payload.amount;
      }
      state.totalAmount = totalPrice;
      state.editList = {};
      state.changed = true;
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
        state.changed = true;
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
