import React from 'react';
import BootstrapService from 'frontend/js/api/BootstrapService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useStyles from './useStyles';

function AboutCompany() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <SectionTitle text={<FormattedMessage id="homePage.intl.aboutCompany.title" />} />
        <div className={classes.content}>
          <FormattedMessage
            id="homePage.intl.aboutCompany.info"
            values={{ countryName: BootstrapService.getAppValue('countryName') }}
          />
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default AboutCompany;
