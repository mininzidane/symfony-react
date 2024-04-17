import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import CopyrightText from 'frontend/js/views/Shared/Copyright';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ToTopButton from '../ToTopButton';
import CountrySelect from './CountrySelect';
import LanguageSelect from './LanguageSelect';
import useStyles from './useStyles';

function ControlsPanel() {
  const classes = useStyles();
  const { isAboveLg, isAboveSm, isBelowMd, isAboveMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <div className={classes.grid}>
          <CountrySelect />
          <LanguageSelect />

          {isAboveLg && (
            <div className={classes.copyright}>
              <CopyrightText />
            </div>
          )}

          {isBelowMd && isAboveSm && <ToTopButton />}
        </div>

        {isAboveMd && (
          <div className="pt-15 pb-25">
            <ToTopButton />
          </div>
        )}
      </ContainerFullScreen>
    </div>
  );
}

export default ControlsPanel;
