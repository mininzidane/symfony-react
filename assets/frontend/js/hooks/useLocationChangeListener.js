import useEventListener from 'frontend/js/hooks/useEventListener';

const EVENT_NAME = 'locationchange';

const { history } = window;
const oldPushState = history.pushState;
history.pushState = function pushState() {
  // eslint-disable-next-line prefer-rest-params
  oldPushState.apply(this, arguments);
  window.dispatchEvent(new Event(EVENT_NAME));
};

const oldReplaceState = history.replaceState;
history.replaceState = function replaceState() {
  // eslint-disable-next-line prefer-rest-params
  oldReplaceState.apply(this, arguments);
  window.dispatchEvent(new Event(EVENT_NAME));
};

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event(EVENT_NAME));
});

function useLocationChangeListener(listener) {
  useEventListener(EVENT_NAME, listener);
}

export default useLocationChangeListener;
