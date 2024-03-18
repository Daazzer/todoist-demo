import { uuid } from '@/utils';
/**
 * @typedef TodoListItem
 * @property {string} id
 * @property {string} projectId
 * @property {string} text
 * @property {boolean} isDone
 */

/** @type {TodoListItem[]} */
const initState = [];

/**
 * @enum {string}
 */
const TODO_LIST = {
  ADD: 'todoList/add',
  TOGGLE: 'todoList/toggle'
};

export const todoListAddAction = payload => ({
  type: TODO_LIST.ADD,
  payload
});

export const todoListToggleAction = payload => ({
  type: TODO_LIST.TOGGLE,
  payload
});

export const selectTodoList = state => state.todoList;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TODO_LIST.ADD:
      return state.concat({
        ...action.payload,
        id: uuid(),
        isDone: false
      });
    case TODO_LIST.TOGGLE:
      return state.map(todoListItem => {
        if (todoListItem.id === action.payload.id) {
          return { ...todoListItem, ...action.payload };
        }

        return todoListItem;
      });
    default:
      return state;
  }
};

export default reducer;