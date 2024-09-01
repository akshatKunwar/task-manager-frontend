import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some tasks!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <h4 className="task-title">{task.title}</h4>
              <p>{task.description}</p>
              <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
