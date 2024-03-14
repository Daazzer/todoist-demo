const initState = '';
const SET_CURRENT_ACTIVE = 'set/currentActive';

export const setCurrentActiveAction = payload => ({
  type: SET_CURRENT_ACTIVE,
  payload
});

export const selectCurrentActive = state => state.currentActive;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_ACTIVE:
      return action.payload;
    default: return state;
  }
};

export default reducer;