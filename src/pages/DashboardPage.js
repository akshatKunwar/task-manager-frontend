import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Notification from '../components/Notification';

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskSubmit = async (taskData) => {
    try {
      let response;
      if (selectedTask) {
        // Edit existing task
        response = await axios.put(`/api/tasks/${selectedTask._id}`, taskData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // Add new task
        response = await axios.post('/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      // Update the task list
      if (selectedTask) {
        setTasks(tasks.map(task => (task._id === selectedTask._id ? response.data : task)));
        setSelectedTask(null);
      } else {
        setTasks([...tasks, response.data]);
      }

    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Remove the task from the state
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>
      <TaskForm 
        onSubmit={handleTaskSubmit} 
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask}
      />
      <TaskList 
        tasks={tasks} 
        onEdit={handleTaskEdit} 
        onDelete={handleTaskDelete} 
      />
      <Notification />
      {/* Other components like TaskForm and TaskList */}
    </div>
  );
}

export default DashboardPage;
