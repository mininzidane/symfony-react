import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import CompanyService from 'frontend/js/api/CompanyService';
import useStyles from './useStyles';

function ContactCard() {
  const classes = useStyles();
  const { phone: phoneUA } = CompanyService.UA;

  return (
    <section className={classes.root}>
      <div className={classes.title}>
        Вы можете связаться с нами по тeл. <a href={phoneUA.href}>{phoneUA.formatted}</a> с 10:00 до 19:00 по киевскому
        времени
      </div>
      <a href={RouterService.getRoute('contactUs')} className={classes.link}>
        Контакты
      </a>
    </section>
  );
}

export default ContactCard;
