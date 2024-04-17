import React from 'react';
import Feature from './Feature';
import BidSvg from './img/ic_bid.svg';
import SaveSvg from './img/ic_save.svg';
import HelpSvg from './img/ic_help.svg';
import BrokerSvg from './img/ic_broker.svg';
import useStyles from './useStyles';

function Features() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Feature
        icon={BidSvg}
        text="<strong>Ofertas transparentes:</strong> sin tarifas ni márgenes ocultos. Elige coches y participa tú mismo en la subasta."
        alt="Ofertas transparentes"
      />

      <Feature
        icon={BrokerSvg}
        text="<strong>Acceso a subastas en los 50 estados, incluido</strong><br />ALABAMA, MICHIGAN, WISCONSIN"
        alt="Acceso a subastas en los 50 estados"
      />

      <Feature
        icon={HelpSvg}
        text="<strong>El servicio de atención</strong> al cliente siempre está listo para ayudarlo y responder a sus preguntas."
        alt="El servicio de atención"
      />

      <Feature
        icon={SaveSvg}
        text="<strong>Tarifas especiales</strong> - precios bajos por compra en volumen de vehículos"
        alt="Tarifas especiales"
      />
    </div>
  );
}

export default Features;
