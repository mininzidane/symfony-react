/* eslint-disable react/prop-types */
import React from 'react';
import useLot from 'frontend/js/hooks/useLot';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function Title({ lotId, auction }) {
  const classes = useStyles();
  const [lot] = useLot(lotId, auction);

  return (
    <div className={classes.root}>
      {lot && lot.description}{' '}
      <span>
        <FormattedMessage id="shared.label.lotId" /> {lot && lot.id}
      </span>
    </div>
  );
}

Title.propTypes = {};

export default Title;
