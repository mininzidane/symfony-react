/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function Step({ completed, number, title, description, link, footer }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, completed && classes.completed)}>
      <div className="grid-x jc-sb no-wrap">
        <h3 className="fw-7 text-sm m-0">
          {number}. {title}
        </h3>
        {completed ? (
          <div className={classes.checkbox}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-18858 -19314 18 18">
              <path
                fill="#47A500"
                className="cls-1"
                d="M19,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2ZM10,17,5,12.192l1.4-1.346L10,14.308,17.6,7,19,8.346,10,17Z"
                transform="translate(-18861 -19317)"
              />
            </svg>
          </div>
        ) : (
          <div className={classNames(classes.checkbox, classes.emptyCheckbox)} />
        )}
      </div>
      {!completed && <p className="mb-20 mt-10">{description}</p>}
      {!completed && (footer || <Button label={link.label} href={link.href} onClick={link.onClick} />)}
    </div>
  );
}

export default Step;
