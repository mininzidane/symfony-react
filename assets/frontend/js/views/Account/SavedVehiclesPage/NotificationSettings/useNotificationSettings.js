import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import { useSnackbar } from 'notistack';
import CustomerService from 'frontend/js/api/CustomerService';
import WatchlistService from 'frontend/js/api/WatchlistService';

function useNotificationSettings(type) {
  const intl = useIntl();
  const { id, isAuthenticated } = useCustomerHelper();

  const { isLoading, data } = useQuery('customer-data', () => CustomerService.getCustomer(), {
    enabled: isAuthenticated,
  });

  const [defaultSavedSearchesMethod, setDefaultSavedSearchesMethod] = useState('email');
  const [defaultWatchlistFrequency, setDefaultWatchlistFrequency] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { mutate: updateSavedSearchesNotificationSettings } = useMutation(
    (payload) => CustomerService.updateNotificationSettings(payload),
    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries('customer-data');

        const previousData = queryClient.getQueryData('customer-data');

        queryClient.setQueryData('customer-data', (oldData) => ({
          ...oldData,
          customer: {
            ...oldData.customer,
            mobilePhone: newData.mobile,
            metaInformation: {
              ...oldData.customer?.metaInformation,
              saved_searches_default_frequency: newData.notification_frequency,
              saved_searches_default_type: newData.notification_type,
            },
          },
          data: {
            ...oldData.data,
            saved_searches_default_frequency: newData.notification_frequency,
            saved_searches_default_type: newData.notification_type,
          },
        }));

        return { previousData };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData('customer-data', context.previousData);

        enqueueSnackbar(intl.formatMessage({ id: 'globalNotificationsSettings.update.error' }));
      },
      onSettled: () => {
        queryClient.invalidateQueries('customer-data');

        enqueueSnackbar(intl.formatMessage({ id: 'globalNotificationsSettings.update.success' }));
      },
    },
  );

  const { mutate: updateWatchlistNotificationSettings } = useMutation(
    (payload) => WatchlistService.updateWatchlistNotificationSettings(payload),
    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries('customer-data');

        const previousData = queryClient.getQueryData('customer-data');

        queryClient.setQueryData('customer-data', (oldData) => ({
          ...oldData,
          customer: {
            ...oldData.customer,
            mobilePhone: newData.mobile,
            defaultNotificationStatus: parseInt(newData.default_notification_status, 10),
            defaultNotificationType: newData.default_notification_type,
            metaInformation: {
              ...oldData.customer?.metaInformation,
              auction_notification_type: newData.auctionNotificationType,
            },
          },
        }));

        return { previousData };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData('customer-data', context.previousData);

        enqueueSnackbar(intl.formatMessage({ id: 'globalNotificationsSettings.update.error' }));
      },
      onSettled: () => {
        queryClient.invalidateQueries('customer-data');

        enqueueSnackbar(intl.formatMessage({ id: 'globalNotificationsSettings.update.success' }));
      },
    },
  );

  let settings = {};
  if (type === 'savedSearches') {
    settings = {
      phone: get(data, 'customer.mobilePhone'),
      method: get(data, 'customer.metaInformation.saved_searches_default_type'),
      frequency: get(data, 'customer.metaInformation.saved_searches_default_frequency'),
    };
    settings.notifications = settings.method !== 'none';
    settings.method = !settings.notifications ? defaultSavedSearchesMethod : settings.method;
  }

  if (type === 'watchlist') {
    settings = {
      phone: get(data, 'customer.mobilePhone'),
      frequency: get(data, 'customer.defaultNotificationStatus'),
      method: get(data, 'customer.defaultNotificationType'),
      auctionNotificationType: get(data, 'customer.metaInformation.auction_notification_type', 'sms'),
    };
    settings.notifications = Boolean(settings.frequency);
    if (!settings.notifications) {
      settings.frequency = defaultWatchlistFrequency;
    }
  }

  function onChange(field, value) {
    const updatedSettings = {
      ...settings,
      ...(field !== 'notifications' ? { notifications: true } : {}),
      [field]: value,
    };

    if (type === 'watchlist') {
      const payload = {
        mobile: updatedSettings.phone,
        disableNotification: !updatedSettings.notifications,
        default_notification_status: updatedSettings.notifications ? updatedSettings.frequency : 0,
        default_notification_type: updatedSettings.method,
        auctionNotificationType: updatedSettings.auctionNotificationType,
      };

      if (isAuthenticated) {
        updateWatchlistNotificationSettings(payload);
      }

      if (updatedSettings.frequency !== defaultWatchlistFrequency) {
        setDefaultWatchlistFrequency(updatedSettings.frequency);
      }

      return;
    }

    if (type === 'savedSearches') {
      const payload = {
        id,
        mobile: updatedSettings.phone,
        notification_frequency: updatedSettings.frequency,
        notification_type: updatedSettings.notifications ? updatedSettings.method : 'none',
      };

      if (isAuthenticated) {
        updateSavedSearchesNotificationSettings(payload);
      }

      if (updatedSettings.method !== defaultSavedSearchesMethod) {
        setDefaultSavedSearchesMethod(updatedSettings.method);
      }
    }
  }

  return { type, settings, onChange, isLoading: isLoading && !data };
}

export default useNotificationSettings;
