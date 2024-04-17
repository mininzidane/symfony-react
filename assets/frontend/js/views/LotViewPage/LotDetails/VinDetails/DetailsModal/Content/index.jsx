/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Body from './Body';
import useStyles from './useStyles';

function Content({ lot, handleClose }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className="text-xl fw-7">
          {lot.year} {lot.make} {lot.model}
        </div>

        <button
          type="button"
          onClick={handleClose}
          className={classnames(classes.closeButton, 'svg-icon easy-hover op-uh')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14.5452L14.5454 0L16 1.45449L1.45457 15.9997L0 14.5452Z" fill="#606060" />
            <path
              d="M1.45508 2.39027e-05L16.0005 14.5452L14.546 15.9998L0.000568307 1.45458L1.45508 2.39027e-05Z"
              fill="#606060"
            />
          </svg>
        </button>
      </div>

      <div className={classnames(classes.body, 'scrollbar')}>
        <Body vin={lot.vin} />
      </div>
    </>
  );
}

export default Content;
