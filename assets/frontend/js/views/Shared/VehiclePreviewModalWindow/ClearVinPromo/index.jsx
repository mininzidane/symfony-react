/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import LanguageService from 'frontend/js/api/LanguageService';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CvBadgeGraySvg from 'frontend/images/shared/logo/cv-badge-gray.svg';
import useStyles from './useStyles';

function ClearVinPromo({ lot }) {
  const classes = useStyles();
  const { id, vin, vinHash } = lot;
  const clearVinRouteParams = vinHash ? { lotNumber: id } : { vin };
  const clearvinLocale = LanguageService.getClearvinSupportedLocale();

  return (
    <div className={classes.root}>
      <div className={classes.clearvin}>
        <img className={classes.image} src={CvBadgeGraySvg} width={84} alt="ClearVIN" />

        <div className={classes.vin}>
          <FormattedMessage id="shared.label.vin" />: <strong>{vin}</strong>
        </div>
      </div>

      <div className={classes.buttonWrap}>
        <Button
          label={<FormattedMessage id="shared.cta.getHistoryReport" />}
          href={RouterService.getRoute('clearvinPayment', clearVinRouteParams, true, { locale: clearvinLocale })}
          color="green"
          size="sm"
          className={classes.button}
          isTargetBlank
          isNofollow
        />
      </div>
    </div>
  );
}

export default ClearVinPromo;
