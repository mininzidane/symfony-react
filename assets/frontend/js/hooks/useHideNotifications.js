import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  hideNotifications: {
    '& .NOTIFICATION': {
      display: 'none',
    },
  },
}));

function useHideNotifications(hide) {
  const classes = useStyles();

  useEffect(() => {
    const $body = document.body;

    if (hide) {
      $body.classList.add(classes.hideNotifications);
    } else {
      $body.classList.remove(classes.hideNotifications);
    }

    return () => {
      $body.classList.remove(classes.hideNotifications);
    };
  }, [hide]);
}

export default useHideNotifications;
