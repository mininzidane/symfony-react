import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import RouterService from 'frontend/js/api/RouterService';
import Accordion from 'frontend/js/components/Accordion';
import Container from 'frontend/js/components/Container';

import useStyles from './useStyles';

function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h1 className={classes.title}>
          <FormattedMessage id="howShippingWorks.faq.title" />
        </h1>
        <p className={classes.subtitle}>
          <FormattedMessage
            id="howShippingWorks.faq.subtitle"
            values={{ a: (chunks) => <a href={RouterService.getLocalizedHcRoute()}>{chunks}</a> }}
          />
        </p>
        <Accordion>
          {[
            {
              title: 'howShippingWorks.item1.title',
              body: (
                <div className={classes.item1}>
                  <FormattedMessage id="howShippingWorks.item1.description" />
                  <img
                    style={{ width: 450, marginTop: 15 }}
                    src="https://helpcenter.autobidmaster.com/hc/article_attachments/360024600011/mceclip0.png"
                    alt="Storage Rates"
                  />
                </div>
              ),
            },
            {
              title: 'howShippingWorks.item2.title',
              body: <FormattedMessage id="howShippingWorks.item2.description" />,
            },
            {
              title: 'howShippingWorks.item3.title',
              body: <FormattedMessage id="howShippingWorks.item3.description" />,
            },
            {
              title: 'howShippingWorks.item4.title',
              body: (
                <>
                  <FormattedMessage id="howShippingWorks.item4.ul" />
                  <ul style={{ paddingLeft: 20 }}>
                    <li>
                      <FormattedMessage id="howShippingWorks.item4.li1" />
                    </li>
                    <li>
                      <FormattedMessage id="howShippingWorks.item4.li2" />
                    </li>
                    <li>
                      <FormattedMessage id="howShippingWorks.item4.li3" />
                    </li>
                    <li>
                      <FormattedMessage id="howShippingWorks.item4.li4" />
                    </li>
                    <li>
                      <FormattedMessage id="howShippingWorks.item4.li5" />
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: 'howShippingWorks.item5.title',
              body: <FormattedMessage id="howShippingWorks.item5.description" />,
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
      </Container>
    </div>
  );
}

export default Faq;
