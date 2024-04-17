import React from 'react';
import PropTypes from 'prop-types';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Benefit from 'frontend/js/views/Shared/Benefit';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useStyles from './useStyles';

function Benefits({ isBusiness }) {
  const classes = useStyles();
  return (
    <ContainerFullScreen className={classes.root} background={{ color: '#F1F1F8' }}>
      <Container className={classes.container}>
        <SectionTitle text="Beneficios al elegir AutoBidMaster" />

        <div className={classes.grid}>
          <Benefit
            title="Representante Oficial"
            subtitle="AutoBidMaster es la única plataforma oficial de subastas en línea autorizada por Copart"
            type="copart"
          />
          <Benefit
            title="Subasta en Vivo"
            subtitle="Obtenga acceso a las subastas en vivo a través de nuestra plataforma de www.autobidmaster.com"
            type="liveAuction"
          />
          <Benefit
            title="Los mejores Precios"
            subtitle={
              isBusiness
                ? 'Las tarifas mas bajas del mercado a solo USD $175 por vehículo'
                : 'La comisión mas baja del mercado a solo USD $299.00 Contamos con la mejor asesoría del mercado'
            }
            type="services"
          />
          <Benefit
            title="Las mejores tarifas de transporte"
            subtitle="Contamos con las tarifas de envio mas baratas del mercado, cotiza con tu agente ya"
            type="shipping"
          />
          <Benefit
            title="Atención al cliente"
            subtitle="Nuestros expertos brindaran asesoría sobra compra y envio de vehiculo"
            type="support"
          />
          <Benefit
            title="Licencia de Dealer"
            subtitle="Compra en los estados exclusivos de mayorista como Alabama, Michigan y Wisconsin"
            type="insurance"
          />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

Benefits.propTypes = {
  isBusiness: PropTypes.bool.isRequired,
};

export default Benefits;
