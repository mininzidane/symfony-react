import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

import useStyles from './useStyles';

function Title() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <FormattedMessage
        id="securityPage.annotation.title"
        values={{
          br: isBelowMd ? ' ' : <br />,
        }}
      />
    </div>
  );
}

export default Title;
