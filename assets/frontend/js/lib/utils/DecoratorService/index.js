/* eslint-disable no-multi-assign */
const DecoratorService = {
  throttle: (func, ms) => {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper(...args) {
      if (isThrottled) {
        // (2)
        savedArgs = args;
        savedThis = this;
        return;
      }

      func.apply(this, args); // (1)

      isThrottled = true;

      setTimeout(() => {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = null;
          savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  },
};

export default DecoratorService;
