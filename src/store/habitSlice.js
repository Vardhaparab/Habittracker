import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    habits: [],
    isLoading: false,
    error: null
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits",async()=>{
    await new Promise((resolve)=> setTimeout(resolve,1000));
    const mockHabits = [
        {
            id:"1",
            name:"reading",
            frequency : "daily",
            completedDates:[],
            createdAt:new Date().toISOString()
        },
         {
            id:"2",
            name:"Drawing",
            frequency : "daily",
            completedDates:[],
            createdAt:new Date().toISOString()
        }
    ];

    return mockHabits;
});

export const habitSlice = createSlice({
    name:"habits",
    initialState,
    reducers:{
        addHabit:(state,action)=>{
            state.habits.push(action.payload);
        },
        toggleHabit:(state,action)=>{
            const habit =  state.habits.find((h)=>h.id === action.payload.id);

            if(habit){
                const index = habit.completedDates.indexOf(action.payload.date);
            if(index > -1){
                habit.completedDates.splice(index,1);
            }
            else{
                habit.completedDates.push(action.payload.date);
            }
        }
        },
        removeHabit:(state,action)=>{
            state.habits = state.habits.filter((habit)=> habit.id !== action.payload.id);
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchHabits.pending , (state)=>{
            state.isLoading = true;
        })
         .addCase(fetchHabits.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.habits = action.payload
        })
        .addCase(fetchHabits.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.error.message || "Failed to fetch habits";
        })
    }
})

export const {addHabit , toggleHabit , removeHabit} = habitSlice.actions;
export default habitSlice.reducer;