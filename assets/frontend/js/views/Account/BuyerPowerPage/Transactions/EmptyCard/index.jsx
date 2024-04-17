import React from 'react';
import PropTypes from 'prop-types';
import SheetsSvg from './img/sheets.svg';
import useStyles from './useStyles';

function EmptyCard({ title, subtitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={SheetsSvg} width="34" height="38" alt={title} />
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

EmptyCard.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
};

export default EmptyCard;
