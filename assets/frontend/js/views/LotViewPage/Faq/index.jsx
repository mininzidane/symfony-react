import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import HelpCenterBlueSvg from 'frontend/images/shared/various/help-center-blue.svg';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import useStyles from './useStyles';
import LotPageBlock from '../LotPageBlock';

function Faq() {
  const classes = useStyles();
  const intl = useIntl();
  const { getLocalizedHcRoute, getRoute } = RouterService;

  const translationSets = {
    title: intl.formatMessage({ id: 'lotPage.faq.title' }),
    helpCenter: intl.formatMessage({ id: 'shared.cta.helpCenter' }),
    question1: intl.formatMessage({ id: 'lotPage.faq.question1' }),
    question2: intl.formatMessage({ id: 'lotPage.faq.question2' }),
    question3: intl.formatMessage({ id: 'lotPage.faq.question3' }),
    question4: intl.formatMessage({ id: 'lotPage.faq.question4' }),
    answer1: intl.formatMessage(
      { id: 'lotPage.faq.answer1' },
      {
        regLink: (chunks) => (
          <Link href={getLocalizedHcRoute('hcHowToRegister')} isTargetBlank>
            {chunks}
          </Link>
        ),
        depositLink: (chunks) => (
          <Link href={getLocalizedHcRoute('hcHowToIncreaseSecurityDeposit')} isTargetBlank>
            {chunks}
          </Link>
        ),
        videoLink: (chunks) => (
          <Link href={getLocalizedHcRoute('hcHowToBidOnPreliminaryAndLiveAuctions')} isTargetBlank>
            {chunks}
          </Link>
        ),
      },
    ),
    answer2: intl.formatMessage(
      { id: 'lotPage.faq.answer2' },
      {
        paymentLink: (chunks) => (
          <Link href={getLocalizedHcRoute('hcHowToPayOnceWon')} isTargetBlank>
            {chunks}
          </Link>
        ),
        purchasesLink: (chunks) => (
          <Link href={getRoute('purchases')} isTargetBlank>
            {chunks}
          </Link>
        ),
      },
    ),
    answer3: intl.formatMessage(
      { id: 'lotPage.faq.answer3' },
      {
        inspectLink: (chunks) => (
          <Link href={getLocalizedHcRoute('hcMoreAboutThisVehicle')} isTargetBlank>
            {chunks}
          </Link>
        ),
        cvLink: (chunks) => (
          <Link href={getRoute('clearvin', false, true)} isTargetBlank isNofollow>
            {chunks}
          </Link>
        ),
      },
    ),
    answer4: intl.formatMessage(
      { id: 'lotPage.faq.answer4' },
      {
        officePhone: <Link href={CompanyService.officePhone.href}>{CompanyService.officePhone.formatted}</Link>,
      },
    ),
  };

  return (
    <LotPageBlock>
      <Card
        style={{ position: 'relative' }}
        title={
          <div className={classes.title}>
            <span>{translationSets.title}</span>
            <Link href={getLocalizedHcRoute()} className={classes.helpCenter} isTargetBlank>
              <img src={HelpCenterBlueSvg} alt="Help Center" />
              <span>{translationSets.helpCenter}</span>
            </Link>
          </div>
        }
      >
        <CardIndentedContent>
          <div className={classes.grid}>
            <div className={classes.questionsWrapper}>
              <div className={classes.question}>{translationSets.question1}</div>
              <div className={classes.answer}>{translationSets.answer1}</div>

              <div className={classes.question}>{translationSets.question2}</div>
              <div className={classes.answer}>{translationSets.answer2}</div>
            </div>

            <div className={classes.questionsWrapper}>
              <div className={classes.question}>{translationSets.question3}</div>
              <div className={classes.answer}>{translationSets.answer3}</div>

              <div className={classes.question}>{translationSets.question4}</div>
              <div className={classes.answer}>{translationSets.answer4}</div>
            </div>
          </div>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default Faq;
