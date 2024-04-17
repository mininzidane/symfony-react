import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import MessageSvg from './img/message.svg';
import useStyles from './useStyles';

function NoResultsState() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={MessageSvg} alt="Icon" />

      <h2 className={classes.title}>
        <FormattedMessage id="bidStatusPage.notes.youDontHaveMessages" />
      </h2>
      <p className={classes.descriptions}>
        <FormattedMessage id="bidStatusPage.notes.newMessagesWillAppearHere" />
      </p>
    </div>
  );
}

export default NoResultsState;
