import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHabits } from '../store/habitSlice';
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitState = () => {

    const {habits , isLoading , error} = useSelector((state)=> state.habits);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchHabits())
    }, [])

    const getCompltedToday =()=>{
        const today = new Date().toISOString().split("T")[0];
        return habits.filter((habit)=> habit.completedDates.includes(today)).length;
    }

     const getStreak = (habit)=>{
        let streak = 0 ;
        let currentDate = new Date();

        while(true){
            if(habit.completedDates.includes(currentDate.toISOString().split("T")[0])){
                streak++;
                currentDate.setDate(currentDate.getDate()-1);
            }
            else{
                break;
            }
        }
        return streak;
    }

    const getLongestStreak =()=>{
        return Math.max(...habits.map(getStreak),0);
    }

    if(isLoading){
        return <LinearProgress/>
    }

    if(error){
        return <Typography color='error'>{error}</Typography>
    }

  return (
    <Paper elevation={2} sx={{p:2,mt:4}}>
        <Typography variant='h6' gutterBottom>
            Habit statistics
        </Typography>
        <Typography variant='body1'>
            Total Habits: {habits.length}
        </Typography>
        <Typography variant='body1'>
            Completed Today:{getCompltedToday()}
        </Typography>
        <Typography variant='body1'>
            Longest streak:{getLongestStreak()}
        </Typography>
    </Paper>
  )
}

export default HabitState
