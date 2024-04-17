import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import InformationSvg from './img/ic_information.svg';
import useStyles from './useStyles';

function MissingOwnershipDocuments() {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <img src={InformationSvg} alt="Checkmark" width={49} height={48} className={classes.icon} />
      <div className={classes.title}>
        {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.missingOwnershipDocuments.title' })}
      </div>
      <div className={classes.desc}>
        {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.missingOwnershipDocuments.desc' })}
      </div>
    </div>
  );
}

export default MissingOwnershipDocuments;
