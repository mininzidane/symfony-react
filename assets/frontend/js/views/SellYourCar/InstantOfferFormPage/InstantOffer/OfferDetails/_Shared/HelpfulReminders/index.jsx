import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import RouterService from 'frontend/js/api/RouterService';
import Accordion from 'frontend/js/components/Accordion';
import useStyles from './useStyles';

function HelpfulReminders() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        <FormattedMessage id="sellYourCarPage.helpfulReminders.title" />
      </h1>
      <p className={classes.subtitle}>
        <FormattedMessage
          id="sellYourCarPage.helpfulReminders.subtitle"
          values={{ a: (chunks) => <a href={RouterService.getLocalizedHcRoute()}>{chunks}</a> }}
        />
      </p>
      <Accordion>
        {[
          {
            title: 'sellYourCarPage.helpfulReminders.item1.title',
            body: <FormattedMessage id="sellYourCarPage.helpfulReminders.item1.desc" />,
          },
          {
            title: 'sellYourCarPage.helpfulReminders.item2.title',
            body: <FormattedMessage id="sellYourCarPage.helpfulReminders.item2.desc" />,
          },
          {
            title: 'sellYourCarPage.helpfulReminders.item3.title',
            body: <FormattedMessage id="sellYourCarPage.helpfulReminders.item3.desc" />,
          },
          {
            title: 'sellYourCarPage.helpfulReminders.item4.title',
            body: <FormattedMessage id="sellYourCarPage.helpfulReminders.item4.desc" />,
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
            {item.body}
          </AccordionItem>
        ))}
      </Accordion>

      <div className={classnames(classes.subtitle, classes.bottomSubtitle)}>
        <FormattedMessage
          id="howShippingWorks.faq.subtitle2"
          values={{ a: (chunks) => <a href={RouterService.getRoute('contactUs')}>{chunks}</a> }}
        />
      </div>
    </div>
  );
}

export default HelpfulReminders;
