/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BootstrapService from 'frontend/js/api/BootstrapService';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useStyles from './useStyles';

function Shipping() {
  const classes = useStyles();
  const countryName = BootstrapService.getAppValue('countryName');

  return (
    <div className={classes.root}>
      <SectionTitle text={<FormattedMessage id="homePage.intl.shipping.title" values={{ countryName }} />} />

      <div className={classes.subTitle}>
        <FormattedMessage id="homePage.intl.shipping.subtitle" values={{ countryName }} />
      </div>
    </div>
  );
}

export default Shipping;
