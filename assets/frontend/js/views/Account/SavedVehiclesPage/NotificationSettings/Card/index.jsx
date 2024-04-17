import React from 'react';
import Card from 'frontend/js/components/Card';
import Form from '../Form';

function NotificationSettingsCard(notifications) {
  // eslint-disable-next-line react/destructuring-assignment
  if (notifications.isLoading) {
    return null;
  }

  return (
    <Card elevation={2}>
      <Form {...notifications} />
    </Card>
  );
}

export default NotificationSettingsCard;
