import DecoratorService from 'frontend/js/lib/utils/DecoratorService';

let instance = null;

function GoogleAnalyticsService() {
  if (instance) {
    return instance;
  }

  let initialized = false;
  const self = this;

  self.gtag = undefined;
  self.analyticsId = undefined;
  self.analyticsMouseoverThreshold = 1000;
  self.analyticsMouseoverTimeout = null;

  self.init = () => {
    if (typeof window.gtag !== 'undefined') {
      self.gtag = window.gtag;
    }

    if (typeof window.googleAnalyticsId !== 'undefined') {
      self.analyticsId = window.googleAnalyticsId;
    }

    if (self.gtag && self.analyticsId) {
      initialized = true;

      self.trackClickEvents();
      self.trackHoverEvents();
    }

    return self;
  };

  self.trackClickEvents = () => {
    document.addEventListener('click', (event) => {
      const el = event.target?.closest('.ga-event-tracking');

      if (!el) {
        return;
      }

      const { gaEventName, gaEventCategory, gaEventLabel, gaEventValue } = el.dataset;

      self.sendEvent(gaEventName, gaEventCategory, gaEventLabel, gaEventValue);
    });
  };

  self.trackHoverEvents = () => {
    let timeout;

    document.onmouseover = DecoratorService.throttle((event) => {
      const el = event.target?.closest('.ga-mouseover-event-tracking');

      if (!el) {
        return;
      }

      timeout = setTimeout(() => {
        const { gaEventName, gaEventCategory, gaEventLabel, gaEventValue } = el.dataset;

        self.sendEvent(gaEventName, gaEventCategory, gaEventLabel, gaEventValue);
      }, 500);
    }, 500);

    document.onmouseout = () => {
      clearTimeout(timeout);
    };
  };

  self.setVar = (varName, varValue) => {
    if (!(initialized && varName != null && varValue != null)) {
      return;
    }

    self.gtag('set', varName, varValue);
  };

  self.sendPageView = (locationOverride) => {
    if (!initialized) {
      return;
    }

    const windowLocation = locationOverride || window.location.href;

    self.gtag('event', 'page_view', {
      send_to: self.analyticsId,
      page_location: windowLocation,
    });
  };

  self.sendEvent = (eventName, eventCategory, eventLabel, eventValue) => {
    if (!(initialized && eventName && eventCategory && eventLabel)) {
      return;
    }

    const params = {
      send_to: self.analyticsId,
      event_category: eventCategory,
      event_label: eventLabel,
    };

    if (eventValue) {
      params.value = eventValue;
    }

    self.gtag('event', eventName, params);
  };

  instance = self.init();
  return instance;
}

export default GoogleAnalyticsService;
