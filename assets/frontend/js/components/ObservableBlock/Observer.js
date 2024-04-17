const callbacks = new WeakMap();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const clb = callbacks.get(entry.target);

    if (clb) {
      clb(entry.isIntersecting);
    }
  });
});

function observe(el, callback) {
  callbacks.set(el, callback);
  observer.observe(el);
}

function unobserve(el) {
  callbacks.delete(el);
  observer.unobserve(el);
}

export default { observe, unobserve };
