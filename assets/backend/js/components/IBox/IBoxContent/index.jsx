import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function IBoxContent({ children, className }) {
  return <div className={classnames('ibox-content', className)}>{children}</div>;
}

IBoxContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
};

IBoxContent.defaultProps = {
  className: '',
};

export default IBoxContent;
