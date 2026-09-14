import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await api.get('/notifications');
      const list = Array.isArray(response) ? response : response.data || [];
      setNotifications(list);
    } catch (err) {
      // Offline fallback
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await api.patch('/notifications/read-all');
    } catch (err) {
      // Silently handle
    }
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ _id: 'n_' + Date.now(), read: false, createdAt: new Date().toISOString(), ...notif }, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, addNotification, refreshNotifications: fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
