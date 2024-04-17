import React from 'react';
import Container from 'frontend/js/components/Container';
import CompanyService from 'frontend/js/api/CompanyService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useStyles from './useStyles';
import heroBg2xJpg from './img/hero-bg@2x.jpg';
import heroBgJpg from './img/hero-bg.jpg';
import heroBgMobile2xJpg from './img/hero-bg-mobile@2x.jpg';
import heroBgMobileJpg from './img/hero-bg-mobile.jpg';

function Hero() {
  const classes = useStyles();
  const { phone: phoneUA } = CompanyService.UA;

  return (
    <ContainerFullScreen
      background={{
        xl_x1: heroBgJpg,
        xl_x2: heroBg2xJpg,
        sm_x1: heroBgMobileJpg,
        sm_x2: heroBgMobile2xJpg,
      }}
      className={classes.root}
    >
      <div className={classes.ukraineFlag} />
      <Container className={classes.container} mobilePadding={14}>
        <h1>Как купить авто из США без посредников?</h1>
        <h2>
          AutoBidMaster является официальным представителем Copart в Украине. Выбирайте и заказывайте авто из США с
          AutoBidMaster и экономьте до 50% на покупке автомобиля! Мы поможем вам с покупкой, оформлением документов и
          транспортировкой авто.
        </h2>
        <div>
          {' '}
          Звоните <a href={phoneUA.href}>{phoneUA.formatted}</a> с 10:00 до 19:00 по киевскому времени.
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
