import { createSlice } from "@reduxjs/toolkit";

const initialNameState = {
    name:"",
}
const profileSlice = createSlice({
    name:"userProfile",
    initialState:initialNameState,
    reducers:{
        addUserName(state, action){
            state.name = action.payload;
        },
        finalUserName(state, action){
            state.name = action.payload;
        }
    }
})

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;