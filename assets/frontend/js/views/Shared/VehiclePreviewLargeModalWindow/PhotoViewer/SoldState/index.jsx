import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import Image from 'frontend/js/components/Image';
import Button from 'frontend/js/components/Button';
import ClearVinButton from 'frontend/js/views/Shared/ClearVinButton';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import PhotosIcon from './img/photos.svg';
import useStyles from './useStyles';

function SoldState({ lot }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  function handleUnAuthClick() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  return (
    <div className="pos-r">
      <Image
        className={classes.blurred}
        ratio={75}
        fallback
        lazy
        placeholder
        src={lot.largeImage}
        alt={lot.description}
      />

      {lot.vin && (
        <>
          <div className="coverer zi-xs op-25 bg-black" />

          <div className="is-centered pos-a ta-c zi-xs wide">
            <div className={classNames(classes.icon, 'svg-icon mb-20 d-ib')}>
              <img src={PhotosIcon} alt="Photos icon" />
            </div>

            <div className={classes.text}>
              <FormattedMessage id="lotPage.gallery.cvPromo" />
            </div>

            {!isAuthenticated ? (
              <Button
                label={<FormattedMessage id="lotPage.clearvinPromo.getFullHistoryReport" />}
                isInline
                className="mt-20 js-track-event"
                isTargetBlank
                color="yellow"
                isNofollow
                data-step="abm_lotpage"
                data-substep="cv_button_sold_lot_page_clicked"
                onClick={handleUnAuthClick}
              />
            ) : (
              <ClearVinButton
                lot={lot}
                component={({ creditsCount, ...props }) => (
                  <Button
                    {...props}
                    label={
                      creditsCount ? (
                        <>
                          <FormattedMessage id="lotPage.clearvinPromo.getFreeFullReports" /> ({creditsCount})
                        </>
                      ) : (
                        <FormattedMessage id="lotPage.clearvinPromo.getFullHistoryReport" />
                      )
                    }
                    isInline
                    fontWeight={700}
                    className="mt-20 js-track-event"
                    color="yellow"
                    isTargetBlank
                    isNofollow
                    data-step="abm_lotpage"
                    data-substep="cv_button_sold_lot_page_clicked"
                  />
                )}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

SoldState.propTypes = {
  lot: LotShape.isRequired,
};

export default SoldState;
