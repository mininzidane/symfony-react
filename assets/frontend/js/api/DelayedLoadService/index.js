const ACTIONS = {
  INTERACTION: '1',
  MAIN_CONTENT_LOADED: '2',
};

let callbacks = [];
let waiting = [ACTIONS.INTERACTION, ACTIONS.MAIN_CONTENT_LOADED];

function areCompeted(actions) {
  if (!actions || !actions.length) {
    return !waiting.length;
  }

  return actions.every((action) => !waiting.includes(action));
}

function onPermissionGranted(clb, actions) {
  if (areCompeted(actions)) {
    clb();
  } else {
    callbacks.push({ func: clb, actions });
  }
}

function offPermissionGranted(clb) {
  callbacks = callbacks.filter((v) => v.func !== clb);
}

function done(action) {
  waiting = waiting.filter((v) => v !== action);

  callbacks.forEach(({ func, actions }) => {
    if (areCompeted(actions)) {
      func();
      offPermissionGranted(func);
    }
  });
}

// Interaction listener
function onInteraction() {
  done(ACTIONS.INTERACTION);
}

document.addEventListener('scroll', onInteraction, { once: true, passive: true });
document.addEventListener('mousemove', onInteraction, { once: true, passive: true });
document.addEventListener('touchstart', onInteraction, { once: true, passive: true });
// Interaction subscription

export default { ACTIONS, done, onPermissionGranted, offPermissionGranted };
