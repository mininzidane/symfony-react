import Cookies from 'js-cookie';
import BaseApiService from '../BaseApiService';
import SessionStorageService from '../../lib/utils/SessionStorageService';
import LocalStorageService from '../../lib/utils/LocalStorageService';

class EventTrackingService extends BaseApiService {
  constructor() {
    super();

    if (EventTrackingService.instance) {
      return EventTrackingService.instance;
    }

    EventTrackingService.instance = this;

    this.sessionStoragePagesCountField = 'ABM_visited_pages_count';

    this.client_id = Cookies.get('gc_client_id');
    this.visit_id = Cookies.get('gc_visit_id');
    this.hour_id = Cookies.get('gc_hour_id');
    this.session_id = Cookies.get('gc_session_id');

    this.init();
  }

  async sendEvent(payload) {
    await this.createVisit();

    if (this.client_id === 'f' || !this.client_id || !this.visit_id) {
      return Promise.resolve();
    }

    const defaultPayload = {
      client_id: this.client_id,
      visit_id: this.visit_id,
      product_id: 3,
      substep: payload.name,
      payload: window.location.pathname,
      custom1: this.getTimePassed(),
      custom2: this.getVisitedPagesCount(),
    };
    const finalPayload = { ...defaultPayload, ...payload };

    return this.post(this.buildStatsRequestPath(`event/v1/track`), finalPayload).then(({ data }) => data);
  }

  setVisitedPagesCount() {
    const storageCount = SessionStorageService.get(this.sessionStoragePagesCountField);
    const nextCount = storageCount ? parseInt(storageCount, 10) + 1 : 1;

    SessionStorageService.set(this.sessionStoragePagesCountField, nextCount);
  }

  getVisitedPagesCount() {
    return `${SessionStorageService.get(this.sessionStoragePagesCountField)}`;
  }

  getTimePassed() {
    const diff = Date.now() - (this.pageVisitEventSendTime || Date.now());
    return String(Math.round(diff / 1000));
  }

  // Events Methods:
  pageVisit() {
    this.sendEvent({
      name: 'page_visit',
      step: 'abm_general',
      custom1: document.referrer || '',
    }).then(() => {
      this.pageVisitEventSendTime = Date.now();
    });
  }

  scrollEvents() {
    const isScrollEventSent = {};

    const handler = () => {
      const html = document.documentElement;
      const { body } = document;
      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const viewedDistance = (html.scrollTop || body.scrollTop) + Math.max(html.clientHeight, window.innerHeight || 0);

      if (viewedDistance > documentHeight * 0.25 && !isScrollEventSent['25%']) {
        this.sendEvent({
          name: 'page_scroll_25',
          step: 'abm_general',
        });
        isScrollEventSent['25%'] = true;
      }
      if (viewedDistance > documentHeight * 0.5 && !isScrollEventSent['50%']) {
        this.sendEvent({
          name: 'page_scroll_50',
          step: 'abm_general',
        });
        isScrollEventSent['50%'] = true;
      }
      if (viewedDistance > documentHeight * 0.9 && !isScrollEventSent['90%']) {
        this.sendEvent({
          name: 'page_scroll_90',
          step: 'abm_general',
        });
        isScrollEventSent['90%'] = true;
      }

      if (isScrollEventSent['25%'] && isScrollEventSent['50%'] && isScrollEventSent['90%']) {
        window.removeEventListener('scroll', handler);
      }
    };

    handler();
    window.addEventListener('scroll', handler);
  }

  screenResolution() {
    const ID = 'ABM_is_screen_resolution_sent';

    const doc = document.documentElement;
    const viewportWidth = Math.max(doc.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(doc.clientHeight, window.innerHeight || 0);

    if (LocalStorageService.get(ID)) {
      return;
    }

    LocalStorageService.set(ID, 1);
    this.sendEvent({
      name: 'screen_resolution',
      step: 'abm_general',
      custom1: `${window.screen.width}x${window.screen.height}`,
      custom2: `${viewportWidth}x${viewportHeight}`,
    });
  }

  prolongHourIdCookie() {
    setInterval(() => {
      const expires = new Date(Date.now() + 60000);
      Cookies.set('gc_hour_id', this.hour_id, { expires, path: '/' });
    }, 55000);
  }

  trackClickEvents() {
    let firstClick = true;

    document.addEventListener('click', (event) => {
      const el = event.target.closest('.js-track-event');

      if (!el) {
        return;
      }

      const { step, substep, custom3 } = el.dataset;

      this.sendEvent({
        name: substep,
        step,
        custom3,
      });

      if (firstClick) {
        this.sendEvent({
          name: 'page_first_click',
          step: 'abm_general',
        }).then(() => {
          firstClick = false;
        });
      }
    });
  }

  trackAdsClicks() {
    let mouseIsOverAd = false;

    Array.prototype.forEach.call(document.querySelectorAll('.ga-banner'), (banner) => {
      banner.onmouseenter = () => {
        mouseIsOverAd = true;
      };

      banner.onmouseleave = () => {
        mouseIsOverAd = false;
      };
    });

    window.addEventListener('blur', () => {
      if (mouseIsOverAd) {
        mouseIsOverAd = false;
        this.sendEvent({
          name: 'click_on_ads',
          step: 'abm_advertising',
        });
      }
    });
  }

  organicTest() {
    if (window.organicTest && window.organicResult) {
      this.sendEvent({
        name: 'test_option',
        step: 'test_mechanism',
        payload: window.organicTest,
        custom1: window.organicResult,
      });
    }
  }

  shippingPromotionShown() {
    this.sendEvent({
      name: 'hb_notif_shown',
      step: 'abm_shipping',
    });
  }

  shippingPromotionButtonClick() {
    this.sendEvent({
      name: 'hb_notif_clicked',
      step: 'abm_shipping',
    });
  }

  shippingPromotionClosed() {
    this.sendEvent({
      name: 'hb_notif_closed',
      step: 'abm_shipping',
    });
  }

  createVisit() {
    if (this.client_id && this.visit_id && this.hour_id && this.session_id) {
      return Promise.resolve();
    }

    if (!window.createVisitPromise) {
      window.createVisitPromise = this.makeCreateVisitRequest()
        .then(() => {
          this.client_id = Cookies.get('gc_client_id');
          this.visit_id = Cookies.get('gc_visit_id');
          this.hour_id = Cookies.get('gc_hour_id');
          this.session_id = Cookies.get('gc_session_id');
        })
        .catch(() => {});
    }

    return window.createVisitPromise;
  }

  makeCreateVisitRequest(attempt = 0) {
    return new Promise((resolve, reject) => {
      this.get(this.buildRequestPath(`visit?uri=${window.location.href}`, true))
        .then(resolve)
        .catch(() => {
          if (attempt < 5) {
            setTimeout(() => {
              this.makeCreateVisitRequest(attempt + 1).then(resolve, reject);
            }, 2500);
          } else {
            reject();
          }
        });
    });
  }

  init() {
    document.addEventListener('DOMContentLoaded', async () => {
      await this.createVisit();

      if (this.client_id === 'f' || !this.client_id || !this.visit_id) {
        return;
      }

      this.scrollEvents();
      this.screenResolution();
      this.prolongHourIdCookie();
      this.trackClickEvents();
      this.trackAdsClicks();
      this.organicTest();
    });
  }
}

export default EventTrackingService;
