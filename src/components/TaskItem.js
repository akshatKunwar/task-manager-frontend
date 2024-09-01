import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          <button className="btn btn-warning btn-sm" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <p className="task-due-date">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
