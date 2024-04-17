import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function LinkItem({ label, link, isVisible, type }) {
  const classes = useStyles();

  if (!isVisible()) {
    return null;
  }

  if (type === 'highlightedNewItem') {
    return (
      <div className={classes.abmInventory}>
        <a href={link}>
          <strong>{label}</strong>
          <span>
            <FormattedMessage id="shared.label.new" />
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <a href={link} className={classes.trigger}>
        <span>{label}</span>
      </a>
    </div>
  );
}

LinkItem.propTypes = {
  label: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.string,
  isVisible: PropTypes.func,
};

LinkItem.defaultProps = {
  isVisible: () => true,
  type: '',
};

export default LinkItem;
