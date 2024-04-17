import React from 'react';
import HeadphonesSvg from 'frontend/images/shared/various/headphones.svg';
import useContactPhone from 'frontend/js/hooks/useContactPhone';
import useStyles from './useStyles';

function Phone() {
  const classes = useStyles();
  const phoneNumber = useContactPhone();

  return (
    <a href={`tel:${phoneNumber}`} className={classes.root}>
      <img width="12" height="16" src={HeadphonesSvg} className={classes.icon} alt="Phone" />
      <span>{phoneNumber}</span>
    </a>
  );
}

export default Phone;
