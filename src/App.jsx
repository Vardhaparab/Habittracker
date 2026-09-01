import React from 'react'
import {Container, Typography} from "@mui/material"
import AddhabitForm from './components/AddhabitForm'
import HabitList from './components/HabitList'
import HabitState from './components/HabitState'

const App = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Typography component="h1" variant='h2' align='center'>
            Habit Tracker
        </Typography>
        <AddhabitForm/>
        <HabitList/>
        <HabitState/>
    </Container>
    </div>
  )
}

export default App
