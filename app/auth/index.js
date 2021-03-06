import angular from 'angular'
import uirouter from 'angular-ui-router'

import routes from './auth.routes.js'
import login from './login/login.component'
import AuthService from './auth.service'

export default angular.module('chat.auth', [uirouter])
    .config(routes)
    .component('login', login)
    .service('AuthService', AuthService)
    .name
