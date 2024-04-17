import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';

import useStyles from './useStyles';
import Disclosure from '../Disclosure';

function Cta() {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <ContainerFullScreen className={classes.root}>
      <Button
        label={intl.formatMessage({ id: 'shared.cta.applyNow' })}
        color="yellow"
        className={classes.btn}
        href="https://www.lightstream.com/?fact=14122&irad=88389&irmp=2875256"
        isNofollow
        isTargetBlank
      />
      <Disclosure />
    </ContainerFullScreen>
  );
}

export default Cta;
