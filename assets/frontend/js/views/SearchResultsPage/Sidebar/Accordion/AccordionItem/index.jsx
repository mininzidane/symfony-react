import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import usePreviousNonNullish from 'frontend/js/hooks/usePreviousNonNullish';
import useStyles from './useStyles';

function ExtendedAccordionItem({
  label,
  children,
  initialExpanded,
  isActive,
  onToggle,
  animationDuration,
  overflow,
  onResetClick,
  titleQaId,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(initialExpanded);
  const prevIsActive = usePreviousNonNullish(isActive);

  function handleChange(id) {
    setExpanded(!expanded);
    onToggle(id);
  }

  return (
    <AccordionItem
      classes={{
        root: classes.accordionItem,
        expanded: classes.accordionExpanded,
        header: classes.accordionHeader,
        arrow: classes.arrow,
        content: classnames(classes.accordionContent, overflow && 'is-overflow', 'qa_source_list'),
      }}
      titleComponent={
        <div className={classnames(classes.accordionItemTitle, titleQaId)}>
          <div className={classes.accordionItemLabel}>{label}</div>
          {isActive && <div className={classes.accordionItemDot} />}
          {onResetClick && (
            <button className={classes.resetBtn} type="button" onClick={onResetClick}>
              <FormattedMessage id="shared.cta.reset" />
            </button>
          )}
        </div>
      }
      id={label}
      key={label}
      expandIcon={($props) => (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...$props}>
          <rect y="7" width="2" height="12" fill="#2158F5" transform="rotate(-90 0 7)" />
          <rect x="5" width="2" height="12" fill="#2158F5" />
        </svg>
      )}
      expanded={expanded}
      handleChange={handleChange}
      rerender={expanded || isActive || prevIsActive !== isActive}
      animationDuration={animationDuration}
      rootClassName="qa_id_inside_elements"
    >
      {children}
    </AccordionItem>
  );
}

ExtendedAccordionItem.defaultProps = {
  initialExpanded: false,
  isActive: false,
  overflow: false,
  animationDuration: 'auto',
  titleQaId: '',
  onToggle: () => {},
  onResetClick: () => {},
};

ExtendedAccordionItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onResetClick: PropTypes.func,
  titleQaId: PropTypes.string,
  initialExpanded: PropTypes.bool,
  animationDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  isActive: PropTypes.bool,
  overflow: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default ExtendedAccordionItem;
