import React, { createContext, useState, useContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Booking Confirmed', message: 'Sarah Jenkins accepted your electrical booking.', date: '10 mins ago', read: false },
    { id: 'n2', title: 'New Review Received', message: 'Customer rated your plumbing service 5 stars!', date: '2 hours ago', read: true }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: 'n_' + Date.now(), read: false, date: 'Just now', ...notif }, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
