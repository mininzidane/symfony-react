let instance = null;

class GoogleMapsService {
  constructor() {
    if (!instance) {
      instance = this;
      instance.googleMapsEvents = {};
      instance.googleMapsLoading = false;
    }
    instance.init();
    return instance;
  }

  init() {
    if (!window.google?.maps && !this.googleMapsLoading) {
      window.googleMapsCallback = () => {
        this.dispatchEvent('load');
      };

      this.googleMapsLoading = true;
      this.addEventListener('load', () => {
        this.googleMapsLoading = false;
      });

      if (document.readyState === 'complete') {
        GoogleMapsService.loadScript();
      } else {
        window.addEventListener('load', () => {
          GoogleMapsService.loadScript();
        });
      }
    }
  }

  addEventListener(event, fn) {
    if (!this.googleMapsEvents[event]) {
      this.googleMapsEvents[event] = [];
    }
    this.googleMapsEvents[event].push(fn);
  }

  dispatchEvent(event) {
    if (this.googleMapsEvents[event]) {
      this.googleMapsEvents[event].forEach((cb) => {
        try {
          cb();
        } catch (e) {
          // Ignore
        }
      });
    }
  }

  async ready() {
    await this.init();
    return new Promise((resolve, reject) => {
      if (window.google?.maps) {
        resolve(window.google?.maps);
      } else {
        this.addEventListener('load', () => {
          resolve(window.google?.maps);
        });
        setTimeout(() => {
          reject(new Error('Google Maps load timeout'));
        }, 10000);
      }
    });
  }

  static loadScript() {
    const { ABM_GOOGLE_MAPS_API_KEY } = window;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ABM_GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsCallback`;
    script.async = true;
    document.body.appendChild(script);
  }
}

export default GoogleMapsService;
