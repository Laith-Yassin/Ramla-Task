import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import TaskForm from "../components/TaskForm";
import EditForm from "../components/EditForm";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { green, lightGreen, red } from "@mui/material/colors";
import '../css.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setSelectedTask(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed" && !task.completed) return false;
    if (filter === "Pending" && task.completed) return false;
    if (categoryFilter !== "All" && task.category !== categoryFilter)
      return false;
    if (priorityFilter !== "All" && task.priority !== priorityFilter)
      return false;
    if (searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    return true;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Manage Your Task Here
      </Typography>
      <div className="flex-box" >
        
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="All">Completed/Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
        <Select
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        >
          <MenuItem value="All">All Categories</MenuItem>
          {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}        
        </Select>
        <Select
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
        >
          <MenuItem value="All">All Priorities</MenuItem>
          {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}        
        </Select>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TaskForm onAddTask={handleAddTask}  />

      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={200} sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell width={400} sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell width={150} align="center" sx={{ fontWeight: 'bold' }}>
              Category
            </TableCell>
            <TableCell width={150} align="center" sx={{ fontWeight: 'bold' }}>
              Priority
            </TableCell>
            <TableCell width={350} align="center" sx={{ fontWeight: 'bold' }}>
              Due Date
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Complete</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell width={200}>{task.name}</TableCell>
              <TableCell width={400}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ whiteSpace: "pre-wrap", p: "16px" }}
                >
                  {task.description}
                </Typography>
              </TableCell>
              <TableCell width={150} align="center">
                {task.category}
              </TableCell>
              <TableCell width={150} align="center">
                {task.priority}
              </TableCell>
              <TableCell width={350} align="center">
                {task.dueDate.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  edge="end"
                  onClick={() => handleCompleteTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircleIcon sx={{ color: green[500] }} />
                  ) : (
                    <CheckCircleIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    edge="end"
                    onClick={() => handleEditTask(task)}
                    sx={{ marginRight: "8px" }}
                  >
                    <EditNoteIcon sx={{ color: lightGreen[800] }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon sx={{ color: red[500] }} />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEditFormOpen && (
        <EditForm
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onClose={handleCloseEditForm}
        />
      )}
    </Container>
  );
};

export default App;
