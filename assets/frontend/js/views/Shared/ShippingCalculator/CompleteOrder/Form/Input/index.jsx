import React from 'react';
import PropTypes from 'prop-types';

function Input({ component: Component, ...restProps }) {
  return (
    <div className="wide">
      <Component {...restProps} />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.node.isRequired,
  component: PropTypes.PropTypes.elementType.isRequired,
};

export default Input;
