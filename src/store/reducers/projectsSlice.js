/**
 * @typedef Project
 * @property {string} type
 * @property {string} id
 * @property {string} color
 * @property {string} emoji
 * @property {string} title
 */

/** @type {Project[]} */
const initState = [];

/**
 * @enum {string}
 */
const PROJECTS = {
  ADD: 'projects/add',
  DEL: 'projects/del'
};

export const projectsAddAction = payload => ({
  type: PROJECTS.ADD,
  payload
});

export const projectsDelAction = payload => ({
  type: PROJECTS.DEL,
  payload
});

export const selectProjects = state => state.projects;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PROJECTS.ADD:
      return state.concat(action.payload);
    case PROJECTS.DEL:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;