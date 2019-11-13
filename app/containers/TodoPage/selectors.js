import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the todoPage state domain
 */

const selectTodoPageDomain = state => state.todoPage || initialState;
const selectTodoList = state => (state.todoPage ? state.todoPage.todos : []);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TodoPage
 */

const makeSelectTodoPage = () =>
  createSelector(
    selectTodoPageDomain,
    substate => substate,
  );

const makeSelectListItem = () =>
  createSelector(
    selectTodoList,
    substate => substate,
  );

export default makeSelectTodoPage;
export { selectTodoPageDomain, makeSelectListItem };
