import { useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';

const useValues = () => {
  const [notificationsData, setData] = useState({});

  const setNotificationsData = useCallback((data) => setData((current) => ({ ...current, ...data })), []);

  return [
    {
      notificationsData,
      setNotificationsData,
    },
  ];
};

export const { Provider: NotificationsProvider, useTracked: useNotifications } = createContainer(useValues);
