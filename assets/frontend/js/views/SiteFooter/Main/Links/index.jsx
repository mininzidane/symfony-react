import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';
import DesktopLinks from './DesktopLinks';
import MobileAccordion from './MobileAccordion';
import SocialLinks from './SocialLinks';

function Links() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        {isBelowMd ? (
          <>
            <MobileAccordion />
            <SocialLinks />
          </>
        ) : (
          <DesktopLinks />
        )}
      </ContainerFullScreen>
    </div>
  );
}

export default Links;
