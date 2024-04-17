import Cookies from 'js-cookie';

const OAuthCookieService = {
  SOURCE: {
    UA: 'ua',
    NG: 'ng',
    GE: 'ge',
    BY: 'by',
    COPART_LATAM: 'copart_latam',
  },

  set(source) {
    if (!source) {
      return;
    }

    const expires = new Date(Date.now() + 30 * 60 * 1000);
    Cookies.set('oauth_source', source, { expires, path: '/' });
  },
};

export default OAuthCookieService;
