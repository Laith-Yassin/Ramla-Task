/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";

const EditForm = ({ task, onUpdate, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
    onClose();
  };

  const categories = [
    "work",
    "personal",
    "home",
    "health and fitness",
    "financial",
    "social",
    "learning",
    "miscellaneous",
  ];
  const priorities = ["low", "medium", "high"];

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            name="name"
            label="Task Name"
            value={editedTask.name}
            onChange={handleChange}
            fullWidth
          />
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            name="description"
            label="Description"
            value={editedTask.description}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            value={editedTask.dueDate}
            onChange={handleChange}
            fullWidth
          />
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            name="category"
            label="Category"
            value={editedTask.category}
            onChange={handleChange}
            fullWidth
            select
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Divider style={{ marginTop: "1rem" }} />
          <TextField
            name="priority"
            label="Priority"
            value={editedTask.priority}
            onChange={handleChange}
            fullWidth
            select
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <Divider style={{ marginTop: "1rem" }} />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button onClick={onClose} variant="outlined" color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
