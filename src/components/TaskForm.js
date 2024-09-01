import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, selectedTask, setSelectedTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate.slice(0, 10)); // Format date for input
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
    };

    onSubmit(taskData);

    // Clear form and reset selectedTask
    setTitle('');
    setDescription('');
    setDueDate('');
    setSelectedTask(null);
  };

  return (
    <div className="task-form">
      <h3>{selectedTask ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
      </form>
    </div>
  );
}

export default TaskForm;
