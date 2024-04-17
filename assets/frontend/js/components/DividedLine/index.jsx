import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function DividedLine({ children, className, dividerClassName }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {children.filter(Boolean).map((item, i) => {
        if (i === 0) {
          return item;
        }

        return (
          <Fragment key={`DividedLine-item${i}`}>
            <div className={classNames(classes.divider, dividerClassName)}> </div>
            {item}
          </Fragment>
        );
      })}
    </div>
  );
}

DividedLine.propTypes = {
  className: PropTypes.string,
  dividerClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

DividedLine.defaultProps = {
  className: '',
  dividerClassName: '',
};

export default DividedLine;
