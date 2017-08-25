// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { requireAuth } from 'containers/Viewer/lib';

import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // for example's sake, require authentication to see /features
      onEnter: requireAuth,
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        System.import('containers/Login')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/login/callback',
      name: 'loginCallback',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginCallback/sagas'),
          System.import('containers/LoginCallback'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/hint/add',
      name: 'addHintContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddHintContainer/reducer'),
          import('containers/AddHintContainer/sagas'),
          import('containers/AddHintContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addHintContainer', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/about',
      name: 'about',
      getComponent(location, cb) {
        import('containers/About')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/hint/list',
      name: 'hintList',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HintList/reducer'),
          import('containers/HintList/sagas'),
          import('containers/HintList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('hintList', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/group/list',
      name: 'groupList',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/GroupList/reducer'),
          import('containers/GroupList/sagas'),
          import('containers/GroupList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('groupList', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
