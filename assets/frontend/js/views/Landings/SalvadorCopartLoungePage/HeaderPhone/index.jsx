import React from 'react';
import useContactPhone from 'frontend/js/hooks/useContactPhone';
import HeadphonesSvg from 'frontend/images/shared/various/headphones.svg';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function Phone() {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();
  const phoneNumber = useContactPhone();

  return (
    <div className={classes.root}>
      <img width="12" height="16" src={HeadphonesSvg} className={classes.icon} alt="Phone" />
      {isAboveLg && <>¡Llama ya al&nbsp;</>}
      <a href={`tel:${phoneNumber}`} className={classes.link}>
        <span>{phoneNumber}</span>
      </a>
      {isAboveLg && <>&nbsp;o Visítanos a nuestra oficina!</>}
    </div>
  );
}

export default Phone;
