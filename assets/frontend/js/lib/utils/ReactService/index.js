/* eslint-disable no-underscore-dangle */
import React from 'react';

const ReactService = {
  lazyWithPreload: (factory) => {
    let preloaded;
    const LazyComponent = React.lazy(factory);

    LazyComponent.preload = () => {
      if (preloaded) {
        return Promise.resolve(preloaded);
      }

      return factory().then((module) => {
        preloaded = module.default;

        LazyComponent._status = 1;
        LazyComponent._result = preloaded;

        return preloaded;
      });
    };

    LazyComponent.silentPreload = () => {
      LazyComponent.preload().catch(() => {});
    };

    return LazyComponent;
  },
};

export default ReactService;
