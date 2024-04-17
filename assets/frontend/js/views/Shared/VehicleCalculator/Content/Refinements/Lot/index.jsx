import React, { useCallback, useContext, useState } from 'react';
import debounce from 'lodash/debounce';
import { FormattedMessage } from 'react-intl-phraseapp';
import Fade from 'frontend/js/components/Fade';
import useIntl from 'frontend/js/hooks/useIntl';
import useLot from 'frontend/js/hooks/useLot';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import Refinement from '../Refinement';
// import Selects from "./Selects";
import useStyles from './useStyles';

function Lot() {
  const intl = useIntl();
  const classes = useStyles();
  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const ga = new GoogleAnalyticsService();
  // const [hasVin, setHasVin] = useState(true);

  const { refinements, refine } = useContext(CalculatorContext);
  const { lotIdOrVin, auction } = refinements;
  const [value, setValue] = useState(lotIdOrVin ? String(lotIdOrVin) : '');
  const [lot, isLoading] = useLot(lotIdOrVin, auction);

  const debouncedRefine = useCallback(
    debounce(
      (v) => {
        refine({
          lotIdOrVin: ValidationService.validateStockNumber(v) || ValidationService.validateVin(v) ? String(v) : null,
          auctionLocationId: null,
          vehicleCategory: null,
        });
      },
      600,
      { leading: true },
    ),
    [],
  );

  function handleChange(v) {
    const val = v.replace(/\s/g, '');

    setValue(val);
    debouncedRefine(val);
  }

  function handleToggleClick() {
    setIsOverlayShown(true);
    ga.sendEvent('click_link', 'shipping_page', 'no_lot_vin');
  }

  return (
    <>
      <Refinement
        label={<FormattedMessage id="vehicleCalculator.refinement.lotIdOrVin" />}
        input={
          <>
            <div className={classes.toggleWrap}>
              <ButtonLink
                label={<FormattedMessage id="vehicleCalculator.refinement.lotIdOrVin.toggleLabel1" />}
                onClick={handleToggleClick}
              />
            </div>

            <div>
              <InputPlane
                placeholder={intl.formatMessage({ id: 'vehicleCalculator.refinement.lotIdOrVin.placeholder' })}
                onChange={(_, v) => handleChange(v)}
                id="lotIdOrVin"
                name="lotIdOrVin"
                value={value}
                checkmark={Boolean(lot)}
                loading={isLoading}
              />
              {lot?.description && <div className={classes.ymm}>{lot.description}</div>}
            </div>
          </>
        }
      />

      <Fade isOpen={isOverlayShown} isAlwaysMounted>
        <div className={classes.overlay}>
          <div className={classes.notification}>
            <div className={classes.notificationHeader}>
              <FormattedMessage id="shared.label.featureIsComing" />
            </div>
            <div className={classes.notificationBody}>
              <div className={classes.notificationMessage}>
                <FormattedMessage id="vehicleCalculator.refinement.overlayMessage.pleaseUseYourActualLot" />
              </div>

              <Button
                label={<FormattedMessage id="membershipSettings.ctaGotIt" />}
                onClick={() => setIsOverlayShown(false)}
                className={classes.notificationCta}
              />
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default Lot;
