/* eslint-disable react/prop-types */
import React from 'react';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Accordion from 'frontend/js/components/Accordion';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import Link from 'frontend/js/components/Link';
import PhoneLink from 'frontend/js/components/PhoneLink';
import data from './data';
import useStyles from './useStyles';

function Faq() {
  const classes = useStyles();
  const { socialContacts, phoneNumber } = OfficeLocationsService.getIntlOfficeLocation();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        <FormattedMessage id="shared.label.frequentlyAskedQuestions" />
      </h1>

      <Accordion className={classes.accordion}>
        {data.map((question, index) => (
          <AccordionItem
            classes={{
              root: classes.accordionItem,
              expanded: classes.expanded,
              header: classes.header,
              content: classes.content,
            }}
            title={<FormattedMessage id={question.title} />}
            id={`${index}`}
            key={index}
            expandIcon={() => (
              <svg
                className={classes.arrow}
                width="18"
                height="18"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="7" width="2" height="12" fill="#C4C4C4" transform="rotate(-90 0 7)" />
                <rect x="5" width="2" height="12" fill="#C4C4C4" />
              </svg>
            )}
          >
            <FormattedMessage
              id={question.body}
              values={{
                whatsapp: (
                  <Link href={SocialLinksService.whatsapp(socialContacts?.whatsapp)} isTargetBlank>
                    {socialContacts?.whatsapp}
                  </Link>
                ),
                phoneNumber: <PhoneLink phone={phoneNumber} />,
              }}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Faq;
