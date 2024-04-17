import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Benefit from './Benefit';
import useStyles from './useStyles';

function Benefits() {
  const classes = useStyles();
  const { isUserCountry } = CountryService;
  const intl = useIntl();

  const isUA = isUserCountry('ukraine');
  const isBY = isUserCountry('belarus');
  const isRU = isUserCountry('russia');
  const isSpanish = isUserCountry('elSalvador');

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>{intl.formatMessage({ id: 'businessPage.benefits.title' })}</h2>
        <div className={classes.benefitsGrid}>
          <div>
            <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.0' })}</Benefit>

            <Benefit> {intl.formatMessage({ id: 'businessPage.benefits.1' })}</Benefit>

            <Benefit> {intl.formatMessage({ id: 'businessPage.benefits.2' })}</Benefit>

            <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.3' })}</Benefit>

            <Benefit> {intl.formatMessage({ id: 'businessPage.benefits.4' })}</Benefit>
          </div>

          <div>
            <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.5' })}</Benefit>

            <Benefit>
              <FormattedMessage
                id="businessPage.benefits.6"
                values={{ port: (isUA && 'Одессы') || (isBY && 'Клайпеды') || (isRU && 'Новороссийск') }}
              />
            </Benefit>

            <Benefit> {intl.formatMessage({ id: 'businessPage.benefits.7' })}</Benefit>

            <Benefit> {intl.formatMessage({ id: 'businessPage.benefits.8' })}</Benefit>

            {isSpanish && (
              <>
                <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.9' })}</Benefit>

                <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.10' })}</Benefit>

                <Benefit>{intl.formatMessage({ id: 'businessPage.benefits.11' })}</Benefit>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Benefits;
