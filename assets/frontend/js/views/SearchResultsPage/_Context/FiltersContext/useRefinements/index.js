import { useReducer } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';

import getInitialStateFromURL from './getInitialStateFromURL';

// const CHECKBOX = {
//   section: "featured",
//   value: "buy_now",
// };
//
// const RADIO = {
//   section: "p_distance",
//   label: "DG - sdgs g",
//   value: "nj-1",
// };
//
// const MULTIVALUE = {
//   section: "distance",
//   label: "SGGJSG  sdklgj sdgjl",
//   values: {
//     UOrigin: "coords",
//     distance: 1,
//   },
// };

const INITIAL_STATE = { refinements: [] };

const stringify = (refinement) => {
  const data = { ...refinement };
  delete data.label;
  delete data.meta;
  return JSON.stringify(data);
};

function refine(state, refinement) {
  const { type, section } = refinement;

  const hash = refinement.hash || stringify(refinement);

  switch (type) {
    case 'CHECKBOX': {
      if (state.refinements.find((v) => v.hash === hash)) {
        return { refinements: state.refinements.filter((v) => v.hash !== hash) };
      }
      return { refinements: [...state.refinements, { ...refinement, hash }] };
    }
    case 'RADIO': {
      const refinements = state.refinements.filter((v) => v.section !== section);
      return { refinements: [...refinements, { ...refinement, hash }] };
    }
    case 'SWITCH': {
      const refinements = state.refinements.filter((v) => v.section !== section);
      if (refinement.value) {
        return { refinements: [...refinements, { ...refinement, hash }] };
      }
      return { refinements };
    }
    case 'MULTIVALUE': {
      const refinements = state.refinements.filter((v) => v.section !== section);
      return { refinements: [...refinements, { ...refinement, hash }] };
    }
    default: {
      return state;
    }
  }
}

function remove(state, hash) {
  return { refinements: state.refinements.filter((v) => v.hash !== hash) };
}

function reset(state, section) {
  return { refinements: state.refinements.filter((v) => v.section !== section) };
}

function init() {
  const state = getInitialStateFromURL();
  const refinements = state.map((v) => {
    v.hash = stringify(v);

    return v;
  });
  return { refinements };
}

// eslint-disable-next-line consistent-return
function reducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'REFINE':
      return refine(state, action.payload);
    case 'FILL':
      return refine(state, action.payload);
    case 'RESET':
      return reset(state, action.payload);
    case 'REMOVE':
      return remove(state, action.payload);
    case 'CLEAR':
      return INITIAL_STATE;
    case 'INIT':
      return init();
  }
}

function useRefinements() {
  const [{ refinements }, dispatch] = useReducer(reducer, null, init);

  useEventListener(['popstate', 'init_refinements'], () => {
    dispatch({ type: 'INIT' });
  });

  return [refinements, dispatch];
}

export default useRefinements;
