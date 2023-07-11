/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("");

  const categories = [
    "Work",
    "Personal",
    "Home",
    "Health and Fitness",
    "Financial",
    "Social",
    "Learning",
    "Miscellaneous",
  ];
  const priorities = ["Low", "Medium", "High"];

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
        <DialogContent>
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Divider style={{ marginTop: "1rem" }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={handleDueDateChange}
              textField={(prop) => <TextField {...prop} />}
            />
          </LocalizationProvider>
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            select
            fullWidth
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            select
            fullWidth
            label="Priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <Divider style={{ marginTop: "1rem" }} />
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
