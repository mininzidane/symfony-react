/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function QuestionIsNotHere({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button type="button" className={classes.button} onClick={onClick}>
        <FormattedMessage id="header.needHelp.didntFind" />
      </button>
    </div>
  );
}

export default QuestionIsNotHere;
