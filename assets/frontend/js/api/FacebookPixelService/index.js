class FacebookPixelService {
  constructor() {
    if (typeof window.fbq !== 'undefined') {
      this.fbq = window.fbq;
    }
  }

  track(eventName, params) {
    if (this.fbq) {
      this.fbq('track', eventName, params);
    }
  }
}
export default FacebookPixelService;
