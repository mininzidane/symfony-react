import React from 'react';
import Benefit from './Benefit';
import useStyles from './useStyles';
import AlabamaPng from './img/alabama.png';
import WisconsinPng from './img/wisconsin.png';
import MichiganPng from './img/michigan.png';

function Benefits() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Benefit>Tarifas de transacción fijas de USD $175.00</Benefit>
      <Benefit>Descuentos del 10% en el envío del vehículo</Benefit>
      <Benefit>
        Compre en{' '}
        <span className={classes.nowrap}>
          <img src={AlabamaPng} alt="Alabama" className={classes.flag} /> Alabama,
        </span>{' '}
        <span className={classes.nowrap}>
          <img src={WisconsinPng} alt="Wisconsin" className={classes.flag} /> Wisconsin,{' '}
        </span>
        <span className={classes.nowrap}>
          <img src={MichiganPng} alt="Michigan" className={classes.flag} /> Michigan – Sin restricciones
        </span>
      </Benefit>
      <Benefit>Regístrese y comience a comprar en 30 segundos</Benefit>
      <Benefit>Atención especializada para importadores mayoristas</Benefit>
    </div>
  );
}

export default Benefits;
