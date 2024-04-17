/* eslint-disable react/prop-types */
import React from 'react';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Accordion from 'frontend/js/components/Accordion';
import data from './data';
import useStyles from './useStyles';

function Faq({ iso2 }) {
  const classes = useStyles();
  const questions = data[iso2] || [];

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        <FormattedMessage id="shared.label.frequentlyAskedQuestions" />
      </h1>

      <Accordion className={classes.accordion}>
        {questions.map((question, index) => (
          <AccordionItem
            classes={{
              root: classes.accordionItem,
              expanded: classes.expanded,
              header: classes.header,
              content: classes.content,
            }}
            title={question.title}
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
            {question.body}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Faq;
