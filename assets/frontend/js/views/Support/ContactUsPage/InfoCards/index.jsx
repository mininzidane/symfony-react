import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import RouterService from 'frontend/js/api/RouterService';
import InfoCard from './InfoCard';
import MagnifyingGlassSvg from './img/magnifying-glass.svg';
import QuestionMarkSvg from './img/question-mark.svg';
import ShieldSvg from './img/shield.svg';
import useStyles from './useStyles';

function InfoCards() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <InfoCard
            icon={MagnifyingGlassSvg}
            description={<FormattedMessage id="contactUsPage.info1.description" />}
            title={<FormattedMessage id="contactUsPage.info1.title" />}
            link={{
              label: <FormattedMessage id="contactUsPage.info1.link" />,
              href: 'https://helpcenter.autobidmaster.com',
            }}
          />
          <InfoCard
            icon={ShieldSvg}
            description={<FormattedMessage id="contactUsPage.info2.description" />}
            title={<FormattedMessage id="contactUsPage.info2.title" />}
            link={{
              label: <FormattedMessage id="contactUsPage.info2.link" />,
              href: RouterService.getLocalizedHcRoute('hcRulesAndPolicies'),
            }}
          />
          <InfoCard
            icon={QuestionMarkSvg}
            description={<FormattedMessage id="contactUsPage.info3.description" />}
            title={<FormattedMessage id="contactUsPage.info3.title" />}
            link={{
              label: <FormattedMessage id="contactUsPage.info3.link" />,
              href: RouterService.getRoute('howToBuy'),
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default InfoCards;
