/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../useStyles';

function GeneralMessageBanner({ title, message }) {
  const classes = useStyles();

  return (
    <>
      {title && <div className={classes.title}>{title}</div>}
      <div className={classes.content} dangerouslySetInnerHTML={{ __html: message }} />
    </>
  );
}

GeneralMessageBanner.defaultProps = {
  title: '',
  message: '',
};

GeneralMessageBanner.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default GeneralMessageBanner;
