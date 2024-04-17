/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import ClearVinButton from 'frontend/js/views/Shared/ClearVinButton';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function ClearVinCell({ lot, vin }) {
  const classes = useStyles();

  return (
    <ClearVinButton
      lot={lot}
      component={({ isLoading, creditsCount, ...props }) => (
        <span className={classes.wrap}>
          <ButtonLink
            {...props}
            label={vin}
            className={classnames(classes.cta, 'js-track-event')}
            size="md"
            data-step="abm_lotpage"
            data-substep="get_full_history_report_banner_button_click"
          />

          {isLoading && (
            <div className={classes.spinner}>
              <SpinnerWheel size={14} thickness={2} />
            </div>
          )}
        </span>
      )}
    />
  );
}

export default ClearVinCell;
