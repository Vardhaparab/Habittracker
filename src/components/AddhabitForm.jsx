import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { addHabit } from '../store/habitSlice';
import { Box, FormControl, InputLabel, MenuItem, TextField, Select, Button } from '@mui/material';

const AddhabitForm = () => {

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim()) {
      dispatch(
        addHabit({
        id: Date.now(),
        name: name.trim(),
        frequency,
        completedDates: [],
    }));

      setName("");
      setFrequency("daily");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        <TextField label="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>

          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">Add Habit</Button>
      </Box>
    </form>
  )
}

export default AddhabitForm
