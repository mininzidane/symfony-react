/* eslint-disable import/no-extraneous-dependencies */
import * as toastr from 'toastr';

const NotificationService = {
  isToasterAvailable: () => typeof toastr !== 'undefined',

  showSuccessMessage: (message) => {
    if (!NotificationService.isToasterAvailable()) {
      return;
    }

    toastr.success(message);
  },

  showErrorMessage: (message) => {
    if (!NotificationService.isToasterAvailable()) {
      return;
    }

    toastr.error(message);
  },
};

export default NotificationService;
