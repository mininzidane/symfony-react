import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import Accordion from 'frontend/js/components/Accordion';
import Card from '../../Card';
import useStyles from './useStyles';

function Faq() {
  const classes = useStyles();

  return (
    <Card title={<FormattedMessage id="checkoutIntlShippingPage.faq.title" />} className={classes.root}>
      <Accordion>
        {[
          {
            title: 'checkoutIntlShippingPage.faq.item1.title',
            body: <FormattedMessage id="checkoutIntlShippingPage.faq.item1.description" />,
          },
          {
            title: 'checkoutIntlShippingPage.faq.item2.title',
            body: <FormattedMessage id="checkoutIntlShippingPage.faq.item2.description" />,
          },
          {
            title: 'checkoutIntlShippingPage.faq.item3.title',
            body: <FormattedMessage id="checkoutIntlShippingPage.faq.item3.description" />,
          },
        ].map((item) => (
          <AccordionItem
            classes={{
              root: classes.accordionItem,
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
    </Card>
  );
}

export default Faq;
