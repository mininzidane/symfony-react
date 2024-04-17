import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function WatchButton({ href, onClick }) {
  const classes = useStyles();

  function redirect() {
    RouterService.customRedirect(href);
  }

  function handleClick() {
    onClick();
    redirect();
  }

  return (
    <button type="button" onClick={handleClick} className={classes.root}>
      <FormattedMessage id="videoGuidesNotification.watchNow" />
    </button>
  );
}

WatchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
};

export default WatchButton;
