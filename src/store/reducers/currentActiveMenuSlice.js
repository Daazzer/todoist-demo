const initState = '';

/**
 * @enum {string}
 */
const CURRENT_ACTIVE_MENU = {
  SET: 'currentActiveMenu/set'
};

export const currentActiveMenuSetAction = payload => ({
  type: CURRENT_ACTIVE_MENU.SET,
  payload
});

export const selectCurrentActiveMenu = state => state.currentActiveMenu;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CURRENT_ACTIVE_MENU.SET:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;