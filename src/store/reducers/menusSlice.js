/**
 * @typedef Menu
 * @property {string} icon 菜单图标，详见 {@link https://react-icons.github.io/react-icons/icons/bs/}
 * @property {string} label 菜单标签
 * @property {string} path 路由路径（必须全局唯一，建议与 label 保持一致，使用小写）
 */

/** @type {Menu[]} */
const initState = [
  {
    icon: 'BsInboxFill',
    label: 'Inbox',
    path: 'inbox'
  },
  {
    icon: 'BsCalendar',
    label: 'Today',
    path: 'today'
  },
  {
    icon: 'BsCalendar3',
    label: 'Next7days',
    path: 'next7days'
  }
];

/**
 * @enum {string}
 */
const MENUS = {
  ADD: 'projects/add',
  DEL: 'projects/del'
};

export const menusAddAction = payload => ({
  type: MENUS.ADD,
  payload
});

export const menusDelAction = payload => ({
  type: MENUS.DEL,
  payload
});

export const selectMenus = state => state.menus;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case MENUS.ADD:
      return state.concat(action.payload);
    case MENUS.DEL:
      return state.filter(item => item.path !== action.payload);
    default:
      return state;
  }
};

export default reducer;