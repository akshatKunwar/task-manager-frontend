import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/tasks/upcoming', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotifications(response.data);
      } catch (err) {
        setError('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <h3>Upcoming Task Deadlines</h3>
      {error && <p className="error">{error}</p>}
      {notifications.length === 0 ? (
        <p>No upcoming deadlines.</p>
      ) : (
        <ul>
          {notifications.map((task) => (
            <li key={task._id}>
              <p>
                <strong>{task.title}</strong> is due on{' '}
                {new Date(task.dueDate).toLocaleDateString()}.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
