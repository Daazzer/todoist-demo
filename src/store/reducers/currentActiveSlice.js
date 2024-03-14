const initState = '';

/**
 * @enum {string}
 */
const CURRENT_ACTIVE = {
  SET: 'currentActive/set'
};

export const currentActiveSetAction = payload => ({
  type: CURRENT_ACTIVE.SET,
  payload
});

export const selectCurrentActive = state => state.currentActive;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CURRENT_ACTIVE.SET:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;