import React from 'react';
import PropTypes from 'prop-types';
import IBoxTitle from 'backend/js/components/IBox/IBoxTitle';
import IBoxContent from 'backend/js/components/IBox/IBoxContent';

function IBox({ title, children, contentClassName }) {
  return (
    <div className="ibox float-e-margins">
      {title && <IBoxTitle title={title} />}
      <IBoxContent className={contentClassName}>{children}</IBoxContent>
    </div>
  );
}

IBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
  contentClassName: PropTypes.string,
};

IBox.defaultProps = {
  title: '',
  contentClassName: '',
};

export default IBox;
