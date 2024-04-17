import React from 'react';
import PropTypes from 'prop-types';

function PopupWindowLink({ url, title, label, width, height, resizable, scrollbars, className }) {
  const styles = {
    width,
    height,
    resizable: resizable ? 'yes' : 'no',
    scrollbars: scrollbars ? 'yes' : 'no',
  };

  const style = Object.keys(styles)
    .map((key) => `${key}=${styles[key]}`)
    .join(',');

  function handleOnClick(e) {
    e.preventDefault();

    window.open(url, title, style);

    return false;
  }

  return (
    <a href={url} title={title} onClick={handleOnClick} className={className}>
      {label}
    </a>
  );
}

PopupWindowLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  resizable: PropTypes.bool,
  scrollbars: PropTypes.bool,
  className: PropTypes.string,
};

PopupWindowLink.defaultProps = {
  title: '',
  width: 850,
  height: 800,
  resizable: true,
  scrollbars: true,
  className: '',
};

export default PopupWindowLink;
