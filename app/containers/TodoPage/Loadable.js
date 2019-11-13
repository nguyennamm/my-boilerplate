/**
 *
 * Asynchronously loads the component for TodoPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
