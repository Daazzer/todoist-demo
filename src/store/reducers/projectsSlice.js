import { uuid } from '@/utils';

/**
 * @typedef Project
 * @property {string} menuPath
 * @property {string} id
 * @property {string} color
 * @property {string} emoji
 * @property {string} title
 */

/** @type {Project[]} */
const initState = [
  {
    menuPath: 'inbox',
    id: 'test1',
    color: '#fe1574',
    emoji: 'handsUp',
    title: 'THE OFFICEOFFICEOFFICEOFFICEOFFICEOFFICEOFFICEOFFICE'
  },
  {
    menuPath: 'today',
    id: 'test2',
    color: '#fe1574',
    emoji: 'handsUp',
    title: 'THE OFFICE'
  },
  {
    menuPath: 'next7days',
    id: 'test3',
    color: '#fe1574',
    emoji: 'handsUp',
    title: 'THE OFFICE'
  },
  {
    menuPath: 'next7days',
    id: 'test4',
    color: '#1e1a74',
    emoji: 'handsUp',
    title: 'THE OFFICE'
  }
];

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
      return state.concat({ ...action.payload, id: uuid() });
    case PROJECTS.DEL:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;