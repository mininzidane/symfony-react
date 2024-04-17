const PromiseService = {
  cancelable(func) {
    let resolve;
    let reject;

    const promise = new Promise((...args) => {
      [resolve, reject] = args;

      func.then(resolve, reject);
    });

    function cancel() {
      reject(new Error('Canceled'));
    }

    return {
      promise,
      cancel,
    };
  },
};

export default PromiseService;
