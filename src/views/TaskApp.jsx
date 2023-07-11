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
  TextField,
  Stack,
} from "@mui/material";
import TaskForm from "../components/TaskForm";
import EditForm from "../components/EditForm";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { blue, green, grey, lightGreen, red } from "@mui/material/colors";
import '../css.css'
import GeneralSelect from "../components/GeneralSelect/GeneralSelect";
import styled from "@emotion/styled";

const CATEGORIES = [
    { value: 'all', label: 'All'},
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'home', label: 'Home' },
    { value: 'health and fitness', label: 'Health and Fitness' },
    { value: 'financial', label: 'Financial' },
    { value: 'social', label: 'Social' },
    { value: 'learning', label: 'Learning' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ]
  
  const PRIORITIES = [
    { value: 'all', label: 'All'},
    { value: 'low', label: 'Low'},
    { value: 'medium', label: 'Medium'},
    { value: 'high', label: 'High'},
  ] 
  const STATUS = [{
    value:'all',
    label: 'All'
  },{
    value:'completed',
    label: 'Completed'
  },{
    value:'pending',
    label: 'Pending'
  }] ;

const StyledTableCell = styled(TableCell)({
    textTransform: 'capitalize',
    minWidth: 100,
    width: 'auto',
    padding:'10px',
    '& .MuiTypography-root':{padding:0},
})

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [filter, setFilter] = useState(STATUS[0].value);
  const [categoryFilter, setCategoryFilter] = useState(CATEGORIES[0].value);
  const [priorityFilter, setPriorityFilter] = useState(PRIORITIES[0].value);
  const [searchTerm, setSearchTerm] = useState("");


  
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
    if (filter === "completed" && !task.completed) return false;
    if (filter === "pending" && task.completed) return false;
    if (categoryFilter !== "all" && task.category !== categoryFilter)
      return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
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
      <Stack sx={{ flexDirection:"row", gap:'8px',mb:'32px' }} >

      <GeneralSelect items={STATUS} onChange={handleFilterChange} value={filter} label={'Status'} sx={{ width:100 }} />
      <GeneralSelect items={CATEGORIES} onChange={handleCategoryFilterChange} value={categoryFilter} label={'Category'} sx={{ width:100 }}  />
      <GeneralSelect items={PRIORITIES} onChange={handlePriorityFilterChange} value={priorityFilter} label={'Priorty'} sx={{ width:100 }}  />
       
       
        <TextField
          placeholder="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow:1,'& .MuiInputBase-input':{padding:'8px 16px'}, justifyContent:'center' }}
        />
        
        <TaskForm onAddTask={handleAddTask}  />

      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell  sx={{ fontWeight: 'bold' }}>Name</StyledTableCell>
            <StyledTableCell  sx={{ fontWeight: 'bold' }}>Description</StyledTableCell>
            <StyledTableCell  align="center" sx={{ fontWeight: 'bold' }}>
              Category
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{ fontWeight: 'bold' }}>
              Priority
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{ fontWeight: 'bold' }}>
              Due Date
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Complete</StyledTableCell>
            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <StyledTableCell >{task.name}</StyledTableCell>
              <StyledTableCell >
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ whiteSpace: "pre-wrap", p: "16px" }}
                >
                  {task.description}
                </Typography>
              </StyledTableCell>
              <StyledTableCell  align="center">
                {task.category}
              </StyledTableCell>
              
              <StyledTableCell  align="center" sx={{ color : grey[50] ,backgroundColor: task.priority === 'low' ? blue[300] : task.priority === 'medium' ? green[300] : task.priority === 'high' ? red[300] : undefined }}>
                {task.priority}
              </StyledTableCell>
              
              <StyledTableCell  align="center">
                {task.dueDate.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
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
              </StyledTableCell>
              <StyledTableCell align="center">
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
              </StyledTableCell>
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

export default TaskApp;
