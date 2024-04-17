/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function QuestionLink({ href, label, onClick }) {
  const classes = useStyles();

  return (
    <Link href={href} className={classes.root} onClick={onClick} isTargetBlank>
      {label}
    </Link>
  );
}

export default QuestionLink;
