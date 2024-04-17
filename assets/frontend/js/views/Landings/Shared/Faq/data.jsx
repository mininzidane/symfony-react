import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import ScrollService from 'frontend/js/lib/utils/ScrollService';

const howToBuy = (chunk) => <a href={RouterService.getRoute('howToBuy')}>{chunk}</a>;
const rules = (chunk) => <a href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>{chunk}</a>;
const contact = (chunk) => (
  <ButtonLink
    label={chunk}
    onClick={() => {
      ScrollService.scrollIntoViewById('lounge-lead-form', 15, 'smooth');
      setTimeout(() => document.getElementById('lounge-lead-name').focus());
    }}
  />
);
const businessBuyers = (chunk) => <a href={RouterService.getRoute('businessBuyers')}>{chunk}</a>;

export default {
  NG: [
    {
      title: <FormattedMessage id="loungePage.faq.NG.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.NG.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.NG.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.NG.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.NG.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.NG.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.NG.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.NG.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  BY: [
    {
      title: <FormattedMessage id="loungePage.faq.BY.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.BY.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BY.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.BY.question2.body" values={{ contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BY.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.BY.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BY.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.BY.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  BG: [
    {
      title: <FormattedMessage id="loungePage.faq.BG.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.BG.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BG.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.BG.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BG.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.BG.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.BG.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.BG.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  GE: [
    {
      title: <FormattedMessage id="loungePage.faq.GE.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.GE.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GE.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.GE.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GE.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.GE.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GE.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.GE.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  RO: [
    {
      title: <FormattedMessage id="loungePage.faq.RO.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.RO.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.RO.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.RO.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.RO.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.RO.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.RO.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.RO.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  UA: [
    {
      title: <FormattedMessage id="loungePage.faq.UA.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.UA.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.UA.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.UA.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.UA.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.UA.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.UA.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.UA.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  SV: [
    {
      title: <FormattedMessage id="loungePage.faq.SV.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.SV.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.SV.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.SV.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.SV.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.SV.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.SV.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.SV.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  GT: [
    {
      title: <FormattedMessage id="loungePage.faq.GT.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.GT.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GT.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.GT.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GT.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.GT.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.GT.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.GT.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  KR: [
    {
      title: <FormattedMessage id="loungePage.faq.KR.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.KR.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.KR.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.KR.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.KR.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.KR.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.KR.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.KR.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
  PL: [
    {
      title: <FormattedMessage id="loungePage.faq.PL.question1.title" />,
      body: <FormattedMessage id="loungePage.faq.PL.question1.body" values={{ howToBuy, rules, contact }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.PL.question2.title" />,
      body: <FormattedMessage id="loungePage.faq.PL.question2.body" values={{ a: businessBuyers }} />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.PL.question3.title" />,
      body: <FormattedMessage id="loungePage.faq.PL.question3.body" />,
    },
    {
      title: <FormattedMessage id="loungePage.faq.PL.question4.title" />,
      body: <FormattedMessage id="loungePage.faq.PL.question4.body" values={{ a: businessBuyers }} />,
    },
  ],
};
