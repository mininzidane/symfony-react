const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { target } = entry;
      if (target && !target.src && !target.srcset) {
        if (target.dataset.src) {
          target.src = target.dataset.src;
        }

        if (target.dataset.srcset) {
          target.srcset = target.dataset.srcset;
        }

        self.unobserve(target);
      }
    }
  });
});

export default observer;
