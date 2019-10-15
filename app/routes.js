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
      onEnter: requireAuth,
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
      onEnter: requireAuth,
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
      onEnter: requireAuth,
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
      path: '/map/:latitude/:longitude(/:groups)',
      name: 'mapViewer',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('components/MapGroups/reducer'),
          import('components/MapGroups/sagas'),
          import('containers/MapViewer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducerGroups, sagasGroups, component]) => {
          injectReducer('mapGroups', reducerGroups.default);
          injectSagas(sagasGroups.default)
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/map',
      name: 'massiveMap',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MassiveMap/reducer'),
          import('components/MapGroups/reducer'),
          import('containers/MassiveMap/sagas'),
          import('components/MapGroups/sagas'),
          import('containers/MassiveMap'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, reducerGroups, sagas, sagasGroups, component]) => {
          injectReducer('massiveMap', reducer.default);
          injectReducer('mapGroups', reducerGroups.default);
          injectSagas(sagas.default);
          injectSagas(sagasGroups.default)
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/clairvoyance',
      name: 'clairvoyance',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Clairvoyance/reducer'),
          import('containers/Clairvoyance/sagas'),
          import('containers/Clairvoyance'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('clairvoyance', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/hint/addhint/:lat/:lng',
      name: 'addHunt',
      type: 'message',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddHunt/reducer'),
          import('containers/AddHunt/sagas'),
          import('containers/AddHunt'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addHunt', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/hint/addhunt/:lat/:lng',
      name: 'addHunt',
      type: 'hunt',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddHunt/reducer'),
          import('containers/AddHunt/sagas'),
          import('containers/AddHunt'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addHunt', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/wiki',
      name: 'jotihuntWiki',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/JotihuntWiki/reducer'),
          import('containers/JotihuntWiki/sagas'),
          import('containers/JotihuntWiki'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('jotihuntWiki', reducer.default);
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
