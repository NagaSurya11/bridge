import { lazy } from 'react';
import RouteType from '../classes/route.type.class';

/**
 * @type {Array<RouteType>}}
 */
const routes = [
    {
        path: '/',
        element: lazy(() => import('../../components/bridge/bridge.component'))
    },
    {
        path: '/selectquote',
        element: lazy(() => import('../../components/quote-selector/quote-selector.component'))
    },
    {
        path: '/settings',
        element: lazy(() => import('../../components/settings/settings.component'))
    }
];

export default routes;
