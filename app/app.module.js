import angular from 'angular'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import ngCoockies from 'angular-cookies'

import routes from './app.routes'
import run from './app.run'
import main from './main'
import auth from './auth'

angular.module('chat', [
    ngCoockies,
    uiRouter,
    uiBootstrap,
    main,
    'pubnub.angular.service',
    auth
])
    .config(routes)
    .run(run);
