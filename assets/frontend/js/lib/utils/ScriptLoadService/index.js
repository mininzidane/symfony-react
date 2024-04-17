class ScriptLoadService {
  constructor() {
    if (ScriptLoadService.instance) {
      return ScriptLoadService.instance;
    }

    ScriptLoadService.instance = this;
    this.scripts = {};
  }

  add({ url, callback }) {
    if (!this.scripts[url]) {
      this.append({ url, callback });
      return;
    }

    if (this.scripts[url].isLoaded) {
      callback();
      return;
    }

    this.scripts[url].callbacks.push(callback);
  }

  append({ url, callback }) {
    const $script = document.createElement('script');
    $script.src = url;
    $script.async = true;
    $script.onload = () => this.onLoad({ url });

    document.body.appendChild($script);

    this.scripts[url] = {
      $script,
      isLoaded: false,
      callbacks: [callback],
    };
  }

  onLoad({ url }) {
    const script = this.scripts[url];

    if (!script) {
      return;
    }

    script.isLoaded = true;
    script.callbacks.forEach((callback) => callback());
    script.callbacks = [];
  }

  remove({ url, callback }) {
    const script = this.scripts[url];

    if (!script) {
      return;
    }

    script.callbacks = script.callbacks.filter((v) => v !== callback);

    if (script.callbacks.length === 0) {
      delete this.scripts[url];

      if (script.$script.parentNode === document.body) {
        document.body.removeChild(script.$script);
      }
    }
  }
}

export default new ScriptLoadService();
