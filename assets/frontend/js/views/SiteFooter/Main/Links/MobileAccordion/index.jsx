import React from 'react';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import Accordion from 'frontend/js/components/Accordion';
import data from '../data';
import useStyles from './useStyles';

function MobileAccordion() {
  const classes = useStyles();

  return (
    <Accordion>
      {Object.values(data).map((group) => (
        <AccordionItem
          classes={{
            root: classes.accordionItem,
            expanded: classes.expanded,
            arrow: classes.arrow,
            header: classes.header,
            content: classes.content,
          }}
          title={<span dangerouslySetInnerHTML={{ __html: group.title }} />}
          id={group.title}
          key={group.title}
        >
          {group.links.map((link, index) => {
            if (typeof link.isVisible === 'function' && !link.isVisible()) {
              return null;
            }

            return (
              <a key={index} className={classes.link} href={link.href}>
                {link.label}
              </a>
            );
          })}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default MobileAccordion;
