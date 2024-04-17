import React from 'react';
import PropTypes from 'prop-types';

function IBoxTitle({ title }) {
  return (
    <div className="ibox-title">
      <h5>{title}</h5>
    </div>
  );
}

IBoxTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IBoxTitle;
