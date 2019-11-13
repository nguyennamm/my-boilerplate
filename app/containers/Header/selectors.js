import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state.loginPage || initialState;
const selectToken = state => state.loginPage || { token: '' };

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectHeader = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate,
  );

const makeSelectToken = () =>
  createSelector(
    selectToken,
    substate => substate.token,
  );

export default makeSelectHeader;
export { selectHeaderDomain, makeSelectToken };
