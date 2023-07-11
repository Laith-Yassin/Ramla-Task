/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GeneralSelect from "./GeneralSelect/GeneralSelect";

const CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "home", label: "Home" },
  { value: "health and fitness", label: "Health and Fitness" },
  { value: "financial", label: "Financial" },
  { value: "social", label: "Social" },
  { value: "learning", label: "Learning" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const PRIORITIES = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("");


  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = () => {
    if (taskName.trim() && dueDate && description.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: description,
        dueDate: dueDate,
        category: selectedCategory,
        completed: false,
        priority: priority,
      };
      const taskWithDateOnly = {
        ...newTask,
        dueDate: dueDate.toISOString().split("T")[0],
      };
      onAddTask(taskWithDateOnly, dueDate);
      setTaskName("");
      setDescription("");
      setDueDate(null);
      setSelectedCategory("");
      setPriority("");
      handleClose();
    } else {
      // Display an error message or perform any other desired action for invalid data
      console.log("Please fill in all required fields.");
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpen}>
        + Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent sx={{ display:"flex", flexDirection:"column", rowGap:'16px' }}>
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={handleDueDateChange}
              textField={(prop) => <TextField {...prop} />}
            />
          </LocalizationProvider>
          <GeneralSelect
          fullWidth
            items={CATEGORIES}
            onChange={handleCategoryChange}
            value={selectedCategory}
            label={"Category"}
            InputLabelProps={{
                shrink: true,
              }}
          />


          <GeneralSelect
          fullWidth
            items={PRIORITIES}
            onChange={handlePriorityChange}
            value={priority}
            label={'Priority'}
            InputLabelProps={{
                shrink: true,
              }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskForm;
