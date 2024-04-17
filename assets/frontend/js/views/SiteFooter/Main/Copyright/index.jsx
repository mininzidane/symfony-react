import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import CopyrightText from 'frontend/js/views/Shared/Copyright';
import useStyles from './useStyles';

function Copyright() {
  const classes = useStyles();

  return (
    <div id="footer-copyright" className={classes.root}>
      <ContainerFullScreen>
        <div className={classes.copyright}>
          <CopyrightText />
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default Copyright;
