import React from 'react';
import Container from 'frontend/js/components/Container';
import Advantage from './Advantage';
import useStyles from './useStyles';
import DiscountSVG from './img/ic_discount.svg';
import FeeSVG from './img/ic_fee.svg';
import FreeVinSVG from './img/ic_free_vin.svg';

function Advantages() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>
          Si está listo para comprar al menos quince vehículos al año, puede registrarse ahora para obtener grandes
          ahorros ofertando, comprando y enviando su vehículo a nivel nacional e internacional.
        </h2>
        <div className={classes.advantages}>
          <Advantage icon={FeeSVG} title="Descuento en tarifas" desc="de transacción fijas de USD $299 a $175 y más" />
          <Advantage
            icon={DiscountSVG}
            title="10% de descuento"
            desc="en el envío de su vehículo a nivel nacional e internacional"
          />
          <Advantage icon={FreeVinSVG} title="5 créditos" desc="gratis de chequeos VIN al mes" />
        </div>
      </Container>
    </div>
  );
}

export default Advantages;
