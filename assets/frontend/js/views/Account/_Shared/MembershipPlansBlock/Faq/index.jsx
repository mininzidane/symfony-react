import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import RouterService from 'frontend/js/api/RouterService';
import Accordion from 'frontend/js/components/Accordion';
import useStyles from './useStyles';

function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        <FormattedMessage id="membershipPlans.qa.title" />
      </h1>
      <p className={classes.subtitle}>
        <FormattedMessage
          id="membershipPlans.qa.subtitle"
          values={{ a: (chunks) => <a href={RouterService.getLocalizedHcRoute()}>{chunks}</a> }}
        />
      </p>
      <Accordion>
        {[
          {
            title: 'membershipPlans.reviews.review1.title',
            body: 'membershipPlans.reviews.review1.body',
          },
          {
            title: 'membershipPlans.reviews.review2.title',
            body: 'membershipPlans.reviews.review2.body',
          },
          {
            title: 'membershipPlans.reviews.review3.title',
            body: 'membershipPlans.reviews.review3.body',
          },
          {
            title: 'membershipPlans.reviews.review4.title',
            body: 'membershipPlans.reviews.review4.body',
          },
          {
            title: 'membershipPlans.reviews.review5.title',
            body: 'membershipPlans.reviews.review5.body',
          },
        ].map((item) => (
          <AccordionItem
            classes={{
              root: classes.accordionItem,
              expanded: classes.expanded,
              arrow: classes.arrow,
              header: classes.header,
              content: classes.content,
            }}
            title={<FormattedMessage id={item.title} />}
            id={item.title}
            key={item.title}
          >
            <FormattedMessage id={item.body} />
          </AccordionItem>
        ))}
      </Accordion>

      <div className={classnames(classes.subtitle, classes.bottomSubtitle)}>
        <FormattedMessage
          id="membershipPlans.qa.subtitle2"
          values={{ a: (chunks) => <a href={RouterService.getRoute('contactUs')}>{chunks}</a> }}
        />
      </div>
    </div>
  );
}

export default Faq;
