import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Popper from 'frontend/js/components/Popper';
import ArrowSvg from 'frontend/images/shared/various/triangle-down-blue.svg';
import Form from '../Form';
import useStyles from './useStyles';

function NotificationSettingsDropdown(notifications) {
  const classes = useStyles();

  // eslint-disable-next-line react/destructuring-assignment
  if (notifications.isLoading) {
    return null;
  }

  return (
    <Popper
      placement="top-end"
      boundariesElement="scrollParent"
      classes={{ paper: classes.paper }}
      trigger={
        <div className={classes.triggerWrap}>
          <span className={classes.triggerDesc}>
            <FormattedMessage id="shared.label.notifications" />
          </span>

          <img src={ArrowSvg} alt="Triangle" width="7px" height="3px" />
        </div>
      }
    >
      <Form {...notifications} />
    </Popper>
  );
}

export default NotificationSettingsDropdown;
