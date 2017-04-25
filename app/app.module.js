import angular from 'angular'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'

import routes from './app.routes'
import main from './main'
// import auth from './auth'

angular.module('chat', [
    uiRouter,
    uiBootstrap,
    main,
    'pubnub.angular.service'
    // auth
])
  .config(routes);
