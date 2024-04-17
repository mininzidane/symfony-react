import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Products({ items, className }) {
  const classes = useStyles();

  if (!items.length) {
    return null;
  }

  return (
    <div className={classnames(classes.root, className)}>
      {items.map((item) => (
        <div className="grid-x jc-sb mt-10 pt-2 pr-0 no-wrap" key={item.product}>
          <div className="pr-20">{item.product}</div>
          <div>
            <strong>{item.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

Products.defaultProps = {
  items: [],
  className: '',
};

Products.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};

export default Products;
