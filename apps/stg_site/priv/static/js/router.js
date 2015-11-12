import { Router5 } from 'router5'
import historyPlugin from 'router5-history';

export default function createRouter(routes) {
    const router = new Router5()
        .setOption('useHash', true)
        // .setOption('hashPrefix', '!')
        .setOption('defaultRoute', 'root')
        // Routes
        .addNode('home',        '/home')
        .addNode('user',        '/user')
        .addNode('user.view',   '/:id')
        .addNode('about',       '/about')
        // Plugins
        .usePlugin(Router5.loggerPlugin())
        .usePlugin(historyPlugin());

    return router;
};