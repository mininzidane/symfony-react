import SocialLinksService from '../../lib/utils/SocialLinksService';
import t from '../TranslatorService';

const CompanyService = {
  companyName: 'AutoBidMaster',
  companyNameLegal: 'AutoBidMaster, LLC',
  officeLat: 45.5722212,
  officeLng: -122.5817157,
  officePhone: {
    raw: '+15032984300',
    formatted: '+1 (503) 298-4300',
    href: 'tel:+15032984300',
  },
  officePhoneText: {
    raw: '+15038979799',
    formatted: '+1 (503) 897-9799',
    href: 'tel:+15038979799',
  },
  officeHours: {
    value: 'Mo,Tu,We,Th,Fr 06:00-18:00',
    label: t('footer.opening_hours'),
  },
  auctionLocationPhone: {
    raw: '+19713989263',
  },
  address: {
    companyName: 'AutoBidMaster',
    street: '6807 NE 79th Ct Ste B',
    city: 'Portland',
    state: 'OR',
    zip: '97218',
    country: 'USA',
  },
  email: {
    raw: 'Hello@AutoBidMaster.com',
    href: 'mailto:hello@autobidmaster.com',
  },
  emailIntl: {
    raw: 'export@autobidmaster.com',
    href: 'mailto:export@autobidmaster.com',
  },
  socials: {
    facebook: 'https://www.facebook.com/AutoBidMaster',
    instagram: 'https://www.instagram.com/autobidmaster_/',
    twitter: 'https://twitter.com/autobidmaster',
    youtube: 'https://www.youtube.com/channel/UCB9qUA4Cv1bCjem0xpP5kIA',
    blog: 'http://www.autobidmaster.com/blog/',
  },
  messenger: {
    viber: { formatted: '+1 (503) 473 9895', href: SocialLinksService.viber(15034739895) },
    whatsapp: { formatted: '+1 (503) 473 9895', href: SocialLinksService.whatsapp(15034739895) },
  },
  LoungeCountries: ['UA', 'RU', 'NG', 'BY', 'ES'],
  RU: {
    phone: {
      raw: '+78124093504',
      formatted: '+7 (812) 409-3504',
      href: 'tel:+78124093504',
    },
    email: {
      raw: 'russia@autobidmaster.com',
      href: 'mailto:russia@autobidmaster.com',
    },
    officeHours: {
      value: 'Mo,Tu,We,Th,Fr 10:00-19:00',
      label: 'Monday - Friday, 10:00 - 19:00 St Petersburg Time',
    },
  },
  NG: {
    phone: {
      raw: '+2349040220222',
      formatted: '+234 (904) 022-0222',
      href: 'tel:+2349040220222',
    },
    email: {
      raw: 'nigeria@autobidmaster.com',
      href: 'mailto:nigeria@autobidmaster.com',
    },
    officeHours: {
      value: 'Mo,Tu,We,Th,Fr 10:00-19:00',
      label: 'Monday - Friday, 10:00 - 19:00 Lagos Time',
    },
  },
  UA: {
    phone: {
      raw: '+19713089263',
      formatted: '+1 (971) 308-9263',
      href: 'tel:+19713089263',
    },
    email: {
      raw: 'ukraine@autobidmaster.com',
      href: 'mailto:ukraine@autobidmaster.com',
    },
    messenger: {
      telegram: { href: SocialLinksService.telegram('autobidmaster_ua') },
      viber: { href: SocialLinksService.viber(19713089263) },
      whatsapp: { href: SocialLinksService.whatsapp(19713089263) },
    },
    officeHours: {
      value: 'Mo,Tu,We,Th,Fr 06:00-18:00',
      label: 'Понедельник-Пятница 16:00 - 05:00 (по киевскому времени)',
    },
    address: {
      companyName: 'AutoBidMaster',
      street: 'пл. Победы 10',
      city: 'Житомир',
      zip: '10003',
      country: 'Украина',
    },
  },
  BY: {
    phone: {
      raw: '+375291857070',
      formatted: '+375 (29) 185-7070',
      href: 'tel:+375291857070',
    },
    email: {
      raw: 'belarus@autobidmaster.com',
      href: 'mailto:belarus@autobidmaster.com',
    },
    messenger: {
      viber: { href: SocialLinksService.viber(375291857070) },
      whatsapp: { href: SocialLinksService.whatsapp(375291857070) },
    },
    officeHours: {
      value: 'Mo,Tu,We,Th,Fr 10:00-19:00',
      label: 'Понедельник-Пятница 10:00 - 19:00 (по минскому времени)',
    },
    address: {
      companyName: 'AutoBidMaster',
      street: 'ул. Зыбицкая 6',
      city: 'Минск',
      zip: '220030',
      country: 'Беларусь',
    },
  },
  SV: {
    phone: {
      raw: '+50372099896',
      formatted: '+503 7209-9896',
      href: 'tel:+50372099896',
    },
    email: {
      raw: 'elsalvador@autobidmaster.com',
      href: 'mailto:elsalvador@autobidmaster.com',
    },
    messenger: {
      viber: { href: SocialLinksService.viber(19713778118) },
      whatsapp: { href: SocialLinksService.whatsapp(19713778118) },
    },
    officeHours: {
      value: 'Mo,Tu,We,Th,Fr 08:00-17:00',
      label: 'Horario de atención de lunes a viernes de 8:00 a.m. a 5:00 p.m.',
    },
    address: {
      companyName: 'AutoBidMaster',
      street: 'Septima Calle Poniente y Avenida Masferrer denominado Plaza Masferrer local numero #18',
      city: 'Colonia Escalon, San Salvador',
      zip: '',
      country: 'El Salvad',
    },
  },
  sycPhone: {
    raw: '+1971-260-4367',
    formatted: '+1 (971) 260-4367',
    href: 'tel:+19712604367',
  },
};

export default CompanyService;
