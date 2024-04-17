import { pathToRegexp, match } from 'path-to-regexp';
import SPA_CONFIG from './config';

const SPA_PATHS = [];

Object.values(SPA_CONFIG).forEach((config) => {
  const { path } = config;
  const isExact = Boolean(config.exact);

  const addSpaPath = (str, exact) => {
    const rPath = pathToRegexp(str, [], {
      end: Boolean(exact),
    });

    SPA_PATHS.push({ rPath, path: str, config });
  };

  if (!path) {
    return;
  }

  if (Array.isArray(path)) {
    path.forEach((item) => addSpaPath(item, isExact));
    return;
  }

  addSpaPath(path, isExact);
});

export function isSPAPath(path) {
  return SPA_PATHS.some(({ rPath }) => rPath.test(path));
}

export function matchPath(path = window.location.pathname) {
  const matched = SPA_PATHS.find(({ rPath }) => rPath.test(path));

  if (!matched) {
    return null;
  }

  const fn = match(matched.path);

  return {
    path,
    params: fn(path).params,
    config: matched.config,
  };
}

export function isOnPage(pages = []) {
  if (!Array.isArray(pages)) {
    // eslint-disable-next-line no-param-reassign
    pages = [pages];
  }

  const path = window.location.pathname;
  const matched = SPA_PATHS.find(({ rPath }) => rPath.test(path));

  if (!matched) {
    return false;
  }

  return pages.includes(matched.config);
}
