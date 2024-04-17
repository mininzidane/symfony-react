import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonLink from 'frontend/js/components/ButtonLink';
import StringService from 'frontend/js/lib/utils/StringService';
import RouterService from 'frontend/js/api/RouterService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import CopySvg from './img/copy.svg';
import useStyles from './useStyles';

function Copy() {
  const classes = useStyles();
  const { refinements } = useContext(CalculatorContext);
  const { enqueueSnackbar } = useSnackbar();
  const queryParams = RouterService.serializeQueryParams(refinements);

  function handleClick() {
    enqueueSnackbar(<FormattedMessage id="vehicleCalculator.linkCopied" />, { variant: 'success' });

    StringService.copyToClipboard(
      `${window.location.origin}${window.location.pathname}?${queryParams}${window.location.hash}`,
    );
  }

  return (
    <ButtonLink
      onClick={handleClick}
      label={
        <span className={classes.root}>
          <img width="16" height="18" src={CopySvg} className={classes.icon} alt="Copy link" />

          <span className={classes.label}>
            <FormattedMessage id="shared.cta.copy" />
          </span>
        </span>
      }
    />
  );
}

export default Copy;
