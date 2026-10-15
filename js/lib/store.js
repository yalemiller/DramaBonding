// A minimal observable store. Listeners receive (state, previousState) after every update.

export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    update(fn) {
      const prev = state;
      state = { ...state, ...fn(state) };
      listeners.forEach(listener => listener(state, prev));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
