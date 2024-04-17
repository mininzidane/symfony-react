import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function CardIndentedContent({ children, className, ...restProps }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...restProps}>
      {children}
    </div>
  );
}

CardIndentedContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardIndentedContent.defaultProps = {
  className: null,
};

export default CardIndentedContent;
