/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function DocumentEntry({ image, icon, title, subtitle, action, type, isMobileActionFullWidth }) {
  const classes = useStyles({ isMobileActionFullWidth });

  return (
    <div className={classnames(classes.root, `is-${type}`)}>
      {image && <div className={classes.imageContainer}>{image}</div>}
      {icon && <div className={classes.iconContainer}>{icon}</div>}

      <div>
        <div className={classes.documentDescription}>
          <strong>{title}</strong>
        </div>
        <div className={classes.viewLinkWrap}>{subtitle}</div>
      </div>

      <div className={classes.action}>{action}</div>
    </div>
  );
}

export default DocumentEntry;
