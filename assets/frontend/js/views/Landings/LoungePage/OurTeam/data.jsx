import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RMenendezPng from './img/SV/r-menendez.png';
import AUmanaPng from './img/SV/a-umana.png';
import DZelayaPng from './img/SV/d-zelaya.png';
import FOrellanaPng from './img/SV/f-orellana.png';
import DBabiluaPng from './img/GE/d-babilua.png';
import PGulordavaPng from './img/GE/p-gulordava.png';
import TVashagashviliPng from './img/GE/t-vashagashvili.png';
import DGaruchavaPng from './img/GE/d-garuchava.png';
import YAdeboyeJpg from './img/NG/y-adeboye.jpg';
import IYarmolnikPng from './img/BY/i-yarmolnik.png';
import IHaspadarykPng from './img/BY/i-haspadaryk.png';
import VadzimMihunPng from './img/BY/vadzim-mihun.png';
import KonradRJpg from './img/PL/konrad-r.jpg';

export default {
  SV: [
    {
      icon: RMenendezPng,
      name: 'Rodrigo Menendez',
      position: 'Regional Manager',
      phone: '+503 6434-6885',
      socials: {
        whatsapp: '50364346885',
      },
      hours: <FormattedMessage id="loungePage.ourPage.SV.time1" />,
    },
    {
      icon: DZelayaPng,
      name: 'Daniel Zelaya',
      position: 'Sales Agent Sr.',
      phone: '+503 7209-9896',
      socials: {
        whatsapp: '50372099896',
      },
      hours: <FormattedMessage id="loungePage.ourPage.SV.time2" />,
    },
    {
      icon: AUmanaPng,
      name: 'Alejandro Umaña',
      position: 'Sales Agent',
      phone: '+503 6435-4000',
      socials: {
        whatsapp: '50364354000',
      },
      hours: <FormattedMessage id="loungePage.ourPage.SV.time1" />,
    },
    {
      icon: FOrellanaPng,
      name: 'Fernando Orellana',
      position: 'Sales Agent',
      phone: '+503 6435-2957',
      socials: {
        whatsapp: '50364352957',
      },
      hours: <FormattedMessage id="loungePage.ourPage.SV.time2" />,
    },
  ],
  GE: [
    {
      icon: PGulordavaPng,
      name: 'Peter Gulordava',
      position: 'Regional Manager',
      phone: '+995 59-999-2733',
      socials: {
        whatsapp: '995599992733',
        viber: '995599992733',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GE.time1" />,
    },
    {
      icon: TVashagashviliPng,
      name: 'Tamta Vashagashvili ',
      position: 'Sales Agent',
      phone: '+995 59-526-2515',
      socials: {
        whatsapp: '995595262515',
        viber: '995595262515',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GE.time1" />,
    },
    {
      icon: DGaruchavaPng,
      name: 'David Garuchava',
      position: 'Support Agent',
      phone: '+995 55-728-1838',
      socials: {
        whatsapp: '995557281838',
        viber: '995557281838',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GE.time2" />,
    },
    {
      icon: DBabiluaPng,
      name: 'Davit Babilua',
      position: 'Sales Agent',
      phone: '+995 57-115-7215',
      socials: {
        whatsapp: '995571157215',
        viber: '995571157215',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GE.time2" />,
    },
  ],
  NG: [
    {
      icon: YAdeboyeJpg,
      name: 'Yinka Adeboye',
      position: 'Sales Manager',
      phone: '+234 904-022-0222',
      socials: {
        whatsapp: '2349040220222',
      },
      hours: <FormattedMessage id="loungePage.ourPage.BY.time" />,
    },
  ],
  BY: [
    {
      icon: IYarmolnikPng,
      name: 'Илья Ярмолик',
      position: 'Специалист по работе с клиентами',
      phone: '+375 29 185-7070',
      socials: {
        telegram: 'ilyaAutobidmaster',
        whatsapp: '375291857070',
        viber: '375291857070',
      },
      hours: <FormattedMessage id="loungePage.ourPage.BY.time" />,
    },
    {
      icon: IHaspadarykPng,
      name: 'Иван Господарик',
      position: 'Специалист по работе с клиентами',
      phone: '+375 44 752-4056',
      socials: {
        telegram: 'AutobidmasterBelarus',
        viber: '375447524056',
      },
      hours: <FormattedMessage id="loungePage.ourPage.BY.time" />,
    },
    {
      icon: VadzimMihunPng,
      name: 'Вадим Мигун',
      position: 'Специалист по работе с клиентами',
      phone: '+375 44 752-4061',
      socials: {
        telegram: 'AutobidmasterBelarus',
        viber: '375291857070',
        whatsapp: '375291857070',
      },
      hours: <FormattedMessage id="loungePage.ourPage.BY.time" />,
    },
  ],
  GT: [
    {
      icon: null,
      name: 'Roberto',
      position: 'Sales Agent',
      phone: '+502 5826-5373',
      socials: {
        whatsapp: '50258265373',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GT.time" />,
    },
    {
      icon: null,
      name: 'Jose',
      position: 'Sales Agent',
      phone: '+502 6670-1350',
      socials: {
        whatsapp: '50266701350',
      },
      hours: <FormattedMessage id="loungePage.ourPage.GT.time" />,
    },
  ],
  PL: [
    {
      icon: KonradRJpg,
      name: 'Konrad Rudzinski',
      position: 'Business Development Manager',
      phone: '+48 608 340 859',
      socials: {
        whatsapp: '48608340859',
      },
      hours: <FormattedMessage id="loungePage.ourPage.PL.time" />,
    },
  ],
};
