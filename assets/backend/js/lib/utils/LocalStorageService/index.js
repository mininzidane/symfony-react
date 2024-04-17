class LocalStorageService {
  constructor() {
    this.isAvailable = false;

    this.init();
  }

  init() {
    try {
      this.localStorage = window.localStorage;
    } catch (e) {
      // ignore
    }

    this.testLocalStorageAvailability();
  }

  testLocalStorageAvailability() {
    try {
      this.localStorage.setItem('test', 'test');
      this.localStorage.removeItem('test');
      this.isAvailable = true;
    } catch (error) {
      // ignore
    }
  }

  set(key, value) {
    if (!this.isAvailable || !key || !value) {
      return;
    }

    if (typeof value === 'object') {
      this.localStorage.setItem(key, JSON.stringify(value));
    } else {
      this.localStorage.setItem(key, value);
    }
  }

  get(key) {
    if (!this.isAvailable) {
      return undefined;
    }

    const value = this.localStorage.getItem(key);

    if (!value) {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  delete(key) {
    if (!this.isAvailable) {
      return;
    }

    this.localStorage.removeItem(key);
  }
}

export default new LocalStorageService();
