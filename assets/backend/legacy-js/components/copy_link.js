const NotificationService = require("backend/js/lib/NotificationService").default;

document.querySelectorAll('.copy-link-action').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    if (!navigator.clipboard) {
      NotificationService.showErrorMessage('Could not copy link, please use right click and click on Copy link address');
      return;
    }
    const link = e.currentTarget.getAttribute('href');
    navigator.clipboard.writeText(link).then(() => {
      NotificationService.showSuccessMessage('Link was copied!');
    }, () => {
      NotificationService.showErrorMessage('Could not copy link, please use right click and click on Copy link address');
    });
  });
});
