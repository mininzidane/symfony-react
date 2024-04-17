import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import classnames from 'classnames';
import { pathToRegexp } from 'path-to-regexp';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function LinkItem({ label, link, isVisible, type }) {
  const classes = useStyles();

  if (!isVisible()) {
    return null;
  }

  if (type === 'highlightedNewItem') {
    return (
      <li className={classes.abmInventory}>
        <a href={link}>
          <strong>{label}</strong>
          <span>
            <FormattedMessage id="shared.label.new" />
          </span>
        </a>
      </li>
    );
  }

  const testPath = link.replace('?', '\\?');
  const isActive = pathToRegexp(testPath).test(window.location.pathname);

  return (
    <li className={classnames(classes.root, { 'is-active': isActive })}>
      <a href={link} className={classes.toggle}>
        <span className={classes.label}>{label}</span>
      </a>
    </li>
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
