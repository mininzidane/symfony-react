import { useEffect, useState } from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';

function useCustomerNotifications() {
  const { notificationsCnt, needConfirmMailingAddress } = useCustomerHelper();
  const [customerNotificationsCnt, setCustomerNotificationsCnt] = useState(notificationsCnt);
  const [notifications, setNotifications] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getNotifications() {
    setIsLoading(true);
    try {
      const { data } = await CustomerService.getNotifications();
      setCustomerNotificationsCnt(data?.length || 0);
      setNotifications(data);
    } catch {
      setCustomerNotificationsCnt(0);
    }
    setIsLoading(false);
  }

  async function hideNotification(token) {
    try {
      await CustomerService.hideNotification(token);
      const data = notifications.filter((item) => item.token !== token);
      setCustomerNotificationsCnt(data?.length || 0);
      setNotifications(data);
    } catch {
      setCustomerNotificationsCnt(0);
    }
  }

  useEffect(() => {
    if (notificationsCnt > 0) {
      getNotifications();
    }
  }, []);

  return {
    isLoading,
    notifications,
    hideNotification,
    notificationsCnt: customerNotificationsCnt,
    needConfirmMailingAddress,
  };
}

export default useCustomerNotifications;
