function throttle(callback, ms) {
  let lastCall;

  // eslint-disable-next-line func-names
  return function (...args) {
    if (!lastCall || performance.now() - lastCall > ms) {
      callback.apply(this, args);
      lastCall = performance.now();
    }
  };
}

export default throttle;
