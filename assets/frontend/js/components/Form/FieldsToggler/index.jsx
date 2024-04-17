import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function FieldsToggler({ className, style, label, onClick, tabIndex }) {
  const [isOpened, setOpened] = useState(false);

  function clickHandler() {
    setOpened(!isOpened);
    onClick();
  }

  return (
    <button
      type="button"
      tabIndex={tabIndex || null}
      style={style}
      onClick={clickHandler}
      className={classNames('no-styles grid-x ai-fs fxw-n text-blue cur-p us-n ', className)}
    >
      <div
        className={classNames('svg-icon', { 'rotated-cw-90': isOpened })}
        style={{ width: 5, height: 10, margin: '6px 10px 0 2px' }}
      >
        <svg width="5" height="10" viewBox="0 0 5 10">
          <path
            id="path"
            d="M7,10l5,5,5-5Z"
            transform="translate(-10 17) rotate(-90)"
            fill="#0070c7"
            fillRule="evenodd"
          />
        </svg>
      </div>

      <div style={{ textAlign: 'left' }}>{label}</div>
    </button>
  );
}

FieldsToggler.defaultProps = {
  className: '',
  tabIndex: '',
  style: {},
  onClick: () => {},
};

FieldsToggler.propTypes = {
  label: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  tabIndex: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(FieldsToggler);
