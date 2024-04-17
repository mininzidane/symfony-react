/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function MoreDetails({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonLink onClick={onClick} label={<FormattedMessage id="shared.label.moreDetails" />} />
    </div>
  );
}

export default MoreDetails;
