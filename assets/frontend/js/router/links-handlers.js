import { isSPAPath, matchPath } from './utils';
import browserHistory from './browser-history';
import routes from './routes';

// handle SPA links click
window.addEventListener('click', (event) => {
  if (event.defaultPrevented) {
    return;
  }

  const parentLink = event.target.closest('a');

  if (!parentLink) {
    return;
  }

  const { pathname, target } = parentLink;

  if (!pathname || target || !isSPAPath(pathname)) {
    return;
  }

  event.preventDefault();

  browserHistory.push(`${parentLink.pathname}${parentLink.search}${parentLink.hash}`);
});

// preload page and prefetch data on link mousedown
window.addEventListener(
  'mousedown',
  (event) => {
    const t = /touch/.test(event.type) ? event.targetTouches[0] : event.target;
    const parentLink = t?.closest('a');

    if (!parentLink) {
      return;
    }

    const { pathname, target } = parentLink;

    if (!pathname || target) {
      return;
    }

    const matched = matchPath(pathname);

    if (!matched) {
      return;
    }

    const route = routes.find((v) => v.path === matched.config.path);
    if (route?.content?.preload) {
      route.content
        .preload()
        .then((component) => component?.prefetch?.(matched.params))
        .catch(() => {});
    }
  },
  { passive: true },
);
