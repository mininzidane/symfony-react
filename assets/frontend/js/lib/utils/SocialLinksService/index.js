const stripPhone = (phone = '') => String(phone).replace(/[^0-9]/g, '');

const SocialLinksService = {
  telegram(username) {
    return `https://t.me/${username}`;
  },

  whatsapp(phone) {
    return `https://wa.me/${stripPhone(phone)}`;
  },

  viber(phone) {
    return `viber://chat/?number=%2B${stripPhone(phone)}`;
  },
};

export default SocialLinksService;
