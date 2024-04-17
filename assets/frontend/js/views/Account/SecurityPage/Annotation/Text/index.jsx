import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

import useStyles from './useStyles';

function Text() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <FormattedMessage
        id="securityPage.annotation.description"
        values={{
          br: isBelowMd ? ' ' : <br />,
        }}
      />
    </div>
  );
}

export default Text;
