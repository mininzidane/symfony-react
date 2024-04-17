import React from 'react';
import PropTypes from 'prop-types';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useOceanQuotes from 'frontend/js/hooks/useOceanQuotes';
import LanguageService from 'frontend/js/api/LanguageService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Benefit from 'frontend/js/views/Shared/Benefit';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useStyles from './useStyles';

function Benefits({ country }) {
  const NY_PORT_NAME = 'New Jersey, NJ';
  const classes = useStyles();
  const countryName = country || BootstrapService.getAppValue('countryName');

  const { quotes, destination } = useOceanQuotes();
  const quote = quotes.find((v) => v.port_name === NY_PORT_NAME);
  const formattedQuote = quote && quote.ocean_quote ? NumberService.formatCurrency(quote.ocean_quote) : 0;
  const locale = LanguageService.getCurrentLocale();
  const port = locale === 'en' ? destination && destination.name : NY_PORT_NAME;

  return (
    <ContainerFullScreen className={classes.root} background={{ color: '#F1F1F8' }}>
      <SectionTitle text={<FormattedMessage id="homePage.intl.benefits.title" />} />

      <div className={classes.grid}>
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit1.title" />}
          subtitle={<FormattedMessage id="homePage.intl.benefits.benefit1.text" values={{ countryName }} />}
          type="copart"
        />
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit2.title" />}
          subtitle={<FormattedMessage id="homePage.intl.benefits.benefit2.text" />}
          type="liveAuction"
        />
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit3.title" />}
          subtitle={<FormattedMessage id="homePage.intl.benefits.benefit3.text" />}
          type="services"
        />
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit4.title" />}
          subtitle={<FormattedMessage id="homePage.intl.benefits.benefit4.text" />}
          type="website"
        />
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit5.title" />}
          subtitle={<FormattedMessage id="homePage.intl.benefits.benefit5.text" />}
          type="support"
        />
        <Benefit
          title={<FormattedMessage id="homePage.intl.benefits.benefit6.title" values={{ countryName }} />}
          subtitle={
            <FormattedMessage
              id="homePage.intl.benefits.benefit6.text"
              values={{ countryName, quote: formattedQuote, port: port || '' }}
            />
          }
          type="shipping"
        />
      </div>
    </ContainerFullScreen>
  );
}

Benefits.propTypes = {
  country: PropTypes.string,
};

Benefits.defaultProps = {
  country: null,
};

export default Benefits;
